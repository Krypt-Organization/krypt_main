import { fetchAssetsByOwner } from "@metaplex-foundation/mpl-core";
import { useQuery } from "@tanstack/react-query";
import useUmi from "./useUmi";
import { FetchCoreAssetParams } from "./common";

type UseCollectionAssets = FetchCoreAssetParams

export default function useOwnerAssets({address, options}:UseCollectionAssets){
    const umi = useUmi();

    return useQuery({
        queryKey:['owner-asset', address],
        queryFn: ()=>fetchAssetsByOwner(umi, address, options)
    })
}