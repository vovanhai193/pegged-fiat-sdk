import { BN, EventParser } from "@project-serum/anchor";
import { PublicKey, Keypair, ParsedTransactionWithMeta } from "@solana/web3.js";
import { TransactionBuilder } from "@orca-so/common-sdk";
import { TOKEN_PROGRAM_ID, Token, ASSOCIATED_TOKEN_PROGRAM_ID } from "@solana/spl-token";
import * as OracleSDK from "@renec-foundation/oracle-sdk";
import { Context, Methods, PDA, PDAInfo } from "..";
import {
  PairData,
  UserProfileData,
  LockProfileData,
  ControllerData,
  PriceProfileData,
  MintedList,
  HistoryData,
} from "../types";

export const MAX_HISTORY = 10;

export class PairClient {
  ctx: Context;
  public pairData: PairData;
  public controllerData: ControllerData;
  public pairKey: PublicKey;
  public pda: PDA;
  public productClient: OracleSDK.ProductClient;
  public mintDecimals: BN;
  public lockDecimals: BN;
  public lockTokenInfo: Token;
  public mintTokenInfo: Token;

  constructor(
    ctx: Context,
    pairKey: PublicKey,
    pairData: PairData,
    controllerData: ControllerData,
    pda: PDA,
    productClient: OracleSDK.ProductClient,
    mintDecimals: BN,
    lockDecimals: BN,
    lockTokenInfo: Token,
    mintTokenInfo: Token
  ) {
    this.ctx = ctx;
    this.pairData = pairData;
    this.pairKey = pairKey;
    this.pda = pda;
    this.productClient = productClient;
    this.controllerData = controllerData;
    this.mintDecimals = mintDecimals;
    this.lockDecimals = lockDecimals;
    this.lockTokenInfo = lockTokenInfo;
    this.mintTokenInfo = mintTokenInfo;
  }

  public static async new(
    ctx: Context,
    authority: PublicKey,
    mintToken: PublicKey,
    lockToken: PublicKey,
    fee: number,
    safeMargin: number,
    expo: number,
    maxPrice: number,
    minPrice: number,
    version = 1
  ): Promise<TransactionBuilder> {
    const _fee = new BN(fee);
    const _safeMargin = new BN(safeMargin);
    const _expo = new BN(expo);
    const _maxPrice = OracleSDK.ProductClient.convertToPriceFormat(maxPrice, expo);
    const _minPrice = OracleSDK.ProductClient.convertToPriceFormat(minPrice, expo);

    const { provider, program, wallet } = ctx;
    const { programId } = program;

    const pda = new PDA(programId);
    const controller = pda.controller(version);
    const controllerData = await ctx.fetcher.getController(controller.key);
    if (!controllerData) {
      throw new Error(`Controller ${controller.key.toBase58()} of ${version} not found`);
    }
    const { oracleProgramId } = controllerData;
    const pair = pda.pair(lockToken, mintToken, version);
    const oracleCTX = OracleSDK.Context.withProvider(provider, oracleProgramId);

    const productClient = await OracleSDK.ProductClient.getProduct(oracleCTX, mintToken, lockToken);
    const lockTokenVault = Keypair.generate();
    const burnTokenVault = Keypair.generate();

    const tx = (
      await ctx.methods.addPair({
        inputs: {
          version,
          pairBump: pair.bump,
          fee: _fee,
          safeMargin: _safeMargin,
          expo: _expo,
          maxPrice: _maxPrice.price,
          minPrice: _minPrice.price,
        },
        accounts: {
          authority,
          controller: controller.key,
          pair: pair.key,
          lockToken,
          mintToken,
          lockTokenVault: lockTokenVault.publicKey,
          burnTokenVault: burnTokenVault.publicKey,
          oracleProduct: productClient.productKey,
        },
      })
    )
      .toTx()
      .addSigner(lockTokenVault)
      .addSigner(burnTokenVault);

    return tx;
  }

