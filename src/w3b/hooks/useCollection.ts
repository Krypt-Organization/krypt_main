import { fetchCollection } from "@metaplex-foundation/mpl-core";
import { useQuery } from "@tanstack/react-query";
import useUmi from "./useUmi";
import { FetchCoreCollectionParams, wrappedCoreFetch } from "./common";
import { collectionPublicKey } from "../data/secret";


type UseCollectionParams = Partial<FetchCoreCollectionParams>


export default function useCollection({address=collectionPublicKey, options}:UseCollectionParams={}){
    const umi = useUmi();

    return useQuery({
        queryKey:['collection', address],
        queryFn: ()=>wrappedCoreFetch(fetchCollection)(umi, address, options),
        enabled:Boolean(address)
    })
}