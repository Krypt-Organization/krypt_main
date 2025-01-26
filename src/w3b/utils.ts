import { base58 } from "@metaplex-foundation/umi/serializers";
import { AssetColor, AssetSize } from "./hooks/common";
import { NFT_BASE_NAME } from "./data/constants";


export const generateAssetName = (color:AssetColor, size: AssetSize)=> 
    `${NFT_BASE_NAME} ${color}#${size}`;


export const toBase58String = (data:Buffer|Uint8Array)=>base58.deserialize(data)[0]
