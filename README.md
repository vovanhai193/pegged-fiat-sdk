# pegged-fiat-sdk


## How to use
```javascript
import {
  PublicKey,
  Connection,
  Keypair,
  Commitment,
} from "@solana/web3.js";
import { AnchorProvider, Wallet, BN, Address } from "@project-serum/anchor";
import { Context, PairClient, PEGGED_FIAT_PROGRAM_TESTNET, REVND_TESTNET, REUSD_TESTNET } from "@renec-foundation/pegged-fiat-sdk";
...

// yourKey = Keypair.fromSecretKey(Uint8Array.from([124, 149, 222, 31, 236, 142, 29, 95...]));

const commitment: Commitment = "confirmed";
const connection = new Connection(consts.RPC_ENDPOINT_URL, { commitment });
const wallet = new Wallet(yourKey);
const provider = new AnchorProvider(connection, wallet, { commitment });

const version = 4;
const ctx = Context.withProvider(provider, new PublicKey(PEGGED_FIAT_PROGRAM_TESTNET));


const pair = await PairClient.getPair(ctx, REUSD_TESTNET, REVND_TESTNET, version);

const lockAmount = new anchor.BN("100000000");
const tx = await pair.lockNMint(wallet.publicKey, lockAmount);
const txid = await tx.buildAndExecute();

console.log("txid", txid);
```

+ Output
```json
```