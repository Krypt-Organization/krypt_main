'use client'
import { useMutation } from "@tanstack/react-query";
import useUmi from "./useUmi";
import { PublicKey, SolAmount } from "@metaplex-foundation/umi";


type AirdropParams = {
    address:PublicKey,
    amount: SolAmount,
}

export default function useAirdrop(){
    const umi = useUmi();
    return useMutation({
        mutationFn:({address, amount}:AirdropParams)=>{
            return umi.rpc.airdrop(address, amount)
        }
    })
}