import { fetchAssetsByOwner } from "@metaplex-foundation/mpl-core";
import { useQuery } from "@tanstack/react-query";
import useUmi from "./useUmi";
import { FetchCoreAssetParams } from "./common";
import { defaultPublicKey } from "@metaplex-foundation/umi";
import { collectionPublicKey } from "../data/secret";

type UseCollectionAssets = FetchCoreAssetParams

const zeroAddr = defaultPublicKey()
export default function useOwnerAssets({address, options}:Partial<UseCollectionAssets>={}){
    const umi = useUmi();
    const userAddress = address ?? umi.identity.publicKey;

    return useQuery({
        queryKey:['owner-asset', userAddress],
        queryFn: async ()=>{
            const result = await fetchAssetsByOwner(umi, userAddress, options)
            return result.filter(asset=>asset.updateAuthority.address === collectionPublicKey)
        },
        enabled: userAddress !== zeroAddr,
    })
}