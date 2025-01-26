import React, { useMemo } from "react";
import Button from "./Button"
import useMintMultipleAsset, { MintMultipleAssetParams } from '../hooks/useMintMultipleAsset';
import { toBase58String } from "../utils";


type MintNftActionProps = {
    assets: MintMultipleAssetParams
    onSuccess?: (sig: string) => void,
    onError?: (err: Error) => void
}

export default function MintNftAction({
    assets,
    onError,
    onSuccess
}: MintNftActionProps) {
    const mutation = useMintMultipleAsset()

    const action = () => {
        mutation.mutateAsync(assets, {
            onSuccess: (data) => onSuccess?.(toBase58String(data.signature)),
            onError: (err) => onError?.(err)
        })
    }
    const isMinting = mutation.isPending;

    return <Button
        onClick={action}
        disabled={isMinting || assets.length == 0}>
        {isMinting ? "Minting" : "Check Out"}
    </Button>
}