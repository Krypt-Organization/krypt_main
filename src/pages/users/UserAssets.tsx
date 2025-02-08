
import React from "react";
import { useMemo } from "react";
import { AssetV1 } from "@metaplex-foundation/mpl-core";
import BounceLoader from "react-spinners/BounceLoader";
import useUri from "@w3b/hooks/useUri";
import useOwnerAssets from "@w3b/hooks/useOwnerAssets"
import CreateCollectionAction from "@w3b/ui/CreateCollectionAction";
import { toast } from "react-toastify";

export default function UserAssets() {
    const query = useOwnerAssets();
    const data = useMemo(() => query.data?.map?.(toAsset), [query.data])
    const isLoading = query.isPending;

    return (
        <>
            <CreateCollectionAction
                onSuccess={(sig) => {
                    toast.success('NFT Collection Created!', { position: "top-left", theme: "light" });
                }}
                onError={(err) => {
                    toast.warn(`Error Occured: ${err.message}`, {
                        position: "top-left",
                        autoClose: 5000,
                        theme: "light",
                    });
                }}
            />
            <h2 className="text-2xl font-semibold mb-4">Your Recent NFT Purchases</h2>
            <div className="grid text-black grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? <BounceLoader /> :

                    data?.length > 0 ?
                        data.map(d =>
                            <AssetComponent
                                price="100"
                                key={d.address}
                                {...d}
                            />
                        ):
                        <div>
                            <p className='bg-white py-3 rounded-lg px-5 text-lg'>No Previous Products purchased😢</p>
                        </div>
                }
            </div>
        </>
    )
}

const toAsset = (asset: AssetV1) => ({
    address: asset.publicKey,
    name: asset.name,
    uri: asset.uri,
    attributes: asset.attributes?.attributeList?.reduce?.((db, attr) => ({ ...db, [attr.key]: attr.value }), {}),
    edition: asset.edition?.number,
})

type AssetComponentProps = {
    address: string,
    name: string,
    uri: string,
    attributes: Record<string, string>
    edition: number,
    price: string,
    description: string,
}


type Data = {
    image: string,
    name: string,
    symbol?: string
}

const AssetComponent = (props: AssetComponentProps) => {
    const { data } = useUri<Data>(props.uri)

    return (
        <div key={props.address} className="bg-white shadow rounded-lg overflow-hidden">
            {
                data?.image ?
                    <img src={data?.image} alt={props.name} className="w-full h-48 object-cover" /> :
                    <div />
            }
            <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{props.name}</h3>
                <p className="font-semibold">Unique ID: {props.edition}</p>
                <p className="font-semibold">${props.price}</p>
                <p className="font-semibold">Quantity: 1</p>
                <p className="text-gray-600 text-sm mb-2">{props.description}</p>
                <p className="text-sm text-gray-500">ID: {props.address.substring(0, 7)}</p>
            </div>
        </div>
    )
}