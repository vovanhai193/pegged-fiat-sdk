import * as anchor from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";

export const CONTROLLER = "controller";
export const PAIR_SEED = "pair";
export const USER_PROFILE_SEED = "user_profile";
export const LOCK_PROFILE_SEED = "lock_profile";
export const PEGGED_FIAT_V1 = "pegged_fiat_v1";

export interface PDAInfo {
  key: anchor.web3.PublicKey;
  bump: number;
}

export class PDA {
  readonly programId: anchor.web3.PublicKey;

  public constructor(programId: anchor.web3.PublicKey) {
    this.programId = programId;
  }

  controller = (version = 1): PDAInfo => {
    const _version: anchor.BN = new anchor.BN(version);
    const [pda, bump] = anchor.web3.PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode(CONTROLLER), _version.toArrayLike(Buffer, "le", 2)],
      this.programId
    );
    return {
      key: pda,
      bump: bump,
    };
  };

  controllerV1 = (tokenMint: PublicKey): PDAInfo => {
    const [pda, bump] = anchor.web3.PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode(PEGGED_FIAT_V1), tokenMint.toBuffer()],
      this.programId
    );
    return {
      key: pda,
      bump: bump,
    };
  };

  pair = (
    lockToken: anchor.web3.PublicKey,
    mintToken: anchor.web3.PublicKey,
    version = 1
  ): PDAInfo => {
    const controller = this.controller(version);

    const [pda, bump] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        anchor.utils.bytes.utf8.encode(PAIR_SEED),
        controller.key.toBuffer(),
        lockToken.toBuffer(),
        mintToken.toBuffer(),
      ],
      this.programId
    );
    return {
      key: pda,
      bump: bump,
    };
  };

  userProfile = (user: anchor.web3.PublicKey, pair: anchor.web3.PublicKey): PDAInfo => {
    const [pda, bump] = anchor.web3.PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode(USER_PROFILE_SEED), pair.toBuffer(), user.toBuffer()],
      this.programId
    );
    return {
      key: pda,
      bump: bump,
    };
  };

  lockProfile = (
    user: anchor.web3.PublicKey,
    pair: anchor.web3.PublicKey,
    index: number
  ): PDAInfo => {
    const _index: anchor.BN = new anchor.BN(index);

    const [pda, bump] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        anchor.utils.bytes.utf8.encode(LOCK_PROFILE_SEED),
        pair.toBuffer(),
        user.toBuffer(),
        _index.toArrayLike(Buffer, "le", 2),
      ],
      this.programId
    );
    return {
      key: pda,
      bump: bump,
    };
  };
}
