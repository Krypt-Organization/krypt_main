import React, { useContext } from 'react'
import {IoMenu} from "react-icons/io5"
import { PiShoppingCartSimpleBold} from "react-icons/pi"
import logo from "../../assets/logo.svg"
import NavMobile from './naviagtions/NavMobile'
import NavDesktop from './naviagtions/NavDesktop'
import { Context } from '../../context/Context'
import { Link } from 'react-router-dom'

function Header() {


  const {navigation, setNavigation,cart} = useContext(Context)

  const handleCloseNavigation =()=>{
    setNavigation(!navigation)
  }

  return (
    <React.Fragment>
      <section className=' lg:hidden'>
        <NavMobile/>
      </section>
      <main className=" bg-primary flex py-2 items-center justify-between px-5">
        <Link to={"/"}>
          <img src={logo} className=' sm:w-20 md:w-28  w-14' alt="Logo" loading="lazy"/>
        </Link>
        <aside className=" gap-2 flex items-center z-10 lg:text-3xl text-2xl">
          <section className=' lg:pr-6 max-lg:hidden'>
            <NavDesktop/>
          </section>
          <section className=' lg:hidden' onClick={handleCloseNavigation}>
            <IoMenu/>
          </section>
        </aside>
      </main>
    </React.Fragment>
  )
}

          // <section className=' relative py-1 px-2'>
          //   {!navigation && <span className=' z-10 absolute right-0 top-0  bg-red-400 px-1 rounded-full text-white text-xs'>{cart.length}</span>}
          //   {
          //     navigation?<PiShoppingCartSimpleBold className=' z-10'/>:
          //     <NavLink to={"/cart"}>
          //       <PiShoppingCartSimpleBold className=' z-10'/>
          //     </NavLink>
          //   }
          // </section>
export default Header