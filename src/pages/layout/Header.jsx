import React, { useContext } from 'react'
import {IoMenu} from "react-icons/io5"
import logo from "../../assets/logo.svg"
import NavMobile from './naviagtions/NavMobile'
import NavDesktop from './naviagtions/NavDesktop'
import { Context } from '../../context/Context'
import {FiLogIn} from "react-icons/fi"
import { Link } from 'react-router-dom'

function Header() {


  const {navigation, setNavigation} = useContext(Context)

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
          <section className=' items-center flex justify-between lg:pr-6 max-lg:hidden'>
            <NavDesktop/>
            <Link to={"/auth/login"} className=' cursor-default text-base gap-2 flex items-center'>
              <span className=' md:text-lg text-base'>Login</span>
              <FiLogIn/>
            </Link>
          </section>
          <section className=' lg:hidden' onClick={handleCloseNavigation}>
            <IoMenu/>
          </section>
        </aside>
      </main>
    </React.Fragment>
  )
}

export default Header