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
          </aside>
        </div>
    </React.Fragment>
  )
}

export default Notification