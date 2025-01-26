import React from "react"
import { ReactNode } from "react"



type ButtonProps = Partial<{
    children:ReactNode,
    onClick?:()=>void,
    disabled?:boolean   
}>

export default function Button({children, ...props}:ButtonProps){
    return <button 
        className="bg-black rounded-md text-white font-medium uppercase p-3"
        {...props}
    >
        {children}
    </button>
}