import { BN, AccountsCoder, Idl } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { PeggedFiat } from "../artifacts/pegged_fiat";
import IDL from "../artifacts/pegged_fiat.json";

export type PeggedFiatType = PeggedFiat;
export const PeggedFiatIDL = IDL as Idl;
export const accountsCoder = new AccountsCoder(PeggedFiatIDL);

export enum AccountName {
  Controller = "Controller",
  Pair = "Pair",
  UserProfile = "UserProfile",
  LockProfile = "LockProfile",
  ControllerV1 = "ControllerV1",
}

export const AccountState = {
  Unknown: { unknown: {} },
  Active: { active: {} },
  Inactive: { inactive: {} },
};

export type ControllerData = {
  version: number;
  authority: PublicKey;
  oracleProgramId: PublicKey;
  bump: number[];
};

export type ControllerV1Data = {
  tokenName: string;
  tokenSymbol: string;
  tokenMint: PublicKey;
  mintAuthority: PublicKey;
  freezeAuthority: PublicKey;
  bump: number[];
};

export type PairData = {
  version: number;
  state: object;
  controller: PublicKey;
  lockToken: PublicKey;
  lockTokenVault: PublicKey;
  mintToken: PublicKey;
  burnTokenVault: PublicKey;
  totalLocked: BN;
  totalMinted: BN;
  fee: BN;
  safeMargin: BN;
  expo: number;
  maxPrice: BN;
  minPrice: BN;
  oracleProduct: PublicKey;
  bump: number[];
};

export type PriceProfileData = {
  lockAmount: BN;
  mintAmount: BN;
};

export type LockProfileData = {
  user: PublicKey;
  totalLocked: BN;
  totalMinted: BN;
  prev: PublicKey;
  bump: number[];
  priceHistory: PriceProfileData[];
};

export type UserProfileData = {
  state: object;
  pair: PublicKey;
  user: PublicKey;
  totalLocked: BN;
  totalMinted: BN;
  latestLockProfile: PublicKey;
  lockProfileIndex: number;
  bump: number[];
};

export type MintedList = {
  name: string;
  timestamp: number;
  slot: number;
  minted: number;
  locked: number;
};

export type HistoryData = {
  minted: {
    data: MintedList[];
  };
  burnt: {
    data: MintedList[];
  };
};
