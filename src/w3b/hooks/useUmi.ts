import { useMemo } from "react";
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { mplToolbox } from '@metaplex-foundation/mpl-toolbox'
import { mplCore } from '@metaplex-foundation/mpl-core'
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters'
import { createNoopSigner, defaultPublicKey, signerIdentity, } from "@metaplex-foundation/umi";


const DEFAULT_URL = 'https://api.mainnet-beta.solana.com'
const zeroSigner = createNoopSigner(defaultPublicKey())

export default function useUmi(){
    const wallet = useWallet();
    const {connection} = useConnection();
    return useMemo(()=>{
        const umi = createUmi(connection ?? DEFAULT_URL)
        //createUmi(wallet.wallet?.adapter?.url ?? DEFAULT_URL)
            .use(mplToolbox())
            .use(mplCore())
        if(wallet.connected){
            umi.use(walletAdapterIdentity(wallet))
        }else{
            umi.use(signerIdentity(zeroSigner))
        }
        return umi
    },[wallet, connection]);
}