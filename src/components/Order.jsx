import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/Context'
import emptyCart from "../assets/emptyCart.png";
import { useNavigate } from 'react-router-dom';
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useMemo } from 'react';
import { toast,ToastContainer } from 'react-toastify';
import MintNftAction from '@w3b/ui/MintNftAction';
import Notification from './Notification';

function Order() {
    const {checkOut,setCheckOut, order, setOrder } = useContext(Context);
    const navigate = useNavigate();
    const [notificationSig, setNotificationSig] = useState(null);

    const handleDeleteItem = (id)=>{
      const testFilter = order.filter((eachOne)=>{
        return eachOne.unique_id !== id;
      }) 
      setOrder(testFilter);
    }

  
    const handleCheckOut=  ()=>{
      navigate("/billing")
    }
    useEffect(()=>{
      const subTotalCalc = order.reduce((acc,eachProduct)=>{
        return acc + eachProduct.price;
      },0)
      setCheckOut(subTotalCalc)
      // This is with Dollar conversion rate to test the stripe api
      
    },[order]);

    // const handleCloseNotification = ()=>{

    // }

    useEffect(() => {
      const mergedOrders = [];
      order.forEach((eachOrder) => {
        const existingOrder = mergedOrders.find((item) => item.size === eachOrder.size && item.unique_id===eachOrder.unique_id);
        
        if (existingOrder) {
          existingOrder.price += eachOrder.price;
        } else {
          mergedOrders.push({ ...eachOrder });
        }
      });
    
      setOrder(mergedOrders);
      console.log(order);
    }, []);
    
    const assets = useMemo(()=>order.map(ast=>({color:ast.color, size:ast.size})),[order]);

  return (
    <React.Fragment>
      <ToastContainer/>
      {/* <ToastContainer
position="top-left"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Bounce}
/> */}
        <div className='  relative'>
          
            {notificationSig && <Notification signature={notificationSig} />}
            {/* <Notification/> */}
            {
            order.length===0?
            <div className="flex py-5   flex-col items-center  justify-center">
                <img src={emptyCart} className=" size-56" alt="Cart Is Empty"/>
                <p className=" text-white font-semibold text-lg">You Have No Orders</p>
                <button onClick={()=>{
                  navigate("/products")
                }} className=" border-[2px] border-white flex items-center font-semibold gap-2 py-1 px-3 my-2 rounded-md  text-white">Go Back <span><FaLongArrowAltLeft/></span></button>
            </div>
            :<div className=" my-2 flex flex-col gap-2">
              <button onClick={()=>{
                  navigate("/products")
                }} className=" flex items-center font-semibold gap-2 py-1 px-3 my-2 rounded-md w-fit text-white">
                <FaLongArrowAltLeft/>
              </button>

              <table className=" text-white max-md:hidden w-full bg-gray-600  rounded-md ">
                <thead className="">
                  <tr className=' '>
                    <th className=''>Product</th>
                    <th className=''>Name</th>
                    <th className=''>Size</th>
                    <th className=''>Price</th>
                  </tr>
                </thead>
                {
                  order.map((eachProduct)=>{
                    return(
                      <tbody key={eachProduct.unique_id} className=' space-x-7'>
                          <tr className=' text-white'>
                            <td className='flex flex-col items-center'><img src={eachProduct.img} className=' size-20 rounded-sm md:size-24 ' alt={eachProduct.name} /></td>
                            <td className='text-center font-semibold'>{eachProduct.name}</td>
                            <td className='text-center font-semibold'>{eachProduct.size}</td>
                            <td className='text-center font-semibold'>{eachProduct.price}</td>
                            {/* <td className='text-center font-semibold'>{eachProduct.quantity}</td> */}
                            <td className='text-center font-semibold'>{eachProduct.total}</td>
                            <td className=' cursor-default text-center h-fit '>
                              <span onClick={()=>{
                                handleDeleteItem(eachProduct.unique_id)
                                }} className=' bg-red-600 px-2 py-1 rounded-md'>Delete</span>
                            </td>
                          </tr>
                        </tbody>
                    )
                  })
                }
              </table>
                <br />
              {
                order.map((eachProduct)=>{
                  return(
                    <div key={eachProduct.unique_id}>
                      <section  className='md:hidden rounded-md bg-gray-600 px-2 py-5 flex items-center justify-center gap-10 sm:gap-20'>
                        <img src={eachProduct.img} alt={eachProduct.name} className=' rounded-md size-56 sm:size-64' />
                        <section className=' flex flex-col text-white'>
                          <p className='sm:text-xl font-semibold text-lg uppercase'>{eachProduct.name}</p>
                          <p className=' flex items-center gap-3 font-semibold text-xl'><span className=' sm:text-base text-sm capitalize font-semibold'>size:</span>{eachProduct.size}</p>
                          <p className=' flex items-center gap-1 font-semibold text-xl'><span className=' sm:text-base text-sm capitalize font-semibold'>price:</span>${eachProduct.price}</p>
                          {/* <p className=' flex items-center gap-1 font-semibold text-xl'><span className=' sm:text-base text-sm capitalize font-semibold'>Qty:</span>{eachProduct.quantity}</p> */}
                          <p>#{eachProduct.id}</p>
                          {/* <p className=' flex items-center gap-1 font-semibold text-xl'><span className=' sm:text-base text-sm capitalize font-semibold'>total:</span>{eachProduct.price*eachProduct.quantity}</p> */}
                          <p>Qty: {eachProduct.price/100}</p>
                          <button onClick={()=>{
                            handleDeleteItem(eachProduct.unique_id)
                            }} className="bg-red-600 rounded-md my-2 w-fit px-2 ">Remove</button>
                        </section>
                      </section>
                      
                    </div>
                  )
                })
              }
            </div>
              }

              <div className={`${order.length==0 && "hidden"} md:w-1/2  md:px-5 bg-gray-200 mx-5 py-2 px-2 rounded-md `}>
                <p className=" underline text-center font-semibold text-lg ">Order Details</p>
                <section className=" flex flex-col gap-3">
                    <aside className=' flex justify-between font-medium '>
                      <p>Item(s)</p>
                      <span>{order.length}</span>
                    </aside>
                    {/* <aside className=' flex justify-between font-medium '>
                      <p>Estimated Tax </p>
                      <span>${checkOut*0.01}</span>
                    </aside> */}
                    <aside className=' border-t-[1px] py-2  border-black flex justify-between font-medium '>
                      <p>Total </p>
                      <span>${checkOut}</span>
                    </aside>
                    {/* <aside className=' border-t-[1px]  border-black flex justify-between font-medium '>
                      <p>Sub-Total </p>
                      <span>${checkOut*0.01+checkOut}</span>
                    </aside> */}
                    {/* <button 
                    onClick={handleCheckOut} 
                    className=" bg-black rounded-md text-white font-medium uppercase py-2">
                    Check Out
                    </button> */}

                    <MintNftAction assets={assets}
                      onSuccess={(sig)=>{
                        if (sig) {
                          setNotificationSig(sig)
                          toast.success('NFT Minted Successfully!', { position: "top-left", theme: "light" });
                          setTimeout(() => {
                           handleCheckOut();
                          }, 4000);
                        }
                        // alert(`Checkout complete ${sig}`);
                        // toast.success('🦄 Wow so easy!', {
                        //   position: "top-left",
                        //   autoClose: 5000,
                        //   hideProgressBar: false,
                        //   closeOnClick: false,
                        //   pauseOnHover: true,
                        //   draggable: true,
                        //   progress: undefined,
                        //   theme: "light",
                        //   transition: Bounce,
                        // });
                      }}
                      onError={(err)=>{
                        alert(`Error Occured: ${err.message}`)
                        toast.warn(`Error Occured: ${err.message}`, {
                          position: "top-left",
                          autoClose: 5000,
                          theme: "light",
                        });
                      }}
                    />
                </section>
              </div>
                        <br />
        </div>
    </React.Fragment>
  )
}

export default Order