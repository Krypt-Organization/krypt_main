import React, { useContext, useEffect, useRef, useState } from 'react'
import banner from "../assets/contact_img.jpg";
import { Context } from '../context/Context';
import { updatePreviousPurchases } from '../extras/firebase';
import { useNavigate } from 'react-router-dom';
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from 'react-toastify';

function Billing() {
    
    const [formData,setFormData] = useState({
        fullName:"",
        email:"",
        phoneNumber:"",
        address:"",
        state:"",
        city:""
    });
    const form = useRef();
    const navigate = useNavigate();
    const user = localStorage.getItem("user");
    const [emptyField,setEmptyField] = useState(false);
    const {order,setOrder} = useContext(Context)
    const handleOnChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const { fullName, email, phoneNumber, address, state, city } = formData;
    
        // Ensure all required fields are filled
        if (!fullName || !email || !phoneNumber || !address || !state || !city) {
            setEmptyField(true);
            return;
        }
        setEmptyField(false); // Reset if all fields are filled
    
        try {
            const data = ({...order,...formData})
            const jsonUser = user ? JSON.parse(user) : null;
            
            if (jsonUser) {
                try {
                    await updatePreviousPurchases(jsonUser.uid, order);
                    console.log("Updated user purchases:", jsonUser);
                } catch (error) {
                    console.error("Error parsing user data:", error);
                }
            }

            const emailData = {
                fullName: data.fullName,
                email: data.email,
                phoneNumber: data.phoneNumber,
                address: data.address,
                state: data.state,
                city: data.city,
                orders: Object.values(order)
                    .map((item, index) =>
                        `Item ${index + 1}: ${item.name}, Color: ${item.color}, Price: $${item.price}, Size: ${item.size}`
                    )
                    .join("\n"),
            };   
            console.log(emailData);
            emailjs.send('service_ye6lwwa', 'template_edfxuqo', emailData, {
                publicKey: 'mH_bztTitjnB4WMzD',}).then(() => {
                    console.log('SUCCESS!');
                    toast.success('Order Placed Successfully!', { position: "top-left", theme: "light" });
                },(error) => {
                    console.log('FAILED...', error.text);
                },
            );
            
            setFormData({
                fullName: "",
                email: "",
                phoneNumber: "",
                address: "",
                state: "",
                city: "",
            });
    
            setOrder([]);
            setTimeout(() => {
                navigate("/");
            }, 5000);
            
        } catch (error) {
            console.error("Unexpected error:", error);
            alert("An unexpected error occurred.");
        }
    };
    
useEffect(()=>{
    const timer = setTimeout(()=>{
        setEmptyField(false);
    },3000);
    return ()=>clearTimeout(timer);
},[emptyField]);
return (
    <React.Fragment>
        <ToastContainer/>
        <div className=' md:grid md:grid-cols-2 '>
            <div className=' max-md:hidden relative'>
                <img src={banner} alt="" className=' h-full md:object-cover' />
                <div className='top-0 w-full h-full bg-opacity-80 bg-black absolute text-transparent'>
                        .
                    </div>
            </div>
            <div className=' flex flex-col gap-5 bg-gray-200 px-4 rounded-md py-8 mx-5 my-4'>
            <header className=' text-center font-semibold text-xl'>
                <h1>Billing Information</h1>
                <span className=' font-normal text-xs'>Please fill in your details to complete your order </span>
            </header>
            <form action="" ref={form} onSubmit={handleSubmit} className=' flex flex-col gap-3'>
                <label htmlFor="" className=' flex flex-col gap-1'>
                    <span className=' font-semibold uppercase'>Full Name</span>
                    <input onChange={handleOnChange} name="fullName" type="text" className={` border-[1px] ${emptyField&&formData.fullName.trim()===""?"border-red-500":"border-gray-500"} rounded outline-none px-2 py-1`}/>
                </label>
                <label htmlFor="" className=' flex flex-col gap-1'>
                    <span className=' font-semibold uppercase'>email</span>
                    <input onChange={handleOnChange} name="email" type="text" className={` border-[1px] ${emptyField&&formData.email.trim()===""?"border-red-500":"border-gray-500"} rounded outline-none px-2 py-1`}/>
                </label>
                <label htmlFor="" className=' flex flex-col gap-1'>
                    <span className=' font-semibold uppercase'>Phone Number</span>
                    <input onChange={handleOnChange} name="phoneNumber" type="number" className={` border-[1px] ${emptyField&&formData.phoneNumber.trim()===""?"border-red-500":"border-gray-500"} rounded outline-none px-2 py-1`}/>
                </label>
                <label htmlFor="" className=' flex flex-col gap-1'>
                    <span className=' font-semibold uppercase'>address</span>
                    <input onChange={handleOnChange} name="address" type="text" className={` border-[1px] ${emptyField&&formData.address.trim()===""?"border-red-500":"border-gray-500"} rounded outline-none px-2 py-1`}/>
                </label>
                <label htmlFor="" className=' flex flex-col gap-1'>
                    <span className=' font-semibold uppercase'>State</span>
                    <input onChange={handleOnChange} name="state" type="text" className={` border-[1px] ${emptyField&&formData.state.trim()===""?"border-red-500":"border-gray-500"} rounded outline-none px-2 py-1`}/>
                </label>
                <label htmlFor="" className=' flex flex-col gap-1'>
                    <span className=' font-semibold uppercase'>city</span>
                    <input onChange={handleOnChange} name="city" type="text" className={` border-[1px] ${emptyField&&formData.city.trim()===""?"border-red-500":"border-gray-500"} rounded outline-none px-2 py-1`}/>
                </label>
                <button  className=' bg-black mt-6 text-white py-1 font-semibold uppercase rounded-md'>Continue</button>
            </form>
        </div>
        </div>
    </React.Fragment>
  )
}

export default Billing
// I tested an order that was sent to KRYPT'S Email to confirm if it was working
//Properly here are the things I sent
