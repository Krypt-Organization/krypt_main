import React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";



export default function SolanaWalletButton(){

    return (
        <WalletMultiButton 
            style={{
            backgroundColor:'#000',
            padding:'8px',
            borderRadius:'10px',
            height:"40px"
        }}/>
    )
}