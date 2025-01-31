import { fetchAssetsByCollection } from "@metaplex-foundation/mpl-core";
import { useQuery } from "@tanstack/react-query";
import useUmi from "./useUmi";
import { FetchCoreAssetParams } from "./common";
import { collectionPublicKey } from "../data/secret";



type UseCollectionAssets = Partial<FetchCoreAssetParams>

export default function useCollectionAssets({address=collectionPublicKey, options}:UseCollectionAssets){
    const umi = useUmi();

    return useQuery({
        queryKey:['collection-assets', address],
        queryFn: ()=>fetchAssetsByCollection(umi, address, options),
        enabled:Boolean(address)
    })
}