  public static async getPair(
    ctx: Context,
    mintToken: PublicKey,
    lockToken: PublicKey,
    version = 1
  ): Promise<PairClient> {
    const pda = new PDA(ctx.program.programId);
    const controller = pda.controller(version);
    const controllerData = await ctx.fetcher.getController(controller.key);
    if (!controllerData) {
      throw new Error(`Controller of ${version} not found`);
    }

    const pair = pda.pair(lockToken, mintToken, version);
    const pairData = await ctx.fetcher.getPair(pair.key, true);
    if (!pairData) {
      throw new Error(`Pair of ${pair.key.toBase58()} not found`);
    }

    const oracleCTX = OracleSDK.Context.withProvider(ctx.provider, controllerData.oracleProgramId);
    const productClient = await OracleSDK.ProductClient.getProduct(
      oracleCTX,
      pairData.mintToken,
      pairData.lockToken
    );

    const lockTokenInfo = new Token(
      ctx.connection,
      pairData.lockToken,
      TOKEN_PROGRAM_ID,
      Keypair.generate()
    );
    const mintTokenInfo = new Token(
      ctx.connection,
      pairData.mintToken,
      TOKEN_PROGRAM_ID,
      Keypair.generate()
    );

    const mintDecimals = new BN((await mintTokenInfo.getMintInfo()).decimals);
    const lockDecimals = new BN((await lockTokenInfo.getMintInfo()).decimals);

    return new PairClient(
      ctx,
      pair.key,
      pairData,
      controllerData,
      pda,
      productClient,
      mintDecimals,
      lockDecimals,
      lockTokenInfo,
      mintTokenInfo
    );
  }

  public async estMintAmount(lockAmount: BN): Promise<BN> {
    const { pairData } = this;

    const price = await this.productClient.getPrice(true);

    const expectedMintAmount = lockAmount
      .mul(new BN(price.price))
      .mul(new BN(10).pow(this.mintDecimals))
      .div(new BN(10).pow(this.lockDecimals))
      .mul(pairData.safeMargin)
      .div(new BN(10000));
    return expectedMintAmount;
  }

  public async lockNMint(user: PublicKey, lockAmount: BN): Promise<TransactionBuilder> {
    if (lockAmount.isNeg() || lockAmount.isZero()) {
      throw new Error(`lockAmount ${lockAmount} is invalid`);
    }

    const { lockTokenVault, mintToken, lockToken } = this.pairData;

    const mintTokenUser = await deriveATA(user, mintToken);
    const lockTokenUser = await deriveATA(user, lockToken);

    const userProfile = this.pda.userProfile(user, this.pairKey);
    let initUserIx: Methods | undefined = undefined;
    let initLockProfileIx: Methods | undefined = undefined;
    let lockProfileIndex = 0;
    let lockProfile = this.pda.lockProfile(user, this.pairKey, lockProfileIndex);

    try {
      const userProfileInfo = await this.ctx.program.account.userProfile.fetch(userProfile.key);
      lockProfileIndex = userProfileInfo.lockProfileIndex;
      lockProfile = this.pda.lockProfile(user, this.pairKey, lockProfileIndex);

      // init new lockProfile when old lockProfile is full
      const latestLockProfile: any = await this.ctx.program.account.lockProfile.fetch(
        lockProfile.key
      );
      const lockProfileData = latestLockProfile as LockProfileData;

      if (lockProfileData.priceHistory.length == MAX_HISTORY) {
        const newLockIndex = lockProfileIndex + 1;
        const newLockProfile = this.pda.lockProfile(user, this.pairKey, newLockIndex);

        // init new lockProfile
        initLockProfileIx = await this.ctx.methods.initLockProfile({
          accounts: {
            user,
            pair: this.pairKey,
            userProfile: userProfile.key,
            oldLockProfile: lockProfile.key,
            newLockProfile: newLockProfile.key,
          },
          inputs: {
            index: newLockIndex,
            newLockProfileBump: newLockProfile.bump,
          },
        });
        lockProfile = newLockProfile;
      }
    } catch (error: any) {
      // init user profile
      if (error.message && error.message.indexOf("Account does not exist") !== -1) {
        initUserIx = await this.ctx.methods.initUserProfile({
          accounts: {
            user,
            pair: this.pairKey,
            userProfile: userProfile.key,
            lockProfile: lockProfile.key,
          },
          inputs: {
            userProfileBump: userProfile.bump,
            lockProfileBump: lockProfile.bump,
          },
        });
      } else {
        throw Error(error.message);
      }
    }

    const oraclePrice = this.productClient.productData.priceAccount;
    const oracleProduct = this.productClient.productKey;

    const tx = new TransactionBuilder(this.ctx.provider.connection, this.ctx.provider.wallet);

    if (initUserIx && initUserIx.ix) {
      tx.addInstruction(initUserIx.ix);
    }

    if (initLockProfileIx && initLockProfileIx.ix) {
      tx.addInstruction(initLockProfileIx.ix);
    }

    const lockNMintIx = await this.ctx.methods.lockNMint({
      accounts: {
        user,
        pair: this.pairKey,
        lockTokenVault,
        mintToken,
        lockToken,
        mintTokenUser,
        lockTokenUser,
        userProfile: userProfile.key,
        lockProfile: lockProfile.key,
        oracleProduct,
        oraclePrice,
      },
      inputs: {
        lockAmount,
      },
    });

    if (lockNMintIx && lockNMintIx.ix) {
      tx.addInstruction(lockNMintIx.ix);
    } else {
      throw Error(`lockNMintIx fail`);
    }

    return tx;
  }

