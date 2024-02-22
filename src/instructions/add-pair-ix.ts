import { Instruction } from "@orca-so/common-sdk";
import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Program, BN } from "@project-serum/anchor";
import { PeggedFiat } from "../artifacts/pegged_fiat";

export type AddPairParams = {
  accounts: {
    authority: PublicKey;
    controller: PublicKey;
    pair: PublicKey;
    lockToken: PublicKey;
    mintToken: PublicKey;
    lockTokenVault: PublicKey;
    burnTokenVault: PublicKey;
    oracleProduct: PublicKey;
  };
  inputs: {
    version: number;
    pairBump: number;
    fee: BN;
    safeMargin: BN;
    expo: BN;
    maxPrice: BN;
    minPrice: BN;
  };
};

export async function addPair(
  program: Program<PeggedFiat>,
  params: AddPairParams
): Promise<Instruction> {
  const { accounts, inputs } = params;
  const { version, pairBump, fee, safeMargin, expo, maxPrice, minPrice } = inputs;

  const ix = await program.instruction.addPair(
    version,
    pairBump,
    fee,
    safeMargin,
    expo,
    maxPrice,
    minPrice,
    {
      accounts: {
        ...accounts,
        tokenProgram: TOKEN_PROGRAM_ID,
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
