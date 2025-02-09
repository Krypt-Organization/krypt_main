import { fetchAsset } from "@metaplex-foundation/mpl-core";
import { useQuery } from "@tanstack/react-query";
import useUmi from "./useUmi";
import { FetchCoreAssetParams, wrappedCoreFetch } from "./common";

type UseAssetParams = FetchCoreAssetParams


export default function useAsset({address, options}:UseAssetParams){
    const umi = useUmi();

    return useQuery({
        queryKey:['asset', address],
        queryFn: ()=>wrappedCoreFetch(fetchAsset)(umi, address, options),
        enabled:Boolean(address)
    })
}