import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import img from "../../assets/contact_img.jpg"


function Auth() {
    const auth_link = ["login","register"]
    const [currentAuthPage,setCurrentAuthPage] = useState(0);
    const location = useLocation();
    const pathArray = location.pathname.split("/")
    const currentPage = pathArray[pathArray.length-1]
    const navigate = useNavigate();

    useEffect(()=>{
        // console.log(pathArray)
        // console.log(currentPage,auth_link[currentAuthPage])
        // console.log(currentAuthPage)
        if(pathArray[pathArray.length-1]=="auth" || pathArray[pathArray.length-1]==""){
            navigate("/auth/login");
        }
    },[]);

  return (
    <React.Fragment>
        <div className='  rounded-md'>
            <div className=' md:grid md:grid-cols-2 '>
                <div className=' max-md:hidden relative'>
                    <img src={img} alt="Image" className=' h-full md:object-cover lg:object-center' />
                <div className='top-0 w-full h-full bg-opacity-80 bg-black absolute text-transparent'>
                    .
                </div>
            </div>
            <div className='  relative bg-no-repeat bg-cover  max-md:bg-[url(assets/contact_img.jpg)] '>
                <div className=" py-10 px-10 text-white md:bg-gray-900 bg-black bg-opacity-85">
                   <header className=' flex items-center justify-center'>
                        {/* <div className=' text-black px-2 py-1 rounded-md font-medium w-fit bg-gray-100 flex items-center justify-center gap-16'> */}
                            {/* {
                                auth_link.map((eachLink,index)=>{
                                    return(
                                        <section onClick={()=>{
                                            setCurrentAuthPage(index);
                                    }} className={` ${index==currentAuthPage && currentPage==currentPage?"bg-red-900":"bg-red-100"} capitalize`}  key={index}>
                                        <NavLink to={eachLink}>{eachLink}</NavLink>
                                        </section>
                                    )
                                })
                            } */}
                        {/* </div> */}
                    </header> 
                    <Outlet/>
                </div>
            </div>
        </div>
            
        </div>
    </React.Fragment>
  )
}

export default Auth