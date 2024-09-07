import React from 'react'
import {IoMenu} from "react-icons/io5"
import logo from "../../assets/logo.svg"

function Header() {
  return (
    <React.Fragment>
      <main className=" bg-primary flex items-center justify-between px-5">
        <img src={logo} className=' w-14' alt="Logo" loading="lazy"/>
        <aside className=" text-2xl">
          <IoMenu/>
        </aside>
      </main>
    </React.Fragment>
  )
}

export default Header