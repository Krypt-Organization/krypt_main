import React from "react";
import useCreateCollection from "../hooks/useCreateCollection"
import Button from "./Button"
import { toBase58String } from "../utils";
import useCollection from "../hooks/useCollection";

type CreateCollectionActionProps = {
    onSuccess?: (sig: string) => void,
    onError?: (err: Error) => void
}

export default function CreateCollectionAction({
    onError,
    onSuccess
}: CreateCollectionActionProps){
    const mutation = useCreateCollection()
    const query = useCollection()
    const collectionCreated = Boolean(query.data)

    const action = () => {
        mutation.mutateAsync(undefined, {
            onSuccess: (data) => onSuccess?.(toBase58String(data.signature)[0]),
            onError: (err) => onError?.(err)
        })
    }
    const isMinting = mutation.isPending;
    console.log({isMinting, collectionCreated})
    return <Button
        onClick={action}
        disabled={isMinting||collectionCreated}>
        { collectionCreated?"Collection Created":
            isMinting ? "Creating Collection" : "Register Collection"}
    </Button>
}
