import { Instruction } from "@orca-so/common-sdk";
import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Program, BN } from "@project-serum/anchor";
import { PeggedFiat } from "../artifacts/pegged_fiat";

export type LockWithoutMintParams = {
  accounts: {
    authority: PublicKey;
    controller: PublicKey;
    pair: PublicKey;
    lockTokenUser: PublicKey;
    lockTokenVault: PublicKey;
    mintToken: PublicKey;
    lockToken: PublicKey;
    userProfile: PublicKey;
    lockProfile: PublicKey;
  };
  inputs: {
    lockAmount: BN;
    mintAmount: BN;
  };
};

export async function lockWithoutMint(
  program: Program<PeggedFiat>,
  params: LockWithoutMintParams
): Promise<Instruction> {
  const { accounts, inputs } = params;

  const ix = await program.instruction.lockWithoutMint(inputs.lockAmount, inputs.mintAmount, {
    accounts: {
      ...accounts,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
      rent: SYSVAR_RENT_PUBKEY,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
    },
  });

  return {
    instructions: [ix],
    cleanupInstructions: [],
    signers: [],
  };
}
