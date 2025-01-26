import React from "react";
import useCreateCollection from "../hooks/useCreateCollection"
import Button from "./Button"
import { toBase58String } from "../utils";

type CreateCollectionActionProps = {
    onSuccess?: (sig: string) => void,
    onError?: (err: Error) => void
}

export default function CreateCollectionAction({
    onError,
    onSuccess
}: CreateCollectionActionProps){
    const mutation = useCreateCollection()
    
    const action = () => {
        mutation.mutateAsync(undefined, {
            onSuccess: (data) => onSuccess?.(toBase58String(data.signature)[0]),
            onError: (err) => onError?.(err)
        })
    }
    const isMinting = mutation.isPending;

    return <Button
        onClick={action}
        disabled={isMinting}>
        {isMinting ? "Creating Collection" : "Check Out"}
    </Button>
}
