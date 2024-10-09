import * as anchor from "@project-serum/anchor";
import { Program, BN } from "@project-serum/anchor";
import { PublicKey, SystemProgram } from "@solana/web3.js";

// Import the IDL
import { idl } from "./idl";
import { Dapp, Epoch, EpochConfig, Group, SignedClaim, Witness } from "./types";

export class ReclaimSDK {
  program: Program;

  constructor(provider: anchor.Provider) {
    this.program = new Program(
      idl as anchor.Idl,
      new PublicKey(idl.metadata.address),
      provider
    );
  }

  // Helper function to find PDA
  async findProgramAddress(
    seeds: (Buffer | Uint8Array)[]
  ): Promise<[PublicKey, number]> {
    return await PublicKey.findProgramAddress(seeds, this.program.programId);
  }

  // Instruction: initializeEpochConfig
  async initializeEpochConfig(
    createKey: PublicKey,
    deployer: PublicKey,
    epochDurationSeconds: number
  ): Promise<string> {
    const [epochConfigPDA] = await this.findProgramAddress([
      Buffer.from("epoch_config"),
      createKey.toBuffer(),
    ]);

    return this.program.methods
      .initializeEpochConfig({
        epochDurationSeconds: new BN(epochDurationSeconds),
      })
      .accounts({
        epochConfig: epochConfigPDA,
        createKey,
        deployer,
        systemProgram: SystemProgram.programId,
      })
      .rpc();
  }

  // Instruction: changeEpochIndexEpochConfig
  async changeEpochIndexEpochConfig(
    epochConfigPDA: PublicKey,
    deployer: PublicKey,
    newEpochIndex: number
  ): Promise<string> {
    return this.program.methods
      .changeEpochIndexEpochConfig({
        newEpochIndex: new BN(newEpochIndex),
      })
      .accounts({
        epochConfig: epochConfigPDA,
        deployer,
        systemProgram: SystemProgram.programId,
      })
      .rpc();
  }

  // Instruction: addEpoch
  async addEpoch(
    epochConfigPDA: PublicKey,
    rentPayer: PublicKey,
    deployer: PublicKey,
    witnesses: Witness[],
    minimumWitnessesForClaim: number
  ): Promise<string> {
    const [epochPDA] = await this.findProgramAddress([
      Buffer.from("epoch"),
      epochConfigPDA.toBuffer(),
      Buffer.from(
        (await this.getEpochConfig(epochConfigPDA)).epochIndex.toString()
      ),
    ]);

    return this.program.methods
      .addEpoch({
        witnesses,
        minimumWitnessesForClaim,
      })
      .accounts({
        epoch: epochPDA,
        epochConfig: epochConfigPDA,
        rentPayer,
        deployer,
        systemProgram: SystemProgram.programId,
      })
      .rpc();
  }

  // Instruction: createGroup
  async createGroup(creator: PublicKey, provider: string): Promise<string> {
    const [groupPDA] = await this.findProgramAddress([
      Buffer.from("group"),
      Buffer.from((await this.getNextGroupId()).toString()),
    ]);

    return this.program.methods
      .createGroup({
        provider,
      })
      .accounts({
        group: groupPDA,
        creator,
        systemProgram: SystemProgram.programId,
      })
      .rpc();
  }

  // Instruction: verifyProof
  async verifyProof(
    epochPDA: PublicKey,
    epochConfigPDA: PublicKey,
    signedClaim: SignedClaim
  ): Promise<string> {
    return this.program.methods
      .verifyProof({
        signedClaim,
      })
      .accounts({
        epoch: epochPDA,
        epochConfig: epochConfigPDA,
      })
      .rpc();
  }

  // Instruction: createDapp
  async createDapp(
    groupPDA: PublicKey,
    createKey: PublicKey,
    creator: PublicKey,
    groupRoot: number
  ): Promise<string> {
    const [dappPDA] = await this.findProgramAddress([
      Buffer.from("dapp"),
      Buffer.from((await this.getNextDappId()).toString()),
    ]);

    return this.program.methods
      .createDapp({
        groupRoot: new BN(groupRoot),
      })
      .accounts({
        dapp: dappPDA,
        group: groupPDA,
        createKey,
        creator,
        systemProgram: SystemProgram.programId,
      })
      .rpc();
  }

  // Fetch EpochConfig
  async getEpochConfig(epochConfigPDA: PublicKey): Promise<EpochConfig> {
    const account = await this.program.account.epochConfig.fetch(
      epochConfigPDA
    );
    return {
      bump: account.bump,
      createKey: account.createKey,
      deployer: account.deployer,
      epochDurationSeconds: account.epochDurationSeconds,
      epochIndex: account.epochIndex,
      epochs: account.epochs,
    };
  }

  // Fetch Epoch
  async getEpoch(epochPDA: PublicKey): Promise<Epoch> {
    const account = await this.program.account.epoch.fetch(epochPDA);
    return {
      bump: account.bump,
      epochConfig: account.epochConfig,
      index: account.index,
      createdAt: account.createdAt,
      expiredAt: account.expiredAt,
      minimumWitnessesForClaim: account.minimumWitnessesForClaim,
      witnesses: account.witnesses,
    };
  }

  // Fetch Group
  async getGroup(groupPDA: PublicKey): Promise<Group> {
    const account = await this.program.account.group.fetch(groupPDA);
    return {
      id: account.id,
      bump: account.bump,
      creator: account.creator,
      provider: account.provider,
      members: account.members,
    };
  }

  // Fetch Dapp
  async getDapp(dappPDA: PublicKey): Promise<Dapp> {
    const account = await this.program.account.dapp.fetch(dappPDA);
    return {
      id: account.id,
      groupRoot: account.groupRoot,
      bump: account.bump,
      createKey: account.createKey,
      creator: account.creator,
      group: account.group,
    };
  }

  // Helper: Get next Group ID
  private async getNextGroupId(): Promise<number> {
    const groups = await this.program.account.group.all();
    return groups.length > 0
      ? Math.max(...groups.map((g) => g.account.id)) + 1
      : 0;
  }

  // Helper: Get next Dapp ID
  private async getNextDappId(): Promise<number> {
    const dapps = await this.program.account.dapp.all();
    return dapps.length > 0
      ? Math.max(...dapps.map((d) => d.account.id)) + 1
      : 0;
  }
}
