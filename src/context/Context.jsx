/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import {createContext} from "react"


export const Context = createContext(null);



function ContextProvider({children}) {
    const [navigation, setNavigation] = useState(false);
    const [scrollTo,setScrollTo]=useState(false)
    const [order, setOrder] = useState([
      {
          "id": 2,
          "img": "/src/assets/nft_product2.jpg",
          "price": 100,
          "name": "NFT Product",
          "description": "This is a description of the NFT product",
          "category": "NFT pieces",
          "owner": "John Doe",
          "unique_id": "0x123456789011",
          "size": "2XL"
      },
      {
          "id": 2,
          "img": "/src/assets/nft_product2.jpg",
          "price": 100,
          "name": "NFT Product",
          "description": "This is a description of the NFT product",
          "category": "NFT pieces",
          "owner": "John Doe",
          "unique_id": "0x123456789011",
          "size": "2XL"
      },
      {
        "id": 2,
        "img": "/src/assets/nft_product2.jpg",
        "price": 100,
        "name": "NFT Product",
        "description": "This is a description of the NFT product",
        "category": "NFT pieces",
        "owner": "John Doe",
        "unique_id": "0x123456789011",
        "size": "2XL"
    },
    {
        "id": 2,
        "img": "/src/assets/nft_product2.jpg",
        "price": 100,
        "name": "NFT Product",
        "description": "This is a description of the NFT product",
        "category": "NFT pieces",
        "owner": "John Doe",
        "unique_id": "0x123456789011",
        "size": "2XL"
    }
  ]);
    const [checkOut,setCheckOut] = useState(0);
    
    const values = {checkOut,setCheckOut,navigation,setNavigation,order, setOrder,scrollTo,setScrollTo}
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