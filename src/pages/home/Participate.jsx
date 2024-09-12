import React from 'react'
import img from "../../assets/sample_img.png"
import { motion} from "framer-motion"

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
                delay: 0.5 *index
            }
        })
    }


    return (
    <React.Fragment>
        <div className=' rounded-tr-2xl rounded-tl-2xl flex flex-col gap-8 py-8 px-4  bg-white'>
            <header>
                <h1 className=' text-center font-black text-orange-600 text-xl uppercase font-[arial]'>How to participate</h1>
            </header>
            <ul className=' flex flex-col gap-5 justify-center items-center'>
                {
                    list_participations.map((each,index)=>{
                       return(
                        <motion.img
                        variants={staggeredVariant}
                        initial="initial"
                        whileInView={"animate"}
                        viewport={{once:true}}
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