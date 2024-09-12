import React, { useEffect, useRef } from 'react'
import img from "../../assets/sample_img.png"
import {useInView, motion,useAnimate, stagger} from "framer-motion"

const list_participations = [img,img,img,img]

function Participate() {
    const staggeredVariant ={
        initial:{
            opacity:0,
            y:100
        },
        animate:(index)=>({
            opacity:1,
            y:0,
            transition:{
                delay: 1.2 *index,
                duration:0.3
            }
        })
    }
    const ref = useRef()
    const inView = useInView(ref, {once:true})

    useEffect(()=>{
        console.log("CURRENTLY IN VIEW", inView)
    },[inView])

    return (
    <React.Fragment>
        <div className=' rounded-tr-2xl rounded-tl-2xl flex flex-col gap-8 py-8 px-4  bg-white'>
            <header>
                <h1 className=' text-center font-black text-orange-600 text-xl uppercase font-[arial]'>How to participate</h1>
            </header>
            <ul className=' flex flex-col gap-5 justify-center items-center' ref={ref}>
                {
                    list_participations.map((each,index)=>{
                       return(
                        <motion.img
                        variants={staggeredVariant}
                        initial="initial"
                        animate={inView && "animate"}
                        custom={index}
                        key={index+"#**#"} className=' w-screen rounded-md' src={each} alt="how to participate" />
                       )
                    })
                }
            </ul>
        </div>
    </React.Fragment>
  )
}

export default Participate