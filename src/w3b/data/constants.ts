import { AssetColor } from "../hooks/common";

export const WEBSITE_URL = "https://kryptd-main.vercel.app/";
export const IPFS_BASE = "https://ipfs.io/ipfs"
export const NFT_BASE_NAME = "Krypt x Meshvault"

// IMAGES
export const BLACK_IMAGE = `${IPFS_BASE}/bafybeibzzcrkpcqa6kwurlo5sic2ojvcqx7wbxlrhpwqwtihqxslswmvpy`;
export const BLUE_IMAGE = `${IPFS_BASE}/bafybeidj7nx6bw6mtuuzbafgtp2pjslpx2dpngs7ywxeb3yxnykxz4pvky`;
export const WHITE_IMAGE = `${IPFS_BASE}/bafybeib4gdsemdmg5yma6ta3z4i27dka3tenyi2ribppmuwzromvlsdd3q`

// JSON
export const BLACK_JSON = `${IPFS_BASE}/bafkreibudh2762uu7ix2hnxh7jivtn4tivtowxwjlasuuirsbc7zqx3jau`
export const BLUE_JSON = `${IPFS_BASE}/bafkreidgd35psykhndxkfkynsqksg4ej5tur7rndzgqs7qmk2ipysxi3gy`
export const WHITE_JSON = `${IPFS_BASE}/bafkreihvrgh6agcgezb3ncmfgizpubbpajf4vva6wlex5tphx4zdrmbxz4`
export const COLLECTION_JSON = `${IPFS_BASE}/bafkreifvbd5efcyf2lh66b5amizykwjgsh7noc3dfsh25gfiwezozuuutu`


export const assetVariantJson = {
    [AssetColor.BLACK]:BLACK_JSON,
    [AssetColor.BLUE]:BLUE_JSON,
    [AssetColor.WHITE]:WHITE_JSON
}

export const recordStore = {
    uri:COLLECTION_JSON,
    name:NFT_BASE_NAME,
    //TODO: specify original treasurer wallet
    creator:import.meta.env.VITE_CREATOR_ADDRESS,
    royalty:1, // percent
    maxSupply:100, // total supply
    price:0.388038 // SOL
}