  public async lockWithoutMint(
    authority: PublicKey,
    lockAmount: BN,
    mintAmount: BN
  ): Promise<TransactionBuilder> {
    if (lockAmount.isNeg() || lockAmount.isZero()) {
      throw new Error(`lockAmount ${lockAmount} is invalid`);
    }

    if (mintAmount.isNeg() || mintAmount.isZero()) {
      throw new Error(`mintAmount ${mintAmount} is invalid`);
    }

    const { lockTokenVault, mintToken, lockToken } = this.pairData;

    const lockTokenUser = await deriveATA(authority, lockToken);

    const lockTokenBalance = (await this.lockTokenInfo.getAccountInfo(lockTokenUser)).amount;

    if (lockAmount.gt(lockTokenBalance)) {
      throw new Error(`not enough balance. have= ${lockTokenBalance}; lock= ${lockAmount}`);
    }

    const userProfile = this.pda.userProfile(authority, this.pairKey);
    let initUserIx: Methods | undefined = undefined;
    let initLockProfileIx: Methods | undefined = undefined;
    let lockProfileIndex = 0;
    let lockProfile = this.pda.lockProfile(authority, this.pairKey, lockProfileIndex);

    try {
      const userProfileInfo = await this.ctx.program.account.userProfile.fetch(
        userProfile.key,
        "confirmed"
      );
      lockProfileIndex = userProfileInfo.lockProfileIndex;
      lockProfile = this.pda.lockProfile(authority, this.pairKey, lockProfileIndex);

      // init new lockProfile when old lockProfile is full
      const latestLockProfile: any = await this.ctx.program.account.lockProfile.fetch(
        lockProfile.key,
        "confirmed"
      );
      const lockProfileData = latestLockProfile as LockProfileData;

      if (lockProfileData.priceHistory.length == MAX_HISTORY) {
        const newLockIndex = lockProfileIndex + 1;
        const newLockProfile = this.pda.lockProfile(authority, this.pairKey, newLockIndex);

        // init new lockProfile
        initLockProfileIx = await this.ctx.methods.initLockProfile({
          accounts: {
            user: authority,
            pair: this.pairKey,
            userProfile: userProfile.key,
            oldLockProfile: lockProfile.key,
            newLockProfile: newLockProfile.key,
          },
          inputs: {
            index: newLockIndex,
            newLockProfileBump: newLockProfile.bump,
          },
        });
        lockProfile = newLockProfile;
      }
    } catch (error: any) {
      // init user profile
      if (error.message && error.message.indexOf("Account does not exist") !== -1) {
        initUserIx = await this.ctx.methods.initUserProfile({
          accounts: {
            user: authority,
            pair: this.pairKey,
            userProfile: userProfile.key,
            lockProfile: lockProfile.key,
          },
          inputs: {
            userProfileBump: userProfile.bump,
            lockProfileBump: lockProfile.bump,
          },
        });
      } else {
        throw Error(error.message);
      }
    }

    const tx = new TransactionBuilder(this.ctx.provider.connection, this.ctx.provider.wallet);

    if (initUserIx && initUserIx.ix) {
      tx.addInstruction(initUserIx.ix);
    }

    if (initLockProfileIx && initLockProfileIx.ix) {
      tx.addInstruction(initLockProfileIx.ix);
    }

    const lockNMintIx = await this.ctx.methods.lockWithoutMint({
      accounts: {
        authority,
        controller: this.pairData.controller,
        pair: this.pairKey,
        lockTokenVault,
        lockTokenUser,
        mintToken,
        lockToken,
        userProfile: userProfile.key,
        lockProfile: lockProfile.key,
      },
      inputs: {
        lockAmount,
        mintAmount,
      },
    });

    if (lockNMintIx && lockNMintIx.ix) {
      tx.addInstruction(lockNMintIx.ix);
    } else {
      throw Error(`lockWithoutMint fail`);
    }

    return tx;
  }

