import React from 'react'
import logo from "../../assets/logo.svg"
import { FaTwitter, FaInstagram} from "react-icons/fa"
import {year} from "../../extras/getYear"
import { Link } from 'react-router-dom'

const footer_links = [
  {link:"/",text:"Home"},  
  {link:"/products",text:"Products"},
  {link:"/contact",text:"Contact"}
]
function Footer() {
  

  return (
    <React.Fragment>
      <div className=' bg-primary px-4 py-5 flex flex-col gap-5'>
        <aside className=' flex flex-col -space-y-2'>
          <img src={logo} loading="lazy" alt="Logo" className=' sm:w-20 md:w-24 w-14'/>
          <span className=' font-medium text-[12px] md:text-base text-gray-800'>Powered By Solana</span>
        </aside>
        <section className=' flex flex-col gap-8 pb-5'>
          <ul className='grid  sm:font-semibold sm:text-lg md:text-2xl md:uppercase gap-1 capitalize md:flex-row justify-between '>
            {footer_links.map((link, index) => (
              <li key={index+"##$$**"}>
                <Link to={link.link} className='text-black text-sm cursor-pointer hover:text-gray-700'>
                  {link.text}
                </Link>
              </li>
              ))}
          </ul>
          <div className=' flex justify-between'>
            <section className=' text-xl md:text-2xl flex gap-4'>
              <a href="https://x.com/kryptphygital?s=21&t=J7h4LCBhzRDgrXkFeY1oVg">
              <FaTwitter />
              </a>
              <a href="https://www.instagram.com/kryptstore?igsh=bnFwdTRzeWp0Z3cw&utm_source=qr">
                <FaInstagram />
              </a>
            </section>
            <span className=' font-semibold text-sm'>&copy;KRYPT {year.getFullYear()}</span>
          </div>
        </section>
      </div>
    </React.Fragment>
  )
}

export default Footer

