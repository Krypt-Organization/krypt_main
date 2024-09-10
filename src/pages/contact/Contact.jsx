import React from 'react'

function Contact() {
  return (
    <React.Fragment>
        <div className=' py-5 bg-[url(assets/logo.svg)]'>
            <h1 className=' font-semibold text-2xl uppercase text-white text-center'>Contact</h1>
            <form action="" className=' flex flex-col gap-5 px-4  py-5 '>
                <section>
                    <input placeholder='Name: Jone Doe' type="text"  className=' w-full rounded-sm px-1 py-1' />
                </section>
                <section>
                    <input placeholder='Email: email@provider.com' type="email"  className=' w-full rounded-sm px-1 py-1' />
                </section>
                <section>
                    <input placeholder='Tele:+123456789' type="tel"  className=' w-full rounded-sm px-1 py-1' />
                </section>
                <section>
                    <textarea placeholder='Message: Enter your message' name="" id=""  rows={5} className=' w-full rounded-sm px-1 py-1 ' />
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