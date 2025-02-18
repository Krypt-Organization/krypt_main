import useUmi from "./useUmi"
import { createCollection, ruleSet } from '@metaplex-foundation/mpl-core'
import { createSignerFromKeypair, publicKey, percentAmount } from '@metaplex-foundation/umi'
import { collectionKeyPair } from "../data/secret"
import { recordStore } from "../data/constants"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { confirmAndVerify } from "./common"


export default function useCreateCollection() {
    const queryClient = useQueryClient()
    const umi = useUmi();
    
    return useMutation({
        mutationFn:async()=>{
            const collectionSigner = createSignerFromKeypair(umi, collectionKeyPair)
            //console.log("Collection address ", collectionSigner.publicKey.toString(), recordStore)
            if(umi.identity.publicKey.toString() !== recordStore.creator){
                throw Error(`Signer address must be ${recordStore.creator}`)
            }
            const tx = createCollection(umi, {
                collection: collectionSigner,
                name: recordStore.name,
                uri: recordStore.uri,
                updateAuthority:collectionKeyPair.publicKey,
                plugins: [
                    {
                        type: 'Royalties',
                        basisPoints: Number(percentAmount(recordStore.royalty).basisPoints),
                        creators: [
                            { address: publicKey(recordStore.creator), percentage: 100 },
                        ],
                        ruleSet: ruleSet('None'),
                        authority:{
                            type: "None"
                        }
                    },
                    {
                        type:"MasterEdition",
                        maxSupply:recordStore.maxSupply,
                        authority:{
                            type: "None"
                        }
                    }
                ]
            })

            //return tx.sendAndConfirm(umi);
            const sig = await tx.send(umi)
            const res = await confirmAndVerify(umi, sig, collectionKeyPair.publicKey)
            if(res?.err){
                throw Error(res.err)
            }
            return {signature:sig}
        },
        onSuccess(){
            queryClient.invalidateQueries({queryKey:['collection', collectionKeyPair.publicKey]})
        }
    })
}

