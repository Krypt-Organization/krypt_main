import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { passwordReset } from '../../extras/firebase';
import { toast, ToastContainer } from 'react-toastify';


function ForgotPassword() {
  const [email,setEmail] = useState("");
  const [emptyField,setEmptyField] = useState(false);
  const [disableBtn,setDisableBtn]= useState(false);

  const handleInputChange = (e)=>{
    setEmail(e.target.value);
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      setEmptyField(true);
      return;
    }
    setDisableBtn(true);
    try {
      await passwordReset(email);
      toast.success('Password reset email sent successfully', { position: "top-left", theme: "light" });
      setEmail("");
    } catch (error) {
      console.error(error);
    } finally {
      setDisableBtn(false);
    }
  };

  useEffect(()=>{
    const timer = setTimeout(()=>{
        setEmptyField(false);
    },3000);
    return ()=>clearTimeout(timer);
  })


  return (
    <React.Fragment>
      <ToastContainer/>
        <div className=' px-3 py-3'>
                    <form action="" onSubmit={handleSubmit} className=' py-2 gap-10 flex flex-col'>
                      <p className=' font-semibold text-center text-2xl uppercase'>Forgot Password ?</p>
                        <label className=' flex flex-col gap-1' htmlFor="">
                            <span className=' font-medium'>Email</span>
                            <input placeholder='Enter your Email' value={email} onChange={handleInputChange}  name='email' type={"email"} className={`${emptyField&&email.trim()===""?"border-red-600":"border-white"} border-[2px] bg-gray-100 text-black p-1 rounded-md outline-none ring-1 ring-gray-300`} />
                        </label>
                        
                        <button id='name' disabled={disableBtn} className={` ${disableBtn?"bg-gray-600 text-gray-300":"bg-black text-white"} text-white py-1 uppercase font-medium rounded-md`}>Forget</button>
                    </form>
                    <section className=' flex flex-col items-start gap-1'>
                        <span className=' text-center'>Don&apos;t have an account? <Link to="/auth/register" className=' text-blue-500'>Sign Up</Link></span>
                        <span className=' text-center'>Already have an account? <Link to="/auth/login" className=' text-blue-500'>Login</Link></span>
                    </section>
                </div>
    </React.Fragment>
  )
}

export default ForgotPassword