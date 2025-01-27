import React, { useContext, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Context } from '../../../context/Context';


const nav = [
  {link:"/",text:"Home"}, 
  {link:"/",text:"Treasure"}, 
  {link:"/products",text:"Products"},
  {link:"/contact",text:"Contact"},
  {link:"/order",text:"Cart"},
]

function NavDesktop() {
  const {setScrollTo} = useContext(Context);
  const currentPage = useLocation();
  
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
  return (
    <React.Fragment>
      <div className=' text-base lg:text-lg border-gray-700 border-[1px] rounded-full lg:px-3 lg:py-1  font-semibold flex gap-5  lg:gap-10'>
      {
            nav.map((item, index) => {
              if(item.text=="Treasure" && currentPage.pathname=="/"){
                return <button onClick={handleScrollTo} className="nav-link w-fit" key={index}>{item.text}</button>
              }else{
                return (<div key={index}>
                  <Link to={item.link} href="#" className="nav-link">{item.text}</Link>
                </div>)
              }
              })
          }
      </div>
    </React.Fragment>
  )
}

export default NavDesktop