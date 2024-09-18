/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import {createContext} from "react"


export const Context = createContext(null);



function ContextProvider({children}) {
    const [navigation, setNavigation] = useState(false)
    const [cart, setCart] = useState([])
    
    
    const values = {navigation,setNavigation,cart, setCart}
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