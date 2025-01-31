import { createAppKit } from '@reown/appkit/react'
import { SolanaAdapter } from '@reown/appkit-adapter-solana/react'
import { /* solana, */ solanaDevnet } from '@reown/appkit/networks'
import { PhantomWalletAdapter, SolflareWalletAdapter, HuobiWalletAdapter, TrustWalletAdapter } from '@solana/wallet-adapter-wallets'

// 0. Set up Solana Adapter
const solanaWeb3JsAdapter = new SolanaAdapter({
    wallets: [
        new TrustWalletAdapter(),
        new HuobiWalletAdapter(),
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter(),   
    ]
})

// 1. Get projectId from https://cloud.reown.com
const projectId = (import.meta as any).env.VITE_WALLET_CONNECT_PROJECT_ID;

// 2. Create a metadata object - optional
const metadata = {
    name: 'krypt-main',
    description: 'Krypto Platform',
    url: window.location.origin??'https://krypt-main.vercel.app', // origin must match your domain & subdomain
    //TODO: change icons to meet the project logo
    icons: ['https://assets.reown.com/reown-profile-pic.png']
}

// 3. Create modal
// component to display wallet button = <appkit-button />
export default function setupWallet() {
    createAppKit({
        adapters: [solanaWeb3JsAdapter],
        //TODO: Update to feature to mainnet
        networks: [
            //solana,
            solanaDevnet
        ],
        defaultNetwork:solanaDevnet,
        metadata: metadata,
        projectId,
        features: {
            analytics: false,
            swaps: false,
            email: false,
            legalCheckbox: true,
            socials: []
        },
        themeVariables: {
            '--w3m-accent':'#10100e'
        }
    })
}