  public async burnNUnlock(user: PublicKey, numBurntRecords: number): Promise<TransactionBuilder> {
    if (numBurntRecords <= 0) {
      throw new Error(`lockAmount ${numBurntRecords} is invalid`);
    }
    if (numBurntRecords > 10) {
      throw new Error(`maximum 10 records was burnt at the same time`);
    }

    const { userProfile, latestLock, profileKey } = await this.getUserProfile(user);
    const lockProfile = this.pda.lockProfile(user, this.pairKey, userProfile.lockProfileIndex);

    const { mintToken, lockToken, lockTokenVault } = this.pairData;
    const unlockTokenUser = await deriveATA(user, lockToken);
    const burnTokenUser = await deriveATA(user, mintToken);

    let tx: TransactionBuilder;

    if (numBurntRecords <= latestLock.priceHistory.length) {
      // don't need to break down
      tx = (
        await this.ctx.methods.burnNUnlock({
          inputs: {
            numBurntIndexes: new BN(numBurntRecords),
          },
          accounts: {
            user,
            pair: this.pairKey,
            mintToken,
            lockTokenVault,
            unlockTokenUser,
            burnTokenUser,
            userProfile: profileKey,
            lockProfile: lockProfile.key,
          },
        })
      ).toTx();
    } else {
      tx = (
        await this.ctx.methods.burnNUnlock({
          inputs: {
            numBurntIndexes: new BN(latestLock.priceHistory.length),
          },
          accounts: {
            user,
            pair: this.pairKey,
            mintToken,
            lockTokenVault,
            unlockTokenUser,
            burnTokenUser,
            userProfile: profileKey,
            lockProfile: lockProfile.key,
          },
        })
      ).toTx();

      const ix: any = await this.ctx.methods.burnNUnlock({
        inputs: {
          numBurntIndexes: new BN(numBurntRecords - latestLock.priceHistory.length),
        },
        accounts: {
          user,
          pair: this.pairKey,
          mintToken,
          lockTokenVault,
          unlockTokenUser,
          burnTokenUser,
          userProfile: profileKey,
          lockProfile: latestLock.prev,
        },
      });

      tx.addInstructions([ix.ix]);
    }

    return tx;
  }

