
import React, { FC, ReactNode, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { 
    //UnsafeBurnerWalletAdapter, 
    WalletConnectWalletAdapter, 
    PhantomWalletAdapter,
    TrustWalletAdapter,
    CoinbaseWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';

const PROJECT_ID = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;

const SolanaProvider = ({children}:{children:ReactNode}) => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [
            /**
             * Wallets that implement either of these standards will be available automatically.
             *
             *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
             *     (https://github.com/solana-mobile/mobile-wallet-adapter)
             *   - Solana Wallet Standard
             *     (https://github.com/anza-xyz/wallet-standard)
             *
             * If you wish to support a wallet that supports neither of those standards,
             * instantiate its legacy wallet adapter here. Common legacy adapters can be found
             * in the npm package `@solana/wallet-adapter-wallets`.
             */
            //new UnsafeBurnerWalletAdapter(),
            //TODO: get projectId from https://cloud.reown.com/sign-in 
            ...(Boolean(PROJECT_ID)?
                [new WalletConnectWalletAdapter({
                    network,
                    options: {
                        relayUrl: 'wss://relay.walletconnect.com',
                        // example WC app project ID
                        projectId: PROJECT_ID,
                        metadata: {
                            name: 'Krypto App',
                            description: 'NFT Wallt',
                            url: window.location.origin,
                            icons: [],
                        },
                    },
                })]:[]),
            new PhantomWalletAdapter(),
            new TrustWalletAdapter(),
            new CoinbaseWalletAdapter(),
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    { children/* Your app's components go here, nested within the context providers. */ }
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};



export default SolanaProvider;