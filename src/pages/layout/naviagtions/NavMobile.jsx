import React, { useContext, useEffect } from 'react'
import { FaTwitter, FaInstagram, FaRegUserCircle} from "react-icons/fa"
import {year} from "../../../extras/getYear"
import {motion} from "framer-motion"
import {Context} from "../../../context/Context"
import { Link, useLocation } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'


const nav = [
  {link:"/",text:"Home"}, 
  {link:"/",text:"Treasure Hunt"}, 
  {link:"/products",text:"Products"},
  {link:"/contact",text:"Contact"},
  {link:"/order",text:"Cart"}
]


const blur_variant = {
  initial:{
    opacity: 0,
  },
  animate:{
    opacity: 1,
    transition:{
      duration: 0.5,
    }
  },
  exit:{
    opacity: 0,
    transition:{
      duration: 0.5,
    }
  }
}

const nav_variant = {
  initial:{
    y:1000,
  },
  animate:{
    y:0,
    transition:{
      duration: 0.2
      }
  },
  exit:{
    y:1000,
    transition:{
      duration:0.2
    }
  }
}



function NavMobile() {
  const currentPage = useLocation()
  const {setScrollTo} = useContext(Context);
  const user = localStorage.getItem("user");
  
  useEffect(()=>{
    const timer = setTimeout(()=>{
      setScrollTo(false);
    },1000)

    return (()=>{
      clearTimeout(timer);
    })
  })

  const handleScrollTo = ()=>{
    if(currentPage.pathname=="/"){
      setScrollTo(true);
    }
  }
  
  const {navigation, setNavigation} = useContext(Context)

  const handleCloseNavigation =()=>{
    setNavigation(false)
  }

  return (
    <React.Fragment>
      <motion.div
        variants={blur_variant}
        initial="initial" animate={navigation?"animate":"exit"}
      className={` flex flex-col overflow-hidden   bg-[#050505d9] fixed w-full h-screen ${navigation?"z-10":"-z-10"}`} onClick={handleCloseNavigation}>
        <section className='  bottom-0 absolute w-full pt-5 pb-10 px-5 rounded-xl flex flex-col gap-3 font-semibold  bg-white'> 
          {
            nav.map((item, index) => {
              if(item.text=="Treasure Hunt" && currentPage.pathname=="/"){
                return <button id='name' onClick={handleScrollTo} className="nav-link w-fit" key={index}>{item.text}</button>
              }else{
                return (<div key={index}>
                  <Link to={item.link} href="#" className="nav-link">{item.text}</Link>
                </div>)
              }
              })
          }
          {
            user?
            <Link to={"/user"}>
              <div className=' text-base gap-1 flex items-center'>
                <FaRegUserCircle/>
                <span>Account</span>
              </div>
            </Link>
            :
            <Link to={"/auth/login"}>
              <div className=' bg-black justify-center rounded-xl text-white py-1 text-base gap-1 flex items-center'>
                <FiLogIn/>
                <span className=' text-base'>Login</span>
              </div>
            </Link>
          }
          <aside>
            <motion.div
              variants={nav_variant}
              initial="initial" animate={navigation?"animate":"exit"}
            className=' border-t-[1px] pt-4 flex justify-between'>
              <section className=' text-xl flex gap-4'>
                <a href="https://x.com/kryptphygital?s=21&t=J7h4LCBhzRDgrXkFeY1oVg">
                  <FaTwitter />
                </a>
                <a href="https://www.instagram.com/kryptstore?igsh=bnFwdTRzeWp0Z3cw&utm_source=qr">
                  <FaInstagram />
                </a>
              </section>
              <span className=' font-semibold text-sm'>&copy;KRYPT {year.getFullYear()}</span>
            </motion.div>
          </aside>
        </section>
      </motion.div>
    </React.Fragment>
  )
}

export default NavMobile