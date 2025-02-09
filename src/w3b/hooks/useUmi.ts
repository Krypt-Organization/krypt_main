import { useMemo } from "react";
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { mplToolbox } from '@metaplex-foundation/mpl-toolbox'
import { mplCore } from '@metaplex-foundation/mpl-core'
import { WalletAdapter, walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters'
import { createNoopSigner, defaultPublicKey, signerIdentity, } from "@metaplex-foundation/umi";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { Provider } from "@reown/appkit-adapter-solana/react";
import { Connection } from "@solana/web3.js";


const zeroSigner = createNoopSigner(defaultPublicKey())

const publicNodeMainnetHttpRpc = import.meta.env.VITE_SOLANA_HTTP_RPC;
//"https://solana-rpc.publicnode.com";
const publicNodeMainnetWssRpc = import.meta.env.VITE_SOLANA_WSS_RPC;
//"wss://solana-rpc.publicnode.com"

export default function useUmi(){
    const { isConnected } = useAppKitAccount();
    const { walletProvider } = useAppKitProvider<Provider>('solana')
    //NOTE: Did not use useAppKitConnection from appkit due to walletconnect wss network failure
    //TODO: change for mainnet mainnet
    const connection = new Connection(
        publicNodeMainnetHttpRpc,
        {
            wsEndpoint:publicNodeMainnetWssRpc,
            commitment: 'confirmed'
        }
    )
    
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