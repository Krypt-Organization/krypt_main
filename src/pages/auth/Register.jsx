import React from 'react'
import { Link } from 'react-router-dom'

function Register() {
  return (
    <React.Fragment>
        <div className=' px-3 py-3'>
            <form action="" className=' py-2 gap-5 flex flex-col'>
                <label className=' flex flex-col gap-1' htmlFor="">
                    <span className=' font-medium'>Username</span>
                    <input placeholder='Username' type="text" className='  bg-gray-100 p-1 rounded-md outline-none ring-1 ring-gray-300' />
                </label>
                <label className=' flex flex-col gap-1' htmlFor="">
                    <span className=' font-medium'>Email</span>
                    <input placeholder='Email' type={"email"} className='  bg-gray-100 p-1 rounded-md outline-none ring-1 ring-gray-300' />
                </label>
                <label className=' flex flex-col gap-1' htmlFor="">
                    <span className=' font-medium'>Password</span>
                    <input placeholder='Password' type="password" className='  bg-gray-100 p-1 rounded-md outline-none ring-1 ring-gray-300' />
                </label>
                <label className=' flex flex-col gap-1' htmlFor="">
                    <span className=' font-medium'>Confirm Password</span>
                    <input placeholder='Confirm Password' type="password" className='  bg-gray-100 p-1 rounded-md outline-none ring-1 ring-gray-300' />
                </label>
                <button className=' bg-black text-white py-1 rounded-md'>Sign Up</button>
            </form>
            <p className=' font-light text-sm'>Already have an Account?<Link to={"/auth/login"}> <span className=' font-semibold'>Login</span></Link></p>
        </div>
    </React.Fragment>
  )
}

export default Register