import React, { useContext } from 'react'
import {IoMenu} from "react-icons/io5"
import logo from "../../assets/logo.svg"
import NavMobile from './naviagtions/NavMobile'
import { Context } from '../../context/Context'
import { Link } from 'react-router-dom'

function Header() {


  const {navigation, setNavigation} = useContext(Context)

  const handleCloseNavigation =()=>{
    setNavigation(!navigation)
  }

  return (
    <React.Fragment>
      <section>
        <NavMobile/>
      </section>
      <main className=" bg-primary flex py-2 items-center justify-between px-5">
        <Link to={"/"}>
          <img src={logo} className='  w-14' alt="Logo" loading="lazy"/>
        </Link>
        <aside onClick={handleCloseNavigation} className=" z-10 text-2xl">
          <IoMenu/>
        </aside>
      </main>
    </React.Fragment>
  )
}

export default Header