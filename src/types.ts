import { PublicKey } from "@solana/web3.js";
import { BN } from "@project-serum/anchor";

export interface Witness {
  address: string;
  url: string;
}

export interface SignedClaim {
  claimData: ClaimData;
  signatures: number[][];
}

export interface ClaimData {
  identifier: number[];
  owner: string;
  timestamp: number;
  epochIndex: number;
}

export interface EpochConfig {
  bump: number;
  createKey: PublicKey;
  deployer: PublicKey;
  epochDurationSeconds: BN;
  epochIndex: number;
  epochs: PublicKey[];
}

export interface Epoch {
  bump: number;
  epochConfig: PublicKey;
  index: number;
  createdAt: BN;
  expiredAt: BN;
  minimumWitnessesForClaim: number;
  witnesses: Witness[];
}

export interface Group {
  id: number;
  bump: number;
  creator: PublicKey;
  provider: string;
  members: PublicKey[];
}

export interface Dapp {
  id: number;
  groupRoot: BN;
  bump: number;
  createKey: PublicKey;
  creator: PublicKey;
  group: PublicKey;
}
