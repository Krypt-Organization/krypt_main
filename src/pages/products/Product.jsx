import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fakeData } from '../../extras/fakeData'
import {AiOutlineHeart} from "react-icons/ai"
import limited_img from "../../assets/limited.png"

function Product() {
    const { id } = useParams()
    const [product, setProduct] = useState([])
    const date = new Date()

    useEffect(()=>{
        const filterId = fakeData.filter((eachData)=>{
            return eachData.unique_id === id;
        })
        setProduct(filterId);
    },[])
  return (
    <React.Fragment>
        <div>
            {
                product.length===0?<p>Loading Data</p>:
                product.map((product)=>{
                    return(
                        <div key={product.unique_id} className=' flex flex-col items-center gap-5 bg-white m-1 rounded-md py-10 px-2'>
                            <section>
                                <img src={product.img} alt="NFT" className={` size-56 rounded-md`}/>
                                <section className=' flex  justify-between items-center px-3 py-2'>
                                    <p className=' text-gray-900 italic text-xs'>Published: <span className=' font-semibold text-sm'>{`${date.toLocaleDateString()}`}</span></p>
                                    <span className=' flex gap-1 items-center'>
                                        21
                                        <AiOutlineHeart className=' text-2xl'/>
                                    </span>
                                </section>
                            </section>
                            <section className=' flex flex-col gap-5'>
                                <h2 className=' font-semibold text-3xl'>{product.name}</h2>
                                <ul className=' border-b-[1px] pb-4 border-gray-600 text-gray-800 flex flex-col gap-1'>
                                    <li className=' flex gap-4 items-center  font-semibold text-[16px] '>Limited Edition <img src={limited_img} className=" size-8" alt="Limited"/></li>
                                    <li className=' text-[14px] font-semibold'>By Frank Diba</li>
                                    <li className=' text-lg uppercase font-semibold '>Krypt Collection</li>
                                </ul>
                                
                                <article className=' bg-gray-100 px-2 pb-2 rounded font-medium text-lg'>
                                    {product.description}
                                </article>
                                <button className=' bg-black mb-5 text-white py-1 rounded-full font-medium font-mono'>Purchase</button>
                                {/* <div>
                                <span className=' font-semibold italic font-[monospace] text-xl'>{String(product.id).length<3?'0'+product.id:product.id}</span>
                                </div> */}
                                <section className=' px-5 flex flex-col'>
                                    <span className=' font-semibold text-lg'>Mint your KRYPT NFT Collection Now!</span><br />

                                    <article>
                                        The wait is over! You can now mint your limited edition <strong>KRYPT</strong>  NFT shirt collection on the Solana blockchain. With only 150 unique pieces available, don&apos;t miss your chance to own a piece of digital fashion history.

                                        Once you&apos;ve collected your NFT shirt, press the Mint button to receive a unique digital asset with:

                                        - Exclusive digital fashion art
                                        - Random bespoke special traits that define the nature and status of your NFT
                                        - Rare and common traits that contribute to the KRYPT Universe&apos;s storytelling and scoring system

                                        Join the KRYPT community and be part of an ever-expanding universe of fashion and art. Mint your NFT shirt now and unlock exclusive experiences, prizes, and more
                                    </article>
                                </section>
                                <section>
                                    DIBA LINKS
                                </section>
                            </section>
                        </div>
                    )
                })
            }
        </div>
    </React.Fragment>
  )
}

export default Product