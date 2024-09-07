import React from 'react'
import KryptBackground from '../../components/KryptBackground'
import TypingAnimation from "../../components/TypingAnimation"
import {motion} from "framer-motion"
// import gsap from 'gsap'
// import { TextPlugin } from 'gsap/all'

function Main() {
    // const ref = useRef()
    const variant_animation={
        initial:{
            y:1000
        },
        animate:{
            y:0,
            transition:{
                duration: 1.5,
                ease: 'easeInOut',
                },
        }
    }

  return (
    <React.Fragment>
        <div className=' flex flex-col gap-5'>
            <TypingAnimation/>
            <article className=" text-white text-center text-sm px-5">
                Unlock the future of streetwear by introducing an innovative physical & digital experience through Luxury and Art .

            </article>
            <section>
                <div  className=' overflow-hidden '>
                    <motion.h1 variants={variant_animation}
                    initial="initial" animate="animate" className='  text-xl font-semibold uppercase font-[Helvetica] text-[#ffe600f5]  text-center'> Vision</motion.h1>
                </div>
                <motion.article variants={variant_animation}
                    initial="initial" animate="animate" className=" text-white text-center text-sm px-5">
                    Our campaign aims to blend the allure of digital collectibles with real-world treasures, offering exciting rewards, including cash prizes, gadgets, and an all-inclusive trip for the lucky few.
                </motion.article>
                <KryptBackground/>
            </section>
        </div>
    </React.Fragment>
  )
}

export default Main