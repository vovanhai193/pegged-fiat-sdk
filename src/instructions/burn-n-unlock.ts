import { Instruction } from "@orca-so/common-sdk";
import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Program, BN } from "@project-serum/anchor";
import { PeggedFiat } from "../artifacts/pegged_fiat";

export type BurnNUnlockParams = {
  accounts: {
    user: PublicKey;
    pair: PublicKey;
    mintToken: PublicKey;
    lockTokenVault: PublicKey;
    unlockTokenUser: PublicKey;
    burnTokenUser: PublicKey;
    userProfile: PublicKey;
    lockProfile: PublicKey;
  };
  inputs: {
    numBurntIndexes: BN;
  };
};

export async function burnNUnlock(
  program: Program<PeggedFiat>,
  params: BurnNUnlockParams
): Promise<Instruction> {
  const { accounts, inputs } = params;

  const ix = await program.instruction.burnNUnlock(params.inputs.numBurntIndexes, {
    accounts: {
      ...accounts,
      tokenProgram: TOKEN_PROGRAM_ID,
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
