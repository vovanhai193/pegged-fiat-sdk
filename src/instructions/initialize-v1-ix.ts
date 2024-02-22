import { Instruction } from "@orca-so/common-sdk";
import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Program, BN } from "@project-serum/anchor";
import { PeggedFiat } from "../artifacts/pegged_fiat";

export type InitializeV1Params = {
  accounts: {
    owner: PublicKey;
    controller: PublicKey;
    tokenMint: PublicKey;
  };
  inputs: {
    bump: number;
    decimals: number;
    tokenName: string;
    tokenSymbol: string;
  };
};

export async function initializeV1(
  program: Program<PeggedFiat>,
  params: InitializeV1Params
): Promise<Instruction> {
  const { accounts, inputs } = params;
  const { bump, decimals, tokenName, tokenSymbol } = inputs;

  const ix = await program.instruction.initializeV1(bump, decimals, tokenName, tokenSymbol, {
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
