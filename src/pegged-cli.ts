#! /usr/bin/env node

require("dotenv").config();
const fs = require("fs");
import { Command } from "commander";
import * as anchor from "@project-serum/anchor";
import { Program, Idl, BN } from "@project-serum/anchor";
import PeggedFiatIDL from "./artifacts/pegged_fiat.json";
import { PeggedFiat } from "./artifacts/pegged_fiat";

import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { SYSVAR_RENT_PUBKEY, SystemProgram, PublicKey, Connection } from "@solana/web3.js";
import { keypairFromJson, PDA, PairClient, Context } from "./index";

// import ownerKey from "./.wallets/owner.json";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import * as OracleSDK from "@renec-foundation/oracle-sdk";
const __path = process.cwd();

const figlet = require("figlet");

const MAINNET_RPC = "https://api-mainnet-beta.renec.foundation:8899/";
const TESTNET_RPC = "https://api-testnet.renec.foundation:8899/";
const LOCAL_RPC = "http://localhost:8899/";
const PEGGED_FIAT = "pegged_fiat_v1";

console.log(figlet.textSync("Pegged  Fiat"));
console.log("");

const ownerKey = JSON.parse(fs.readFileSync(__path + "/sdk/src/.wallets/owner.json"));

const program = new Command();

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function connectCluster(
  rpc: string,
  ownerKey: number[],
  programId: PublicKey
): Promise<Context> {
  const connection = new Connection(rpc);
  const wallet = new NodeWallet(keypairFromJson(ownerKey));
  const anchorProvider = new anchor.Provider(connection, wallet, anchor.Provider.defaultOptions());
  const ctx = Context.withProvider(anchorProvider, programId);

  return ctx;
}

program
  .command("initialize")
  .description("initialize a new pegged-fiat controller.")
  .option("-o, --oracle-program-id <string>", "Oracle program ID")
  .option("-n, --network <string>", "Network: mainnet, testnet, localnet", "mainnet")
  .option("-v, --version <number>", "Version of the controller", "1")
  .action(async (params) => {
    let { version, network, oracleProgramId } = params;

    console.log("Initializing a new pegged-fiat controller.");
    console.log("params:", params);

    if (isNaN(version)) {
      console.log("Error: -v or --version must be valid number");
      return;
    }
    version = parseInt(version);

    if (!oracleProgramId || oracleProgramId === "") {
      console.log("Error: -o or --oracle-program-id is required");
      return;
    }
    oracleProgramId = new PublicKey(oracleProgramId);

    if (!network || (network !== "mainnet" && network !== "testnet" && network !== "localnet")) {
      console.log("Error: -n, --network is required. [mainnet, testnet, localnet]");
      return;
    }

    let rpc = MAINNET_RPC;
    if (network === "testnet") {
      rpc = TESTNET_RPC;
    }
    if (network === "localnet") {
      rpc = LOCAL_RPC;
    }

    if (!process.env.PROGRAM_ID) {
      console.log("PROGRAM_ID is not found in .env file");
      return;
    }

    const ctx = await connectCluster(rpc, ownerKey, new PublicKey(process.env.PROGRAM_ID));

    const { provider, program } = ctx;
    const { wallet } = provider;

    if (!wallet.publicKey) {
      console.log("Error: Please provide owner key. `export OWNER_KEY=`");
      return;
    }
    console.log(`RPC: ${rpc}`);
    console.log(`Owner: ${wallet.publicKey.toBase58()}`);
    console.log(`Pegged-Fiat-v2 Id: ${program.programId.toBase58()}`);
    console.log();

    const pda = new PDA(program.programId);
    const controller = pda.controller(version);

    const signature = await program.rpc.initialize(controller.bump, version, {
      accounts: {
        authority: wallet.publicKey,
        controller: controller.key,
        oracleProgramId,
        systemProgram: anchor.web3.SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
      },
    });

    console.log(`pegged-fiat-v2 controller: ${controller.key.toBase58()}`);
    console.log(`https://explorer.renec.foundation/tx/${signature}?cluster=${network}`);
    console.log("");
  });

