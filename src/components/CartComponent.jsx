import React, { useContext } from 'react'
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { Context } from '../context/Context'

function CartComponent() {
    const {order} = useContext(Context)
  return (
    <React.Fragment>
        <div className='relative'>
            <span className=' absolute -top-1 rounded-lg px-1 -right-1 bg-orange-300 text-xs'>{order?.length}</span>
            <PiShoppingCartSimpleFill/>
        </div>
    </React.Fragment>
  )
}

export default CartComponent