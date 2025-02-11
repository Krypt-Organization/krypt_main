import useUmi from "./useUmi"
import { fetchCollection } from '@metaplex-foundation/mpl-core'
import { transactionBuilder } from '@metaplex-foundation/umi'
import { collectionKeyPair } from "../data/secret"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AssetColor, AssetSize, confirmAndVerify, wrappedCoreFetch } from "./common"
import { createMintAssetTx } from "./useMintAsset"
import useMarketValue from "./useMarketValue"


type Asset = {
    color:AssetColor,
    size:AssetSize
}

export type MintMultipleAssetParams = Asset[]

export default function useMintMultipleAsset() {
    const queryClient = useQueryClient()
    const {data:solUSDBasePrice} = useMarketValue()
    const umi = useUmi();
    
    return useMutation({
        mutationFn:async (assets:MintMultipleAssetParams)=>{
            const collection = await wrappedCoreFetch(fetchCollection)(umi, collectionKeyPair.publicKey)

            if(!collection){
                throw Error("Collection not available");
            }

            if(!solUSDBasePrice || isNaN(solUSDBasePrice) || solUSDBasePrice <= 0){
                throw Error(`Asset market price not determined: ${solUSDBasePrice}`, )
            } 
            const mintOutput = await Promise.all(
                assets.map((asset, idx)=>
                    //idx ensures that edition number is unique
                    createMintAssetTx({umi, color:asset.color, size:asset.size, usdPrice:solUSDBasePrice, collection, index:idx})
                )
            )
            const txs = mintOutput.map(val=>val.builder);
            const assetSigners = mintOutput.map(val=>val.assetSigner)
            const builder = transactionBuilder().add(txs);
            //return await builder.sendAndConfirm(umi)
            const sig = await builder.send(umi)
            const res = await confirmAndVerify(umi, sig, assetSigners[0].publicKey)
            if(res?.err){
                throw Error(res.err)
            }
            return {signature:sig}
        },
        onSuccess(data){
            queryClient.invalidateQueries({queryKey:['collection-assets', collectionKeyPair.publicKey]})
            queryClient.invalidateQueries({queryKey:['owner-asset', umi.identity.publicKey]})
        }
    })
}