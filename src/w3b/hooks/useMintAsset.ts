import useUmi from "./useUmi"
import { CollectionV1, create, fetchCollection } from '@metaplex-foundation/mpl-core'
import { publicKey, generateSigner, createSignerFromKeypair, sol, transactionBuilder, Umi } from '@metaplex-foundation/umi'
import { collectionKeyPair } from "../data/secret"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AssetColor, AssetSize, confirmAndVerify, wrappedCoreFetch } from "./common"
import { transferSol } from "@metaplex-foundation/mpl-toolbox"
import { assetVariantJson, recordStore } from "../data/constants"
import { generateAssetName } from "../utils"
import useMarketValue from "./useMarketValue"



type CreateMintAssetTxParams = {
    umi:Umi,
    color:AssetColor,
    size:AssetSize,
    usdPrice:number,
    index?:number,
    collection?:CollectionV1
}

export const createMintAssetTx = async ({umi, color, size, usdPrice, collection:collection_, index=0 }:CreateMintAssetTxParams)=>{
    
    const assetPrice = recordStore.price/usdPrice;
    const assetName = generateAssetName(color, size)
    const assetUri = assetVariantJson[color]
    const collectionSigner = createSignerFromKeypair(umi, collectionKeyPair)
    if(collection_ && collection_.publicKey.toString() !== collectionKeyPair.publicKey.toString()){
        throw Error("Provided Invalid Collection")
    }
    const collection = collection_ ?? await wrappedCoreFetch(fetchCollection)(umi, collectionKeyPair.publicKey)
    if(!collection){
        throw Error("Collection not available");
    }
    const assetSigner = generateSigner(umi)
    const createIX = create(umi, {
        collection:collection,
        asset:assetSigner,
        name: assetName,
        uri: assetUri,
        authority:collectionSigner,
        plugins:[
            {
                type:"Edition",
                number:collection.currentSize + 1 + index,
                authority: {
                    type: "None"
                }
            },
            {
                type: "Attributes",
                attributeList:[
                    {
                        key: "color",
                        value: color
                    },
                    {
                        key: "size",
                        value: size
                    }
                ],
                authority:{
                    type: "None"
                }
            }
        ]
    })
    
    const payIX = transferSol(umi, {
        destination: publicKey(recordStore.creator),
        amount: sol(assetPrice)
    })
    
    const builder = transactionBuilder().add([payIX, createIX]);
    return {builder, assetSigner}
}

export default function useMintAsset() {
    const queryClient = useQueryClient()
    const {data:solUSDBasePrice} = useMarketValue()
    const umi = useUmi();

    return useMutation({
        mutationFn:async ({
            color,
            size
        }:Pick<CreateMintAssetTxParams, 'color'|'size'>)=>{
            if(!solUSDBasePrice || isNaN(solUSDBasePrice) || solUSDBasePrice <= 0){
                throw Error(`Asset market price not determined: ${solUSDBasePrice}`, )
            } 
            const {builder, assetSigner} = await createMintAssetTx({umi, color, size, usdPrice:solUSDBasePrice})
            //return await builder.sendAndConfirm(umi)
            const sig = await builder.send(umi)
            const res = await confirmAndVerify(umi, sig, assetSigner.publicKey)
            if(res?.err){
                throw Error(res.err)
            }
            return publicKey(sig)
        },
        onSuccess(){
            queryClient.invalidateQueries({queryKey:['collection-assets', collectionKeyPair.publicKey]})
            queryClient.invalidateQueries({queryKey:['owner-asset', umi.identity.publicKey]})
        }
    })
}