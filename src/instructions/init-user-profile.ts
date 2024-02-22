import { Instruction } from "@orca-so/common-sdk";
import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import { Program, BN } from "@project-serum/anchor";
import { PeggedFiat } from "../artifacts/pegged_fiat";

export type InitUserProfileParams = {
  accounts: {
    user: PublicKey;
    pair: PublicKey;
    userProfile: PublicKey;
    lockProfile: PublicKey;
  };
  inputs: {
    userProfileBump: number;
    lockProfileBump: number;
  };
};

export async function initUserProfile(
  program: Program<PeggedFiat>,
  params: InitUserProfileParams
): Promise<Instruction> {
  const { accounts, inputs } = params;

  const ix = await program.instruction.initUserProfile(
    inputs.userProfileBump,
    inputs.lockProfileBump,
    {
      accounts: {
        ...accounts,
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
      },
    }
  );

  return {
    instructions: [ix],
    cleanupInstructions: [],
    signers: [],
  };
}
