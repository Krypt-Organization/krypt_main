import React, { useContext } from 'react'
import {IoMenu} from "react-icons/io5"
import logo from "../../assets/logo.svg"
import NavMobile from './naviagtions/NavMobile'
import NavDesktop from './naviagtions/NavDesktop'
import { Context } from '../../context/Context'
import {FiLogIn} from "react-icons/fi"
import { Link } from 'react-router-dom'
import { FaRegUserCircle } from 'react-icons/fa'

function Header() {
  const {navigation, setNavigation} = useContext(Context)
  const user = localStorage.getItem("user");
  const handleCloseNavigation =()=>{
    setNavigation(!navigation)
  }

  return (
    <React.Fragment>
      <section className=' lg:hidden'>
        <NavMobile/>
      </section>
      <main className=" bg-primary flex lg:grid lg:grid-cols-[1.5fr,3fr] items-center justify-between px-5">
        <Link to={"/"}>
          <img src={logo} className=' sm:w-20 md:w-28  w-14' alt="Logo" loading="lazy"/>
        </Link>
        <aside className=" items-center z-10 lg:text-3xl text-2xl">
          <section className=' items-center flex gap-10 justify-between  max-lg:hidden'>
            <NavDesktop/>
            <div className='flex gap-10 items-center'>
              {user?
                <Link to={"/user"}>
                  <div className='  border-gray-800 md:text-xl md:font-semibold text-base gap-1 flex items-center'>
                    <FaRegUserCircle/>
                    <span>Account</span>
                  </div>
                </Link>:
                <Link to={"/auth/login"} className=' cursor-default text-base gap-1 flex items-center'>
                  <FiLogIn/>
                  <span className=' md:text-lg font-semibold text-base'>Login</span>
                </Link>
              }
            </div>
            <appkit-button />
          </section>
          <section className=' flex gap-4 items-center lg:hidden'>
            <button  onClick={handleCloseNavigation}>
              <IoMenu/>
            </button>
            <appkit-button />
          </section>
        </aside>
      </main>
    </React.Fragment>
  )
}

export default Header