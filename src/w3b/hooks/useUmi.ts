import { useMemo } from "react";
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { mplToolbox } from '@metaplex-foundation/mpl-toolbox'
import { mplCore } from '@metaplex-foundation/mpl-core'
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters'


const DEFAULT_URL = 'https://api.mainnet-beta.solana.com'

export default function useUmi(){
    const wallet = useWallet();
    const {connection} = useConnection();
    return useMemo(()=>
        createUmi(connection ?? DEFAULT_URL)
        //createUmi(wallet.wallet?.adapter?.url ?? DEFAULT_URL)
        .use(mplToolbox())
        .use(mplCore())
        .use(walletAdapterIdentity(wallet))
    ,[wallet, connection]);
}