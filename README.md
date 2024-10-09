# reclaim-solxpass

![23c691c8-68cf-4d84-98a9-30240117d105](https://github.com/user-attachments/assets/662981c1-7622-4b2d-9007-a801944abca4)


[![npm version](https://img.shields.io/npm/v/reclaim-solxpass.svg)](https://www.npmjs.com/package/reclaim-solxpass)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](https://www.typescriptlang.org/)

A powerful and easy-to-use TypeScript SDK for interacting with the Reclaim Solana program. Simplify your blockchain development with reclaim-solxpass!

## 🚀 Features

- Full TypeScript support
- Comprehensive set of methods to interact with the Reclaim Solana program
- Built-in type definitions for all program accounts and instructions
- Easy integration with existing Solana projects

## 📦 Installation

Install reclaim-solxpass using npm:

```bash
npm install reclaim-solxpass
```

## 🛠️ Usage

Here's a quick example to get you started:

```typescript
import { Connection, Keypair } from '@solana/web3.js';
import { AnchorProvider, Wallet } from '@project-serum/anchor';
import { ReclaimSDK } from 'reclaim-solxpass';

async function main() {
  // Set up connection and provider
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
  const wallet = new Wallet(Keypair.generate());
  const provider = new AnchorProvider(connection, wallet, {});

  // Instantiate the SDK
  const reclaimSDK = new ReclaimSDK(provider);

  // Example: Initialize EpochConfig
  const createKey = Keypair.generate().publicKey;
  const txHash = await reclaimSDK.initializeEpochConfig(
    createKey,
    wallet.publicKey,
    86400 // 1 day in seconds
  );
  console.log('EpochConfig initialized. Transaction hash:', txHash);

  // Fetch and display EpochConfig
  const [epochConfigPDA] = await reclaimSDK.findProgramAddress([
    Buffer.from('epoch_config'),
    createKey.toBuffer(),
  ]);
  const epochConfig = await reclaimSDK.getEpochConfig(epochConfigPDA);
  console.log('EpochConfig:', epochConfig);
}

main().catch(console.error);
```

## 📘 API Reference

### `ReclaimSDK`

The main class for interacting with the Reclaim Solana program.

#### Constructor

```typescript
constructor(provider: anchor.Provider)
```

#### Methods

- `initializeEpochConfig(createKey: PublicKey, deployer: PublicKey, epochDurationSeconds: number): Promise<string>`
- `changeEpochIndexEpochConfig(epochConfigPDA: PublicKey, deployer: PublicKey, newEpochIndex: number): Promise<string>`
- `addEpoch(epochConfigPDA: PublicKey, rentPayer: PublicKey, deployer: PublicKey, witnesses: Witness[], minimumWitnessesForClaim: number): Promise<string>`
- `createGroup(creator: PublicKey, provider: string): Promise<string>`
- `verifyProof(epochPDA: PublicKey, epochConfigPDA: PublicKey, signedClaim: SignedClaim): Promise<string>`
- `createDapp(groupPDA: PublicKey, createKey: PublicKey, creator: PublicKey, groupRoot: number): Promise<string>`
- `getEpochConfig(epochConfigPDA: PublicKey): Promise<EpochConfig>`
- `getEpoch(epochPDA: PublicKey): Promise<Epoch>`
- `getGroup(groupPDA: PublicKey): Promise<Group>`
- `getDapp(dappPDA: PublicKey): Promise<Dapp>`

For detailed information on each method and its parameters, please refer to the source code and inline documentation.

## 🤝 Contributing

We welcome contributions to reclaim-solxpass! Please see our [Contributing Guide](CONTRIBUTING.md) for more details.

## 📄 License

reclaim-solxpass is [MIT licensed](LICENSE).

## 🙋‍♀️ Support

If you have any questions or run into any issues, please open an issue in our [GitHub repository](https://github.com/yourusername/reclaim-solxpass/issues).

---

Made with ❤️ by Saksham-Tomer
