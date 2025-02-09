import { fetchAsset, fetchCollection } from "@metaplex-foundation/mpl-core"
import { PublicKey, publicKey, Umi } from "@metaplex-foundation/umi"


export enum AssetColor {
    BLUE = "BLUE",
    BLACK = "BLACK",
    WHITE = "WHITE",
}

export enum AssetSize {
    LARGE = "LARGE",
    XL = "XL",
    XXL = "XXL",
    XXXL = "XXXL",
}


type P = Parameters<typeof fetchAsset>
export type FetchCoreAssetParams = {
    address: P[1],
    options?: P[2]
}

type Q = Parameters<typeof fetchCollection>
export type FetchCoreCollectionParams = {
    address: P[1],
    options?: P[2]
}

/**
 * Checks for address existence before making on chain calls
 * @param fn MPL-Core Function
 * @returns Wrapped Provided Function
 */
export function wrappedCoreFetch<
    CoreFnArgs extends Parameters<CoreFn>,
    CoreFnResult,
    CoreFn extends (...args: any[]) => unknown,
    U extends Umi,V extends PublicKey>
    (fn: (...args: CoreFnArgs) => Promise<CoreFnResult>) {
    return async (...args:CoreFnArgs)=>{
        const umi = args[0] as U;
        const address = args[1] as V;
        if (await umi.rpc.accountExists(publicKey(address))) {
            return await fn(...args)
        }
        return null
    }
}