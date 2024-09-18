import React from 'react'
import { Link } from 'react-router-dom'


const nav = [
  {link:"/",text:"Home"}, 
  {link:"/",text:"Treasure Hunt"}, 
  {link:"/products",text:"Products"},
  {link:"/contact",text:"Contact"}
]

function NavDesktop() {
  return (
    <React.Fragment>
      <div className=' text-base uppercase font-semibold flex gap-5 '>
        {
              nav.map((item, index) => {
                return (
                  <div key={index}>
                    <Link to={item.link} href="#" className="nav-link">{item.text}</Link>
                  </div>
                  )})
            }
      </div>
    </React.Fragment>
  )
}

export default NavDesktop