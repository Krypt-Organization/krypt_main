import React, { useState, useRef, useEffect } from 'react';
import emailjs from "@emailjs/browser"

function Contact() {
    const [form, setForm] = useState({name:"", email:"", tel:"", message:""});
    const formRef = useRef(null);
    const [sent, setSent] = useState(false);
    const [emptyFields, setEmptyFields] = useState(false);
    const {name,email,tel,message} = form;


    const handleOnChange = (e)=>{
        setForm((prev)=>{
            return {...prev, [e.target.name]: e.target.value}
        })
    }

    const onSubmitForm = (e)=>{
        e.preventDefault();
        if(name.trim() === "" || email.trim() === "" || tel.trim() === "" || message.trim() === ""){
            setEmptyFields(true)
        }
        else {
            if(email.indexOf("@")==email.lastIndexOf("@")){
                emailjs.sendForm("service_r71gt9v", "template_qstprld", formRef.current, "V3aSnae8_6KBmf4TB").then((result)=>{
                    console.log(result.text);
                    setSent(true);
                    setForm({name:"", email:"", tel:"", message:""});
                    
                },
                (error) => {
                    console.log('FAILED...', error.text);
                  })
            }else{
                console.log("Not Okay")
            }
            setEmptyFields(false)
        }
    }

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setEmptyFields(false);
        },4000)
        return ()=> clearTimeout(timer);
    }, [emptyFields])

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setSent(false);
        },2000)
        return ()=> clearTimeout(timer);
    }, [sent])

    return (
    <React.Fragment>
        <div className=' py-5 bg-[url(assets/logo.svg)]'>
        <section>
            <p className={` ${sent?"translate-x-5":"-translate-x-72"} transition-all fixed w-fit px-3 font-semibold py-2 rounded-md bg-green-300`}>Mail Sent</p>
        </section>
            <h1 className=' font-semibold text-2xl uppercase text-white text-center'>Contact</h1>
            <form action="" ref={formRef} onSubmit={onSubmitForm} className=' flex flex-col gap-5 px-4  py-5 '>
                <section>
                    <input placeholder='Name: Jone Doe' type="text" value={name} name="name" onChange={handleOnChange}  className={`${ name.trim()=="" && emptyFields?" border-[2px]  border-red-600":"border-[2px] "} outline-none  w-full rounded-lg px-1 py-1`} />
                </section>
                <section>
                    <input placeholder='Email: email@provider.com' type="email" value={email} name="email" onChange={handleOnChange}  className={`${email.length==0 && emptyFields?" border-[2px]  border-red-600":"border-[2px] "} outline-none  w-full rounded-lg px-1 py-1`} />
                </section>
                <section>
                    <input placeholder='Tele:+123456789' type="tel" value={tel} name='tel' onChange={handleOnChange} className={`${tel.length==0 && emptyFields?" border-[2px]  border-red-600":"border-[2px] "} outline-none  w-full rounded-lg px-1 py-1`} />
                </section>
                <section>
                    <textarea placeholder='Message: Enter your message' name="message" onChange={handleOnChange} value={message} id=""  rows={5} className={`${message.length==0 && emptyFields?" border-[2px]  border-red-600":"border-[2px] "}  outline-none w-full rounded-lg px-1 py-1 `} />
                </section>
                <section className=' '>
                    <button className='w-full rounded-md font-semibold py-1 uppercase bg-white'>Message</button>
                </section>
            </form>
        </div>
    </React.Fragment>
  )
}

export default Contact