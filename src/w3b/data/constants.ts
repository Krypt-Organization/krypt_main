import { AssetColor } from "../hooks/common";

export const WEBSITE_URL = "https://kryptd-main.vercel.app/";
export const IPFS_BASE = "https://ipfs.io/ipfs"
export const NFT_BASE_NAME = "Krypt x Meshvault"

// IMAGES
export const BLACK_IMAGE = `${IPFS_BASE}/bafybeibzzcrkpcqa6kwurlo5sic2ojvcqx7wbxlrhpwqwtihqxslswmvpy`;
export const BLUE_IMAGE = `${IPFS_BASE}/bafybeidj7nx6bw6mtuuzbafgtp2pjslpx2dpngs7ywxeb3yxnykxz4pvky`;
export const WHITE_IMAGE = `${IPFS_BASE}/bafybeib4gdsemdmg5yma6ta3z4i27dka3tenyi2ribppmuwzromvlsdd3q`

// JSON
export const BLACK_JSON = `${IPFS_BASE}/bafkreihfoqbnx35qbvbr55pmv3c7zwzipvm65b6gm4qwrtsalcu6psvilu`
export const BLUE_JSON = `${IPFS_BASE}/bafkreifzipl746ozr4tdizl33fzxmntk6r3wfgcwtowjkrk4z66u2ulqli`
export const WHITE_JSON = `${IPFS_BASE}/bafkreihvrgh6agcgezb3ncmfgizpubbpajf4vva6wlex5tphx4zdrmbxz4`
export const COLLECTION_JSON = `${IPFS_BASE}/bafkreidc24to5hdk2z7chplsscpe6byii22shf3vbatrmzecbhhtv5hm5a`


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
    royalty:parseFloat(import.meta.env.VITE_ROYALTY_PERCENT), // percent
    maxSupply:parseInt(import.meta.env.VITE_MAX_SUPPLY), // total supply
    price:parseFloat(import.meta.env.VITE_DOLLAR_PRICE) // IN DOLLAR
}

const sizeModel = (LARGE, XL, XXL, XXXL)=>({LARGE, XL, XXL, XXXL})

const totalNFTS = {
    BLACK:sizeModel(15, 10, 10, 5),
    WHITE:sizeModel(15, 10, 10, 5),
    BLUE:sizeModel(10, 10, 10, 0)
}