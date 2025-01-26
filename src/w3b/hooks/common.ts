import { fetchAsset, fetchCollection } from "@metaplex-foundation/mpl-core"


export enum AssetColor {
    BLUE="BLUE",
    BLACK="BLACK",
    WHITE="WHITE",
}

export enum AssetSize {
    LARGE="LARGE",
    XL="XL",
    XXL="XXL",
    XXXL="XXXL",
}


type P = Parameters<typeof fetchAsset>
export type FetchCoreAssetParams = {
    address:P[1],
    options?:P[2]
}

type Q = Parameters<typeof fetchCollection>
export type FetchCoreCollectionParams = {
    address:P[1],
    options?:P[2]
}