  public async getUserProfile(
    user: PublicKey
  ): Promise<{ profileKey: PublicKey; userProfile: UserProfileData; latestLock: LockProfileData }> {
    const userProfile = this.pda.userProfile(user, this.pairKey);

    const userProfileData = await this.ctx.fetcher.getUserProfile(userProfile.key, true);
    if (!userProfileData) {
      throw new Error(`${user.toBase58()} don't has user profile`);
    }

    const latestLockProfile: any = await this.ctx.program.account.lockProfile.fetch(
      userProfileData.latestLockProfile
    );
    const lockProfileData = latestLockProfile as LockProfileData;

    return {
      profileKey: userProfile.key,
      userProfile: userProfileData,
      latestLock: lockProfileData,
    };
  }

  public async getLockProfileByIndex(
    user: PublicKey,
    lockProfileIndex: number
  ): Promise<LockProfileData> {
    const lockProfile = this.pda.lockProfile(user, this.pairKey, lockProfileIndex);
    const latestLockProfile: any = await this.ctx.program.account.lockProfile.fetch(
      lockProfile.key
    );
    const lockProfileData = latestLockProfile as LockProfileData;
    return lockProfileData;
  }

  public async getHistory(user: PublicKey): Promise<HistoryData> {
    const mintedList: any[] = [];
    const pair = this;
    const userProfile = pair.pda.userProfile(user, pair.pairKey);

    const signatures = await pair.ctx.connection.getConfirmedSignaturesForAddress2(
      userProfile.key,
      {},
      "confirmed"
    );

    // TODO: handle when signatures.length > 1000 records
    if (signatures.length > 0) {
      let totalParsedTxs: ParsedTransactionWithMeta[] = [];
      let requests: string[] = [];
      for (let i = 0; i < signatures.length; i++) {
        requests.push(signatures[i].signature);
        if (requests.length === 50 || i === signatures.length - 1) {
          const parsedTxs = (await this.ctx.connection.getParsedTransactions(requests)).filter(
            (tx) => tx !== null
          ) as ParsedTransactionWithMeta[];

          for (const parsedTx of parsedTxs) {
            totalParsedTxs.push(parsedTx);
          }
          requests = [];
        }
      }

      if (totalParsedTxs.length > 0) {
        let totalLocked = 0;
        let totalMinted = 0;
        const { lockTokenVault, mintToken, lockToken } = pair.pairData;
        const lockTokenVaultInfo = await pair.lockTokenInfo.getAccountInfo(lockTokenVault);
        const locker = lockTokenVaultInfo.owner;

        for (let i = 0; i < totalParsedTxs.length; i++) {
          const tx = totalParsedTxs[i];
          if (tx.meta) {
            const { preTokenBalances, postTokenBalances } = tx.meta;
            if (
              preTokenBalances &&
              preTokenBalances.length > 0 &&
              postTokenBalances &&
              postTokenBalances.length
            ) {
              let preTotalMint = 0;
              let preTotalLock = 0;

              preTokenBalances.forEach((pre) => {
                if (pre.mint == mintToken.toBase58()) {
                  preTotalMint += pre.uiTokenAmount.uiAmount || 0;
                }
                if (
                  pre.mint == lockToken.toBase58() &&
                  pre.owner &&
                  pre.owner === locker.toBase58()
                ) {
                  preTotalLock += pre.uiTokenAmount.uiAmount || 0;
                }
              });

              let postTotalMint = 0;
              let postTotalLock = 0;
              let user = "";

              postTokenBalances.forEach((post) => {
                if (post.mint == mintToken.toBase58()) {
                  postTotalMint += post.uiTokenAmount.uiAmount || 0;
                  user = post.owner ? post.owner : "";
                }
                if (
                  post.mint == lockToken.toBase58() &&
                  post.owner &&
                  post.owner === locker.toBase58()
                ) {
                  postTotalLock += post.uiTokenAmount.uiAmount || 0;
                }
              });

              const minted = postTotalMint - preTotalMint;
              const locked = postTotalLock - preTotalLock;
              if (minted > 0) {
                totalLocked += locked;
                totalMinted += minted;
                mintedList.push({
                  name: "mint",
                  timestamp: tx.blockTime,
                  slot: tx.slot,
                  minted,
                  locked,
                });
              } else {
                const eventParser = new EventParser(
                  new PublicKey(pair.ctx.program.programId),
                  pair.ctx.program.coder
                );
                const logMessages: any = tx.meta?.logMessages;
                eventParser.parseLogs(logMessages, (event) => {
                  if (event && event.name === "BurnNUnlockEvent") {
                    const numBurnt = event.data.numBurnt as BN;
                    const burnAmount = event.data.burnAmount as BN;
                    const unlockAmount = event.data.unlockAmount as BN;

                    mintedList.push({
                      name: "burn",
                      timestamp: tx.blockTime,
                      slot: tx.slot,
                      numBurnt: numBurnt.toNumber(),
                      burnt: burnAmount.toNumber(),
                      unlocked: unlockAmount.toNumber(),
                    });
                  }
                });
              }
            }
          }
        }
      }
    }

    const sorted = mintedList.sort((a, b) => a.slot - b.slot);
    // let totalBurn = 0;
    const mintedData: any[] = [];
    const burntData: any[] = [];

    for (let i = 0; i < sorted.length; i++) {
      const value = sorted[i];
      if (value.name === "mint") {
        mintedData.push(value);
      } else if (value.name === "burn") {
        // totalBurn += value.numBurnt;
        for (let j = 0; j < value.numBurnt; j++) {
          const burnt = mintedData.pop();
          burnt.name = "burnt";
          burntData.push(burnt);
        }
      }
    }

    return {
      minted: {
        data: mintedData.sort((a, b) => b.slot - a.slot) as MintedList[],
      },
      burnt: {
        data: burntData as MintedList[],
      },
    };
  }

