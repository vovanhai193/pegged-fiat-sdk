import { Instruction } from "@orca-so/common-sdk";
import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Program, BN } from "@project-serum/anchor";
import { PeggedFiat } from "../artifacts/pegged_fiat";

export type LockNMintParams = {
  accounts: {
    user: PublicKey;
    pair: PublicKey;
    lockTokenVault: PublicKey;
    mintToken: PublicKey;
    lockToken: PublicKey;
    mintTokenUser: PublicKey;
    lockTokenUser: PublicKey;
    userProfile: PublicKey;
    lockProfile: PublicKey;
    oraclePrice: PublicKey;
    oracleProduct: PublicKey;
  };
  inputs: {
    lockAmount: BN;
  };
};

export async function lockNMint(
  program: Program<PeggedFiat>,
  params: LockNMintParams
): Promise<Instruction> {
  const { accounts, inputs } = params;

  const ix = await program.instruction.lockNMint(params.inputs.lockAmount, {
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
