import React from 'react'
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { Link } from 'react-router-dom';


function CartComponent() {
  return (
    <React.Fragment>
        <Link to={"/order"}>
            <div className='relative '>
                <PiShoppingCartSimpleFill className=' md:text-2xl text-xl'/>
            </div>
        </Link>
    </React.Fragment>
  )
}

export default CartComponent