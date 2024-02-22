import { Instruction } from "@orca-so/common-sdk";
import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Program, BN } from "@project-serum/anchor";
import { PeggedFiat } from "../artifacts/pegged_fiat";

export type MintToV1Params = {
  accounts: {
    mintAuthority: PublicKey;
    controller: PublicKey;
    tokenMint: PublicKey;
    recipient: PublicKey;
    recipientTokenAccount: PublicKey;
  };
  inputs: {
    amount: BN;
  };
};

export async function mintToV1(
  program: Program<PeggedFiat>,
  params: MintToV1Params
): Promise<Instruction> {
  const { accounts, inputs } = params;
  const { amount } = inputs;

  const ix = await program.instruction.mintToV1(amount, {
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
