import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { passwordReset } from '../../extras/firebase';


function ForgotPassword() {
  const [email,setEmail] = useState("");
  const [emptyField,setEmptyField] = useState(false);
  const [disableBtn,setDisableBtn]= useState(false);

  const handleInputChange = (e)=>{
    setEmail(e.target.value);
    console.log(e.target.value);
  }
  
  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(email.trim()==""){
      setEmptyField(true);
      return;
    }
    else{
      setDisableBtn(true);
      
      try{
        const resetPassword = await passwordReset(email);
        console.log(resetPassword);
        setDisableBtn(false);
      }catch(error){
        console.log(error);
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
        <div className=' px-3 py-3'>
                    <form action="" onSubmit={handleSubmit} className=' py-2 gap-10 flex flex-col'>
                      <p className=' font-semibold text-center text-xl underline'>Please Enter Your Email</p>
                        <label className=' flex flex-col gap-1' htmlFor="">
                            <span className=' font-medium'>Email</span>
                            <input placeholder='Email' value={email} onChange={handleInputChange}  name='email' type={"email"} className={`${emptyField&&email.trim()===""?"border-red-600":"border-white"} border-[2px] bg-gray-100 text-black p-1 rounded-md outline-none ring-1 ring-gray-300`} />
                        </label>
                        
                        <button disabled={disableBtn} className={` ${disableBtn?"bg-gray-600 text-gray-300":"bg-black text-white"} text-white py-1 uppercase font-medium rounded-md`}>Forget</button>
                    </form>
                    <section className=' flex justify-between'>
                        <span className=' text-center'>Have an account? <Link to="/auth/login" >Login</Link></span>
                    </section>
                </div>
    </React.Fragment>
  )
}

export default ForgotPassword