import React, { useContext } from 'react'
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { Context } from '../context/Context'
import { Link } from 'react-router-dom';


function CartComponent() {
    const {order} = useContext(Context)
  return (
    <React.Fragment>
        <Link to={"/order"}>
            <div className='relative '>
                <span className=' absolute -top-1 rounded-lg px-1 -right-1 bg-orange-400 text-xs'>{order?.length}</span>
                <PiShoppingCartSimpleFill className=' md:text-2xl text-xl'/>
            </div>
        </Link>
    </React.Fragment>
  )
}

export default CartComponent