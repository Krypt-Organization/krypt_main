import React, { useContext, useEffect, useState } from 'react'
import banner from "../assets/contact_img.jpg";
// import PaystackPop from '@paystack/inline-js'
// import axios from 'axios';
import { Context } from '../context/Context';
import { updatePreviousPurchases } from '../extras/firebase';
import { useNavigate } from 'react-router-dom';

// const popup = new PaystackPop()
function Billing() {
    
    const [formData,setFormData] = useState({
        fullName:"",
        email:"",
        phoneNumber:"",
        address:"",
        state:"",
        town:""
    });
    const navigate = useNavigate();
    const user = localStorage.getItem("user");
    const [emptyField,setEmptyField] = useState(false);
    const {checkOut,order,setOrder} = useContext(Context)
    const handleOnChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { fullName, email, phoneNumber, address, state, town } = formData;
        if (!fullName || !email || !phoneNumber || !address || !state || !town) {
            setEmptyField(true);
            return;
        }

        try {
            // const paystackCheckout = await axios.post("http://localhost:5000/paystack/payment", {
            //     email,
            //     amount: checkOut,
            //     phoneNumber
            // });
            
            // const { reference, access_code } = paystackCheckout.data.data;
            // popup.resumeTransaction(access_code);

            // const paymentSuccessful = await axios.get("http://localhost:5000/paystack/verify", {
            //     params: { reference }
            // });

            // console.log(paymentSuccessful);
            console.log(formData);
            if(user){
                try{
                  const jsonUser = JSON.parse(user);
                  await updatePreviousPurchases(jsonUser.uid,order);
                }catch(error){
                  console.log(error);
                }
                console.log(JSON.parse(user))
            }else{
                console.log("OKAY");
            }
            
            setFormData({
                fullName: "",
                email: "",
                phoneNumber: "",
                address: "",
                state: "",
                town: "",
            });
            navigate("/")
            console.log(checkOut);
            setOrder([]);
        } catch (error) {
            console.error(error);
            console.log(checkOut);
            alert("An unexpected error occurred");
        }
    }
useEffect(()=>{
    const timer = setTimeout(()=>{
        setEmptyField(false);
    },3000);
    return ()=>clearTimeout(timer);
},[emptyField]);
return (
    <React.Fragment>
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
            <form action="" onSubmit={handleSubmit} className=' flex flex-col gap-3'>
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
                    <span className=' font-semibold uppercase'>Town</span>
                    <input onChange={handleOnChange} name="town" type="text" className={` border-[1px] ${emptyField&&formData.town.trim()===""?"border-red-500":"border-gray-500"} rounded outline-none px-2 py-1`}/>
                </label>
                <button onClick={handleSubmit} className=' bg-black mt-6 text-white py-1 font-semibold uppercase rounded-md'>Continue</button>
            </form>
        </div>
        </div>
    </React.Fragment>
  )
}

export default Billing