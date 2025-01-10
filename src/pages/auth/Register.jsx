import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {createUser} from "../../extras/firebase"

function Register() {
    const [formData,setFormData] = useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    });
    const [emptyField,setEmptyField] = useState(false);
    const [disableBtn,setDisableBtn]= useState(false);

    const handleInputChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
        };
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const {username,email,password,confirmPassword} = formData;
        if(username.trim()=="" || email.trim()=="" || password.trim()=="" || confirmPassword.trim()==""){
            toast.error('Please enter all fields 🚫', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });

            setEmptyField(true);
        }else{
            setDisableBtn(true);
            if(password === confirmPassword){
                try{
                    const user = await createUser(email,password);
                    console.log(user);
                    console.log(formData);
                    setDisableBtn(false);
                }catch(error){
                    console.error(error);
                    alert("An unexpected error occurred");
                }
            }else{
                toast.warn('Password Mismatch', {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,    
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
                setDisableBtn(false);
            }
        }
    }

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setEmptyField(false);
        },3000);
        return ()=>clearTimeout(timer);
    })

return (
    <React.Fragment>
        <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        draggable
        theme="light"
        transition={Bounce}
        />
        <div className=' px-3 py-3'>
            <form action="" onSubmit={handleSubmit} className=' py-2 gap-5 flex flex-col'>
                <label className=' flex flex-col gap-1' htmlFor="">
                    <span className=' font-medium'>Username</span>
                    <input onChange={handleInputChange} name="username" placeholder='Username' type="text" className={`bg-gray-100 border-[2px] ${emptyField && formData.username.trim()==""?"border-red-600":"border-white"} px-1 py-1 rounded-md  `} />
                </label>
                <label className=' flex flex-col gap-1' htmlFor="">
                    <span className=' font-medium'>Email</span>
                    <input onChange={handleInputChange} name="email" placeholder='Email' type={"email"} className={`bg-gray-100 border-[2px] ${emptyField && formData.email.trim()==""?"border-red-600":"border-white"} px-1 py-1 rounded-md outline-none `} />
                </label>
                <label className=' flex flex-col gap-1' htmlFor="">
                    <span className=' font-medium'>Password</span>
                    <input onChange={handleInputChange} name="password" placeholder='Password' type="password" className={`bg-gray-100 text-black border-[2px] ${emptyField&& formData.password.trim()==""?"border-red-600":"border-white"} px-1 py-1 rounded-md outline-none `} />
                </label>
                <label className=' flex flex-col gap-1' htmlFor="">
                    <span className=' font-medium'>Confirm Password</span>
                    <input onChange={handleInputChange} name="confirmPassword" placeholder='Confirm Password' type="password" className={`bg-gray-100 text-black border-[2px] ${emptyField && formData.confirmPassword.trim()==""?"border-red-600":"border-white"} px-1 py-1 rounded-md outline-none `} />
                </label>
                <button className={` ${disableBtn?"bg-gray-500":"bg-black"} text-white py-1 uppercase font-medium rounded-md`}>Sign Up</button>
            </form>
            <p className=' font-light text-sm'>Already have an Account?<Link to={"/auth/login"}> <span className=' font-semibold'>Login</span></Link></p>
        </div>
    </React.Fragment>
  )
}

export default Register