program
  .command("addPair")
  .description("add new pair of lock and mint tokens")
  .option("--mintToken <string>", "mint token address")
  .option("--lockToken <string>", "lock token address")
  .option("--safeMargin <string>", "safe margin %. E.g: safeMargin=10000 => 100%")
  .option(
    "-max, --maxPrice <number>",
    "The maximum price. Example: maximum 1 reUSD = 25000.83 reVND"
  )
  .option(
    "-min, --minPrice <number>",
    "The minimum price. Example: minimum 1 reUSD = 22000.23 reVND"
  )
  .option("-o, --oracle-program-id <string>", "Oracle program ID")
  .option("-n, --network <string>", "Network: mainnet, testnet, localnet", "mainnet")
  .option("-v, --version <number>", "Version of the controller", "1")
  .action(async (params) => {
    let {
      version,
      network,
      oracleProgramId,
      mintToken,
      lockToken,
      safeMargin,
      maxPrice,
      minPrice,
    } = params;

    console.log("Adding a new pair of lock and mint tokens.");
    console.log("params:", params);

    if (!mintToken || mintToken === "" || !lockToken || lockToken === "") {
      console.log("Error: --mintToken and --lockToken is required");
      return;
    }

    if (isNaN(safeMargin)) {
      console.log("Error: --safeMargin is required. safeMargin > 0 & safeMargin <= 10000");
      return;
    }

    if (isNaN(maxPrice)) {
      console.log("Error: -max, --maxPrice must be valid number");
      return;
    }

    if (isNaN(minPrice)) {
      console.log("Error: -min, --minPrice must be valid number");
      return;
    }

    const reVNDToken = new PublicKey(mintToken);
    const reUSDToken = new PublicKey(lockToken);

    if (!oracleProgramId || oracleProgramId === "") {
      console.log("Error: -o or --oracle-program-id is required");
      return;
    }
    oracleProgramId = new PublicKey(oracleProgramId);

    if (isNaN(version)) {
      console.log("Error: -v or --version must be valid number");
      return;
    }
    version = parseInt(version);

    if (!network || (network !== "mainnet" && network !== "testnet" && network !== "localnet")) {
      console.log("Error: -n, --network is required. [mainnet, testnet, localnet]");
      return;
    }

    let rpc = MAINNET_RPC;
    if (network === "testnet") {
      rpc = TESTNET_RPC;
    }
    if (network === "localnet") {
      rpc = LOCAL_RPC;
    }

    if (!process.env.PROGRAM_ID) {
      console.log("PROGRAM_ID is not found in .env file");
      return;
    }

    const ctx = await connectCluster(rpc, ownerKey, new PublicKey(process.env.PROGRAM_ID));

    const { provider, program } = ctx;
    const { programId } = program;
    const { wallet } = provider;

    console.log(`RPC: ${rpc}`);
    console.log(`Owner: ${wallet.publicKey.toBase58()}`);
    console.log(`Pegged-Fiat-v2 Id: ${programId.toBase58()}`);
    console.log();

    const expo = -2;
    const fee = 0;
    const tx = await PairClient.new(
      ctx,
      ctx.wallet.publicKey,
      reVNDToken,
      reUSDToken,
      fee,
      safeMargin,
      expo,
      maxPrice,
      minPrice,
      version
    );

    const signature = await tx.buildAndExecute();
    console.log(`https://explorer.renec.foundation/tx/${signature}?cluster=${network}`);
    console.log("");
  });

program
  .command("lockWithoutMint")
  .description("Only Admin can use this function to lock tokens into a pair.")
  .option("--mintToken <string>", "mint token address")
  .option("--lockToken <string>", "lock token address")
  .option("--lockAmount <number>", "Amount tokens will be locked")
  .option(
    "--mintAmount <number>",
    "Amount tokens will be marked is `minted`, this is used to specify price."
  )
  .option("--numRecords <number>", "Create `numRecords` transactions for `lockAmount` ", "10")
  .option("-n, --network <string>", "Network: mainnet, testnet, localnet", "mainnet")
  .option("-v, --version <number>", "Version of the controller", "1")
  .action(async (params) => {
    let { version, network, mintToken, lockToken, lockAmount, mintAmount, numRecords } = params;

    console.log("params:", params);

    if (!mintToken || mintToken === "" || !lockToken || lockToken === "") {
      console.log("Error: --mintToken and --lockToken is required");
      return;
    }

    if (isNaN(lockAmount)) {
      console.log("Error: --lockAmount must be valid number");
      return;
    }

    if (isNaN(mintAmount)) {
      console.log("Error: --mintAmount must be valid number");
      return;
    }

    if (isNaN(numRecords)) {
      console.log("Error: --numRecords must be valid number");
      return;
    }

    if (lockAmount <= 0) {
      console.log("Error: --lockAmount must be > 0");
      return;
    }

    if (mintAmount <= 0) {
      console.log("Error: --mintAmount must be > 0");
      return;
    }

    if (numRecords > 10 || numRecords <= 0) {
      console.log("Error: --numRecords must be in [1:10] range");
      return;
    }

    const reVNDToken = new PublicKey(mintToken);
    const reUSDToken = new PublicKey(lockToken);

    if (isNaN(version)) {
      console.log("Error: -v or --version must be valid number");
      return;
    }
    version = parseInt(version);

    if (!network || (network !== "mainnet" && network !== "testnet" && network !== "localnet")) {
      console.log("Error: -n, --network is required. [mainnet, testnet, localnet]");
      return;
    }

    let rpc = MAINNET_RPC;
    if (network === "testnet") {
      rpc = TESTNET_RPC;
    }
    if (network === "localnet") {
      rpc = LOCAL_RPC;
    }

    if (!process.env.PROGRAM_ID) {
      console.log("PROGRAM_ID is not found in .env file");
      return;
    }

    const ctx = await connectCluster(rpc, ownerKey, new PublicKey(process.env.PROGRAM_ID));

    const { provider, program } = ctx;
    const { programId } = program;
    const { wallet } = provider;

    console.log(`RPC: ${rpc}`);
    console.log(`Owner: ${wallet.publicKey.toBase58()}`);
    console.log(`Pegged-Fiat-v2 Id: ${programId.toBase58()}`);
    console.log();

    const pair = await PairClient.getPair(ctx, reVNDToken, reUSDToken, version);

    const _numRecords = new BN(numRecords);
    const lockAmountInDecimal = new BN(lockAmount)
      .mul(new BN(10).pow(pair.lockDecimals))
      .div(_numRecords);
    const mintAmountInDecimal = new BN(mintAmount)
      .mul(new BN(10).pow(pair.mintDecimals))
      .div(_numRecords);

    let locked = new BN(0);
    for (let i = 0; i < _numRecords.toNumber(); i++) {
      await pair.refresh();
      const tx = await pair.lockWithoutMint(
        wallet.publicKey,
        lockAmountInDecimal,
        mintAmountInDecimal
      );
      const signature = await tx.buildAndExecute();
      console.log(`https://explorer.renec.foundation/tx/${signature}?cluster=${network}`);
      await sleep(10000);
    }
    console.log("DONE");
  });

