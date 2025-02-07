import { useMemo } from "react";
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { mplToolbox } from '@metaplex-foundation/mpl-toolbox'
import { mplCore } from '@metaplex-foundation/mpl-core'
import { WalletAdapter, walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters'
import { createNoopSigner, defaultPublicKey, signerIdentity, } from "@metaplex-foundation/umi";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { Provider, /* useAppKitConnection */ } from "@reown/appkit-adapter-solana/react";
import { clusterApiUrl, /* Connection */ } from "@solana/web3.js";


const zeroSigner = createNoopSigner(defaultPublicKey())

export default function useUmi(){
    const { isConnected } = useAppKitAccount();
    const { walletProvider } = useAppKitProvider<Provider>('solana')
    //NOTE: Did not use connection from appkit due to walletconnect wss network failure
    //const { connection } = useAppKitConnection() 
    
    //TODO: chnage for mainnet mainnet
    const connection = clusterApiUrl('mainnet-beta')

    return useMemo(()=>{
        
        const umi = createUmi(connection)
            .use(mplToolbox())
            .use(mplCore())
        if(isConnected){
            umi.use(walletAdapterIdentity(walletProvider as WalletAdapter))
        }else{
            umi.use(signerIdentity(zeroSigner))
        }
        return umi
    },[isConnected, walletProvider, connection]);
}