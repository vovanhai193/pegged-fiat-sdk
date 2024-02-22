import { Instruction } from "@orca-so/common-sdk";
import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import { Program, BN } from "@project-serum/anchor";
import { PeggedFiat } from "../artifacts/pegged_fiat";

export type InitLockProfileParams = {
  accounts: {
    user: PublicKey;
    pair: PublicKey;
    userProfile: PublicKey;
    oldLockProfile: PublicKey;
    newLockProfile: PublicKey;
  };
  inputs: {
    index: number;
    newLockProfileBump: number;
  };
};

export async function initLockProfile(
  program: Program<PeggedFiat>,
  params: InitLockProfileParams
): Promise<Instruction> {
  const { accounts, inputs } = params;

  const ix = await program.instruction.initLockProfile(inputs.index, inputs.newLockProfileBump, {
    accounts: {
      ...accounts,
      systemProgram: SystemProgram.programId,
      rent: SYSVAR_RENT_PUBKEY,
    },
  });

  return {
    instructions: [ix],
    cleanupInstructions: [],
    signers: [],
  };
}
