import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'

function Auth() {
    const auth_link = ["login","register"]
    const [currentAuthPage,setCurrentAuthPage] = useState(0);
    const location = useLocation();
    const pathArray = location.pathname.split("/")
    console.log(pathArray[pathArray.length-1])
    const navigate = useNavigate();

    useEffect(()=>{
        if(pathArray[pathArray.length-1]=="auth"){
            navigate("/auth/login");
        }
    },[])

  return (
    <React.Fragment>
        <div className=' py-5 px-2 bg-white m-10 rounded-md'>
            <header className=' flex items-center justify-center'>
                <div className=' px-2 py-1 rounded-md font-medium w-fit bg-gray-100 flex items-center justify-center gap-10'>
                    {
                        auth_link.map((link,index)=>{
                            return(
                                
                                <section onClick={()=> setCurrentAuthPage(index)} key={index} className={`${currentAuthPage===index&&"bg-white"} cursor-default capitalize px-1 rounded-md `} >
                                    <NavLink to={link}>{link}</NavLink>
                                </section>
                            )
                        })
                    }

                </div>
            </header>
            <main>
                <Outlet/>
            </main>
        </div>
    </React.Fragment>
  )
}

export default Auth