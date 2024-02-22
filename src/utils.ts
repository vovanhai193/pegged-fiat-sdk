import * as anchor from "@project-serum/anchor";
import { Account, Connection, PublicKey } from "@solana/web3.js";
import { MintInfo, TOKEN_PROGRAM_ID, Token } from "@solana/spl-token";

export function keypairFromJson(secretKey: number[]): anchor.web3.Keypair {
  return anchor.web3.Keypair.fromSecretKey(Uint8Array.from(secretKey));
}

export async function getMintInfo(
  connection: Connection,
  mintAddress: PublicKey
): Promise<MintInfo> {
  // Create a new Token object
  const token = new Token(
    connection,
    new PublicKey(mintAddress),
    TOKEN_PROGRAM_ID,
    new Account() // This is a dummy payer account, used to pay for the transaction if required
  );

  // Fetch mint info
  const mintInfo = await token.getMintInfo();

  return mintInfo;
}
