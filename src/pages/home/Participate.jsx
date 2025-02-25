import React, { useRef } from 'react'
import img1 from "../../assets/img1.webp"
import img2 from "../../assets/img2.webp"
import img3 from "../../assets/img3.webp"
import img4 from "../../assets/img4.webp"
import {useInView, motion} from "framer-motion"

const list_participations = [{text:"Visit the Krypt Brand website to get started.",img:img1},{text:"Connect your Solana wallet to unlock access.",img:img2},{text:"You'll have the chance to mint one of the exclusive 100 collectibles.",img:img3},{text:"Once  minted, your collectible will reveal a hidden treasure",img:img4}]

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


    return (
    <React.Fragment>
        <div className=' rounded-tr-2xl rounded-tl-2xl flex flex-col gap-8 py-8 px-4  bg-white'>
            <header>
                <h1 className=' text-center font-black text-orange-600 text-xl uppercase font-[arial]'>How to participate</h1>
            </header>
            <ul className=' flex flex-col md:grid md:grid-cols-2  gap-10 justify-center items-center' ref={ref}>
                {
                    list_participations.map((each,index)=>{
                       return(
                        <motion.div variants={staggeredVariant}
                        initial="initial"
                        animate={inView && "animate"}
                        custom={index}
                        key={index+"#**#"} className=' items-center flex flex-col gap-3'>
                            <p className={`${index==2&&"text-center"} sm:text-lg md:text-sm lg:text-lg  md:text-center text-medium font-semibold `}>{each.text}</p>
                            <img loading="lazy" className=' sm:self-center sm:w-full md:w-[500px] w-[400px] rounded-md' src={each.img} alt="How To Participate" />

                        </motion.div>
                       )
                    })
                }
            </ul>
        </div>
    </React.Fragment>
  )
}

export default Participate