import useUmi from "./useUmi"
import { CollectionV1, create, fetchCollection } from '@metaplex-foundation/mpl-core'
import { publicKey, generateSigner, createSignerFromKeypair, sol, transactionBuilder, Umi } from '@metaplex-foundation/umi'
import { collectionKeyPair } from "../data/secret"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AssetColor, AssetSize } from "./common"
import { transferSol } from "@metaplex-foundation/mpl-toolbox"
import { assetVariantJson, recordStore } from "../data/constants"
import { generateAssetName } from "../utils"



type CreateMintAssetTxParams = {
    umi:Umi,
    color:AssetColor,
    size:AssetSize,
    index?:number,
    collection?:CollectionV1
}

export const createMintAssetTx = async ({umi, color, size, collection:collection_, index=0 }:CreateMintAssetTxParams)=>{
    const assetName = generateAssetName(color, size)
    const assetUri = assetVariantJson[color]
    const collectionSigner = createSignerFromKeypair(umi, collectionKeyPair)
    if(collection_ && collection_.publicKey.toString() !== collectionKeyPair.publicKey.toString()){
        throw Error("Provided Invalid Collection")
    }
    const collection = collection_ ?? await fetchCollection(umi, collectionKeyPair.publicKey)
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
        amount: sol(recordStore.price)
    })
    
    const builder = transactionBuilder().add([payIX, createIX]);
    return builder
}

export default function useMintAsset() {
    const queryClient = useQueryClient()

    const umi = useUmi();
    
    return useMutation({
        mutationFn:async ({
            color,
            size
        }:Pick<CreateMintAssetTxParams, 'color'|'size'>)=>{
            const builder = await createMintAssetTx({umi, color, size})
            return await builder.sendAndConfirm(umi)
        },
        onSuccess(){
            queryClient.invalidateQueries({queryKey:['collection-assets', collectionKeyPair.publicKey]})
            queryClient.invalidateQueries({queryKey:['owner-asset', umi.identity.publicKey]})
        }
    })
}