  public async estMintFee(user: PublicKey): Promise<number> {
    let fee = 0;
    let lockProfileIndex = 0;
    try {
      const mintTokenUser = await deriveATA(user, this.pairData.mintToken);
      const info = await this.ctx.connection.getAccountInfo(mintTokenUser);
      if (!info) {
        throw new Error("Account does not exist");
      }
    } catch (error: any) {
      if (error.message && error.message.indexOf("Account does not exist") !== -1) {
        const rentTokenAccount = await Token.getMinBalanceRentForExemptAccount(this.ctx.connection);
        fee += rentTokenAccount;
      } else {
        throw error;
      }
    }

    try {
      const userProfile = this.pda.userProfile(user, this.pairKey);
      const userProfileInfo = await this.ctx.program.account.userProfile.fetch(userProfile.key);
      lockProfileIndex = userProfileInfo.lockProfileIndex;
    } catch (error: any) {
      if (error.message && error.message.indexOf("Account does not exist") !== -1) {
        const rentUserProfile = await this.ctx.connection.getMinimumBalanceForRentExemption(
          this.ctx.program.account.userProfile.size
        );
        fee += rentUserProfile;
      } else {
        throw error;
      }
    }
    try {
      const lockProfile = this.pda.lockProfile(user, this.pairKey, lockProfileIndex);
      await this.ctx.program.account.lockProfile.fetch(lockProfile.key);
    } catch (error: any) {
      if (error.message && error.message.indexOf("Account does not exist") !== -1) {
        const lockProfileSize = 253;
        const rentLockProfile = await this.ctx.connection.getMinimumBalanceForRentExemption(
          lockProfileSize
        );
        fee += rentLockProfile;
      } else {
        throw error;
      }
    }

    return fee;
  }

  public async refresh(): Promise<PairClient> {
    const pairData = await this.ctx.fetcher.getPair(this.pairKey, true);
    if (!pairData) {
      throw new Error(`Pair of ${this.pairData.lockToken}/${this.pairData.mintToken} not found`);
    }

    this.pairData = pairData;
    return this;
  }
}

export async function deriveATA(ownerAddress: PublicKey, tokenMint: PublicKey): Promise<PublicKey> {
  return await Token.getAssociatedTokenAddress(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    tokenMint,
    ownerAddress
  );
}
