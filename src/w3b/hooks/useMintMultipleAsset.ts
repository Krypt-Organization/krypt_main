import useUmi from "./useUmi"
import { fetchCollection } from '@metaplex-foundation/mpl-core'
import { transactionBuilder } from '@metaplex-foundation/umi'
import { collectionKeyPair } from "../data/secret"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AssetColor, AssetSize } from "./common"
import { createMintAssetTx } from "./useMintAsset"


type Asset = {
    color:AssetColor,
    size:AssetSize
}

export type MintMultipleAssetParams = Asset[]

export default function useMintMultipleAsset() {
    const umi = useUmi();

    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn:async (assets:MintMultipleAssetParams)=>{
            const collection = await fetchCollection(umi, collectionKeyPair.publicKey)
            const txs = await Promise.all(
                assets.map((asset, idx)=>
                    //idx ensures that edition number is unique
                    createMintAssetTx({umi, color:asset.color, size:asset.size, collection, index:idx})
                )
            )
            const builder = transactionBuilder().add(txs);
            return await builder.sendAndConfirm(umi)
        },
        onSuccess(data){
            queryClient.invalidateQueries({queryKey:['collection-assets', collectionKeyPair.publicKey]})
        }
    })
}