import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <React.Fragment>
        <div className=' px-3 py-3'>
            <form action="" className=' py-2 gap-10 flex flex-col'>
                <label className=' flex flex-col gap-1' htmlFor="">
                    <span className=' font-medium'>Email</span>
                    <input placeholder='Email' type={"email"} className='  bg-gray-100 p-1 rounded-md outline-none ring-1 ring-gray-300' />
                </label>
                <label className=' flex flex-col gap-1' htmlFor="">
                    <span className=' font-medium'>Password</span>
                    <input placeholder='Password' type="password" className='  bg-gray-100 p-1 rounded-md outline-none ring-1 ring-gray-300' />
                </label>
                <button className=' bg-black text-white py-1 rounded-md'>Login</button>
            </form>
            <p className=' font-light text-sm'>Don&apos;t have an Account?<Link to={"/auth/register"}> <span className=' font-semibold'>Register</span></Link></p>
        </div>
    </React.Fragment>
  )
}

export default Login