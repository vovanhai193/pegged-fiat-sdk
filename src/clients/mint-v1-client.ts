import { BN } from "@project-serum/anchor";
import { PublicKey, Keypair } from "@solana/web3.js";
import { DecimalUtil, TransactionBuilder, deriveATA } from "@orca-so/common-sdk";
import { TOKEN_PROGRAM_ID, Token, ASSOCIATED_TOKEN_PROGRAM_ID, MintInfo } from "@solana/spl-token";
import * as OracleSDK from "@renec-foundation/oracle-sdk";
import { Context, PDA, getMintInfo } from "..";
import { ControllerV1Data } from "../types";
import Decimal from "decimal.js";

export class MintV1Client {
  ctx: Context;
  tokenMint: PublicKey;
  mintInfo: MintInfo;
  data: ControllerV1Data;

  constructor(
    ctx: Context,
    tokenMint: PublicKey,
    mintInfo: MintInfo,
    controllerV1Data: ControllerV1Data
  ) {
    this.ctx = ctx;
    this.tokenMint = tokenMint;
    this.data = controllerV1Data;
    this.mintInfo = mintInfo;
  }

  public static async initializeMintV1(
    ctx: Context,
    owner: PublicKey,
    tokenMint: Keypair,
    decimals: number,
    tokenName: string,
    tokenSymbol: string
  ): Promise<TransactionBuilder> {
    const { provider, program, wallet } = ctx;
    const { programId } = program;

    const pda = new PDA(programId);
    const controllerV1PDA = pda.controllerV1(tokenMint.publicKey);
    const controllerData = await ctx.fetcher.getControllerV1(controllerV1PDA.key);
    if (controllerData) {
      throw new Error(`Controller ${controllerV1PDA.key.toBase58()} intialized`);
    }
    const tx = (
      await ctx.methods.initializeV1({
        inputs: {
          bump: controllerV1PDA.bump,
          decimals,
          tokenName,
          tokenSymbol,
        },
        accounts: {
          owner: owner,
          tokenMint: tokenMint.publicKey,
          controller: controllerV1PDA.key,
        },
      })
    )
      .toTx()
      .addSigner(tokenMint);

    return tx;
  }

  public static async getMintV1Client(ctx: Context, tokenMint: PublicKey): Promise<MintV1Client> {
    const { program } = ctx;
    const { programId } = program;

    const pda = new PDA(programId);
    const controllerV1PDA = pda.controllerV1(tokenMint);
    const controllerData = await ctx.fetcher.getControllerV1(controllerV1PDA.key);
    if (!controllerData) {
      throw new Error(`Controller ${controllerV1PDA.key.toBase58()} not found`);
    }

    // Get token mint info
    const tokenMintInfo = await getMintInfo(ctx.connection, tokenMint);

    return new MintV1Client(ctx, tokenMint, tokenMintInfo, controllerData);
  }

  public async mintTo(
    mintAuthority: PublicKey,
    amount: Decimal,
    recipient: PublicKey
  ): Promise<TransactionBuilder> {
    const { provider, program, wallet } = this.ctx;
    const { programId } = program;

    const pda = new PDA(programId);
    const controllerV1PDA = pda.controllerV1(this.tokenMint);
    const controllerData = await this.ctx.fetcher.getControllerV1(controllerV1PDA.key);
    if (!controllerData) {
      throw new Error(`Controller ${controllerV1PDA.key.toBase58()} not found`);
    }

    const recipientTokenAccount = await deriveATA(recipient, this.tokenMint);
    const mintAmount = DecimalUtil.toU64(amount, this.mintInfo.decimals);
    const tx = (
      await this.ctx.methods.mintToV1({
        inputs: {
          amount: mintAmount,
        },
        accounts: {
          mintAuthority,
          tokenMint: this.tokenMint,
          recipient,
          recipientTokenAccount: recipientTokenAccount,
          controller: controllerV1PDA.key,
        },
      })
    ).toTx();

    return tx;
  }
}
