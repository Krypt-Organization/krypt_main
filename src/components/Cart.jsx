import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/Context'
import emptyCart from "../assets/emptyCart.png"


function Cart() {
    const { cart, setCart } = useContext(Context)
    const [currentCart, setCurrentCart] = useState([]);

    useEffect(()=>{
    },[])
  return (
    <React.Fragment>
        <div>
            {
            cart.length==0?
            <div className="flex py-5   flex-col items-center  justify-center">
                <img src={emptyCart} className=" size-56" alt="Cart Is Empty"/>
                <p className=" text-white font-semibold text-lg">Your Cart is Empty</p>
            </div>
            :"ppp"}
        </div>
    </React.Fragment>
  )
}

export default Cart