program
  .command("migrate")
  .description("migrate pegged-fiat from v1 to v2")
  .option("--mintToken <string>", "mint token address")
  .option("--lockToken <string>", "lock token address")
  .option("-n, --network <string>", "Network: mainnet, testnet, localnet", "mainnet")
  .option("-v, --version <number>", "Version of the controller", "1")
  .action(async (params) => {
    let { version, network, mintToken, lockToken } = params;
    console.log("Migrating pegged-fiat from v1 to v2.");
    console.log("params:", params);
    console.log("");

    if (!mintToken || mintToken === "" || !lockToken || lockToken === "") {
      console.log("Error: --mintToken and --lockToken is required");
      return;
    }
    const reVNDToken = new PublicKey(mintToken);
    const reUSDToken = new PublicKey(lockToken);

    if (isNaN(version)) {
      console.log("Error: -v or --version must be valid number");
      return;
    }
    version = parseInt(version);
    if (!network || (network !== "mainnet" && network !== "testnet" && network !== "localnet")) {
      console.log("Error: -n, --network is required. [mainnet, testnet, localnet]");
      return;
    }
    let rpc = MAINNET_RPC;
    if (network === "testnet") {
      rpc = TESTNET_RPC;
    }
    if (network === "localnet") {
      rpc = LOCAL_RPC;
    }
    if (!process.env.PROGRAM_ID) {
      console.log("PROGRAM_ID is not found in .env file");
      return;
    }
    const ctx = await connectCluster(rpc, ownerKey, new PublicKey(process.env.PROGRAM_ID));
    const { provider, program } = ctx;
    const { programId } = program;
    const { wallet } = provider;

    console.log(`RPC: ${rpc}`);
    console.log(`Owner: ${wallet.publicKey.toBase58()}`);
    console.log(`Pegged-Fiat-v2 Id: ${programId.toBase58()}`);
    console.log();

    const [controllerV1] = anchor.web3.PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode(PEGGED_FIAT), reVNDToken.toBuffer()],
      programId
    );

    let controllerV1Info;
    try {
      controllerV1Info = await program.account.controllerV1.fetch(controllerV1);
    } catch (e) {
      console.log("Controller V1 is not found:", controllerV1.toBase58());
      return;
    }

    const pair = await PairClient.getPair(ctx, reVNDToken, reUSDToken, version);
    const { pairData, pairKey } = pair;
    if (pairData.mintToken.toBase58() !== controllerV1Info.tokenMint.toBase58()) {
      console.log(
        `Mint token ${pairData.mintToken.toBase58()} different ${controllerV1Info.tokenMint.toBase58()}`
      );
      return;
    }

    // transfer authority
    const signature = await program.rpc.setAuthorityV1({
      accounts: {
        owner: wallet.publicKey,
        controllerV1: controllerV1,
        newController: pairKey,
        tokenMint: pairData.mintToken,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      },
    });

    console.log(
      `Transfered mint authority of mint token from ${controllerV1.toBase58()} to ${pairKey.toBase58()}`
    );
    console.log(`https://explorer.renec.foundation/tx/${signature}?cluster=${network}`);
    console.log("");
  });

program.parse();
