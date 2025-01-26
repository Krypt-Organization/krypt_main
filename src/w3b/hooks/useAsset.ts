import { fetchAsset } from "@metaplex-foundation/mpl-core";
import { useQuery } from "@tanstack/react-query";
import useUmi from "./useUmi";
import { FetchCoreAssetParams } from "./common";

type UseAssetParams = FetchCoreAssetParams


export default function useAsset({address, options}:UseAssetParams){
    const umi = useUmi();

    return useQuery({
        queryKey:['asset', address],
        queryFn: ()=>fetchAsset(umi, address, options)
    })
}