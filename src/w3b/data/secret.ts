import { Keypair } from "@solana/web3.js";
import { fromWeb3JsKeypair } from '@metaplex-foundation/umi-web3js-adapters';

const __collectionSecretKey = JSON.parse(import.meta.env.VITE_SECRET_KEY);


const __collectionKeyPair = Keypair.fromSecretKey(new Uint8Array(__collectionSecretKey));

export const collectionKeyPair = fromWeb3JsKeypair(__collectionKeyPair)

export const collectionPublicKey = collectionKeyPair.publicKey;