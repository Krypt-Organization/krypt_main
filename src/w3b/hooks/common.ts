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


export const confirmAndVerify = async (umi:Umi, sig:Uint8Array, addr:PublicKey)=>{
    const block = await umi.rpc.getLatestBlockhash()
    try{
        const result = await umi.rpc.confirmTransaction(sig,{
            strategy: {
                type: "blockhash",
                blockhash: block.blockhash,
                lastValidBlockHeight: block.lastValidBlockHeight
            }
        })
        if(result && result.value.err){
            return {
                err:result.value.err.toString()
            }
        }
    }catch(err){
        // In case block height is exceed check if account is created
        if(addr && await umi.rpc.accountExists(addr)){
            return;
        }
        
        return {
            err:err.message
        };
    }
    
    return;
}