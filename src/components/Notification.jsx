/* eslint-disable react/prop-types */
import React from 'react'

function Notification({signature}) {
  return (
    <React.Fragment>
        <div className='bg-black flex flex-col justify-center items-center bg-opacity-50  absolute h-full w-full'>
          <aside className='flex flex-col gap-2 items-center  py-5 bg-white rounded-md'>
            <p className=' text-center text-xl font-semibold '>Minting Process Complete</p>
            <p className=' text-center text-base font-medium'>Your NFT signature is</p> <br />
            <p className=' px-2 text-sm text-center'>{signature}</p><br />
            {/* <button className=' bg-black rounded-md shadow-md text-white font-semibold px-3 py-1 hover:-translate-x-0.5 hover:-translate-y-0.5 transition-transform'>Proceed to Checkout</button> */}
          </aside>
        </div>
    </React.Fragment>
  )
}

export default Notification