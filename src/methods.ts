import { TransactionBuilder, Instruction } from "@orca-so/common-sdk";
import { Context } from "./context";
import * as ixs from "./instructions";

export class Methods {
  public ctx: Context;
  public ix: Instruction | null | undefined;

  public constructor(ctx: Context, ix?: Instruction) {
    this.ctx = ctx;
    this.ix = ix;
  }

  public async addPair(params: ixs.AddPairParams) {
    this.ix = await ixs.addPair(this.ctx.program, params);
    return this;
  }

  public async initUserProfile(params: ixs.InitUserProfileParams) {
    this.ix = await ixs.initUserProfile(this.ctx.program, params);
    return this;
  }

  public async initLockProfile(params: ixs.InitLockProfileParams) {
    this.ix = await ixs.initLockProfile(this.ctx.program, params);
    return this;
  }

  public async lockNMint(params: ixs.LockNMintParams) {
    this.ix = await ixs.lockNMint(this.ctx.program, params);
    return this;
  }

  public async lockWithoutMint(params: ixs.LockWithoutMintParams) {
    this.ix = await ixs.lockWithoutMint(this.ctx.program, params);
    return this;
  }

  public async burnNUnlock(params: ixs.BurnNUnlockParams) {
    this.ix = await ixs.burnNUnlock(this.ctx.program, params);
    return this;
  }

  public async initializeV1(params: ixs.InitializeV1Params) {
    this.ix = await ixs.initializeV1(this.ctx.program, params);
    return this;
  }

  public async mintToV1(params: ixs.MintToV1Params) {
    this.ix = await ixs.mintToV1(this.ctx.program, params);
    return this;
  }

  public toTx(): TransactionBuilder {
    const tx = new TransactionBuilder(this.ctx.provider.connection, this.ctx.provider.wallet);
    return this.ix ? tx.addInstruction(this.ix) : tx;
  }
}
