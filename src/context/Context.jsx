/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import {createContext} from "react"


export const Context = createContext(null);



function ContextProvider({children}) {
    const [navigation, setNavigation] = useState(false);
    const [scrollTo,setScrollTo]=useState(false)
    const [order, setOrder] = useState([]);
    const [checkOut,setCheckOut] = useState(0);
    const [nftSignature,setNftSignature] = useState("");
    
    const values = {checkOut,setCheckOut,navigation,setNavigation,order, setOrder,scrollTo,setScrollTo,nftSignature,setNftSignature}
  return (
    <React.Fragment>
        <Context.Provider value={values}>
            <div>
                {children}
            </div>
        </Context.Provider>
    </React.Fragment>
  )
}

export default ContextProvider