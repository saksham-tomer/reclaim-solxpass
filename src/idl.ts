export const idl = {
  version: "0.1.0",
  name: "reclaim",
  instructions: [
    {
      name: "initializeEpochConfig",
      accounts: [
        {
          name: "epochConfig",
          isMut: true,
          isSigner: false,
        },
        {
          name: "createKey",
          isMut: false,
          isSigner: true,
        },
        {
          name: "deployer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "args",
          type: {
            defined: "InitializeEpochConfigArgs",
          },
        },
      ],
    },
    {
      name: "changeEpochIndexEpochConfig",
      accounts: [
        {
          name: "epochConfig",
          isMut: true,
          isSigner: false,
        },
        {
          name: "deployer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "args",
          type: {
            defined: "ChangeEpochIndexEpochConfigArgs",
          },
        },
      ],
    },
    {
      name: "addEpoch",
      accounts: [
        {
          name: "epoch",
          isMut: true,
          isSigner: false,
        },
        {
          name: "epochConfig",
          isMut: true,
          isSigner: false,
        },
        {
          name: "rentPayer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "deployer",
          isMut: false,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "args",
          type: {
            defined: "AddEpochArgs",
          },
        },
      ],
    },
    {
      name: "createGroup",
      accounts: [
        {
          name: "group",
          isMut: true,
          isSigner: false,
        },
        {
          name: "creator",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "args",
          type: {
            defined: "CreateGroupArgs",
          },
        },
      ],
    },
    {
      name: "verifyProof",
      accounts: [
        {
          name: "epoch",
          isMut: false,
          isSigner: false,
        },
        {
          name: "epochConfig",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "args",
          type: {
            defined: "VerifyProofArgs",
          },
        },
      ],
    },
    {
      name: "createDapp",
      accounts: [
        {
          name: "dapp",
          isMut: true,
          isSigner: false,
        },
        {
          name: "group",
          isMut: false,
          isSigner: false,
        },
        {
          name: "createKey",
          isMut: false,
          isSigner: true,
        },
        {
          name: "creator",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "args",
          type: {
            defined: "CreateDappArgs",
          },
        },
      ],
    },
  ],
  accounts: [
    {
      name: "Dapp",
      type: {
        kind: "struct",
        fields: [
          {
            name: "id",
            type: "u32",
          },
          {
            name: "groupRoot",
            type: "u64",
          },
          {
            name: "bump",
            type: "u8",
          },
          {
            name: "createKey",
            type: "publicKey",
          },
          {
            name: "creator",
            type: "publicKey",
          },
          {
            name: "group",
            type: "publicKey",
          },
        ],
      },
    },
    {
      name: "EpochConfig",
      type: {
        kind: "struct",
        fields: [
          {
            name: "bump",
            type: "u8",
          },
          {
            name: "createKey",
            type: "publicKey",
          },
          {
            name: "deployer",
            type: "publicKey",
          },
          {
            name: "epochDurationSeconds",
            type: "u64",
          },
          {
            name: "epochIndex",
            type: "u32",
          },
          {
            name: "epochs",
            type: {
              vec: "publicKey",
            },
          },
        ],
      },
    },
    {
      name: "Epoch",
      type: {
        kind: "struct",
        fields: [
          {
            name: "bump",
            type: "u8",
          },
          {
            name: "epochConfig",
            type: "publicKey",
          },
          {
            name: "index",
            type: "u32",
          },
          {
            name: "createdAt",
            type: "i64",
          },
          {
            name: "expiredAt",
            type: "i64",
          },
          {
            name: "minimumWitnessesForClaim",
            type: "u8",
          },
          {
            name: "witnesses",
            type: {
              vec: {
                defined: "Witness",
              },
            },
          },
        ],
      },
    },
    {
      name: "Group",
      type: {
        kind: "struct",
        fields: [
          {
            name: "id",
            type: "u32",
          },
          {
            name: "bump",
            type: "u8",
          },
          {
            name: "creator",
            type: "publicKey",
          },
          {
            name: "provider",
            type: "string",
          },
          {
            name: "members",
            type: {
              vec: "publicKey",
            },
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "CreateDappArgs",
      type: {
        kind: "struct",
        fields: [
          {
            name: "groupRoot",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "AddEpochArgs",
      type: {
        kind: "struct",
        fields: [
          {
            name: "witnesses",
            type: {
              vec: {
                defined: "Witness",
              },
            },
          },
          {
            name: "minimumWitnessesForClaim",
            type: "u8",
          },
        ],
      },
    },
    {
      name: "ChangeEpochIndexEpochConfigArgs",
      type: {
        kind: "struct",
        fields: [
          {
            name: "newEpochIndex",
            type: "u32",
          },
        ],
      },
    },
    {
      name: "InitializeEpochConfigArgs",
      type: {
        kind: "struct",
        fields: [
          {
            name: "epochDurationSeconds",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "CreateGroupArgs",
      type: {
        kind: "struct",
        fields: [
          {
            name: "provider",
            type: "string",
          },
        ],
      },
    },
    {
      name: "VerifyProofArgs",
      type: {
        kind: "struct",
        fields: [
          {
            name: "signedClaim",
            type: {
              defined: "SignedClaim",
            },
          },
        ],
      },
    },
    {
      name: "Witness",
      type: {
        kind: "struct",
        fields: [
          {
            name: "address",
            type: "string",
          },
          {
            name: "url",
            type: "string",
          },
        ],
      },
    },
    {
      name: "SignedClaim",
      type: {
        kind: "struct",
        fields: [
          {
            name: "claimData",
            type: {
              defined: "ClaimData",
            },
          },
          {
            name: "signatures",
            type: {
              vec: {
                array: ["u8", 65],
              },
            },
          },
        ],
      },
    },
    {
      name: "ClaimInfo",
      type: {
        kind: "struct",
        fields: [
          {
            name: "provider",
            type: "string",
          },
          {
            name: "parameters",
            type: "string",
          },
          {
            name: "contextAddress",
            type: "string",
          },
          {
            name: "contextMessage",
            type: "string",
          },
        ],
      },
    },
    {
      name: "ClaimData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "identifier",
            type: {
              array: ["u8", 32],
            },
          },
          {
            name: "owner",
            type: "string",
          },
          {
            name: "timestamp",
            type: "u32",
          },
          {
            name: "epochIndex",
            type: "u32",
          },
        ],
      },
    },
  ],
  events: [
    {
      name: "AddEpochEvent",
      fields: [
        {
          name: "bump",
          type: "u8",
          index: false,
        },
        {
          name: "epochConfig",
          type: "publicKey",
          index: false,
        },
        {
          name: "index",
          type: "u32",
          index: false,
        },
        {
          name: "createdAt",
          type: "i64",
          index: false,
        },
        {
          name: "expiredAt",
          type: "i64",
          index: false,
        },
        {
          name: "minimumWitnessesForClaim",
          type: "u8",
          index: false,
        },
        {
          name: "witnesses",
          type: {
            vec: {
              defined: "Witness",
            },
          },
          index: false,
        },
      ],
    },
    {
      name: "CreateGroupEvent",
      fields: [
        {
          name: "id",
          type: "u32",
          index: false,
        },
        {
          name: "groupAddress",
          type: "publicKey",
          index: false,
        },
        {
          name: "provider",
          type: "string",
          index: false,
        },
      ],
    },
    {
      name: "CreateDappEvent",
      fields: [
        {
          name: "id",
          type: "u32",
          index: false,
        },
      ],
    },
  ],
  errors: [
    {
      code: 6000,
      name: "InvalidEpochDuration",
      msg: "Invalid Epoch Duration",
    },
    {
      code: 6001,
      name: "InvalidEpochIndex",
      msg: "Invalid Epoch Index",
    },
    {
      code: 6002,
      name: "InvalidWitness",
      msg: "Invalid Witness",
    },
    {
      code: 6003,
      name: "Unauthorized",
      msg: "Unauthorized address",
    },
    {
      code: 6004,
      name: "HostTooLong",
      msg: "Host length exceeds limit",
    },
    {
      code: 6005,
      name: "ProviderTooLong",
      msg: "Provider length exceeds limit",
    },
    {
      code: 6006,
      name: "InvalidWitnessClaimCount",
      msg: "Invalid Witnes Claim count",
    },
    {
      code: 6007,
      name: "EpochAlreadyExists",
      msg: "Epoch already exists",
    },
    {
      code: 6008,
      name: "MaxEpochLengthReached",
      msg: "Max Epochs reached",
    },
    {
      code: 6009,
      name: "MaxWitnessesReached",
      msg: "Max Witnesses reached",
    },
    {
      code: 6010,
      name: "MemberAlreadyExists",
      msg: "Member already exists",
    },
    {
      code: 6011,
      name: "MaxMembersReached",
      msg: "Max Members reached",
    },
    {
      code: 6012,
      name: "InvalidIdentifier",
      msg: "Invalid Identifier",
    },
    {
      code: 6013,
      name: "InvalidWitnessSignature",
      msg: "Invalid Witness Signature",
    },
    {
      code: 6014,
      name: "ArithmeticPanic",
      msg: "Arithmetic Error",
    },
  ],
  metadata: {
    address: "8rYXFrtST4ePpMWcEqhazFyRG2DtCUqgtFmKT7FdjRyp",
    origin: "anchor",
    binaryVersion: "0.29.0",
    libVersion: "0.29.0",
  },
};
