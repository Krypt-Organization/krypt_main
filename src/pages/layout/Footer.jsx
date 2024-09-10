import React from 'react'
import logo from "../../assets/logo.svg"
import {FaFacebook, FaTwitter, FaInstagram} from "react-icons/fa"
import {year} from "../../extras/getYear"

const footer_links = ["home", "about" , "contact", "product", "roadmap", "terms_of_service"]
function Footer() {
  

  return (
    <React.Fragment>
      <div className=' bg-primary px-4 py-5 flex flex-col gap-5'>
        <aside className=' flex flex-col -space-y-2'>
          <img src={logo} alt="Logo" loading='lazy' className=' w-14'/>
          <span className=' font-medium text-[12px] text-gray-800'>Powered By Solana</span>
        </aside>
        <section className=' flex flex-col gap-8 pb-5'>
          <ul className='grid grid-cols-2 gap-1 capitalize md:flex-row justify-between '>
            {footer_links.map((link, index) => (
              <li key={index+"##$$**"}>
                <a className='text-black text-sm hover:text-gray-700'>{link.includes("_")?link.split("_").join(" "):link}</a>
              </li>
              ))}
          </ul>
          <div className=' flex justify-between'>
            <section className=' text-xl flex gap-4'>
              <FaFacebook/>
              <FaTwitter />
              <FaInstagram />
            </section>
            <span className=' font-semibold text-sm'>&copy;KRYPT {year.getFullYear()}</span>
          </div>
        </section>
      </div>
    </React.Fragment>
  )
}

export default Footer

