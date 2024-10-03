import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fakeData } from '../../extras/fakeData'
import {AiOutlineHeart} from "react-icons/ai"
import limited_img from "../../assets/limited.png"
import {ClipLoader} from "react-spinners"
import { Context } from '../../context/Context'

function Product() {
    const { id } = useParams()
    const {cart, setCart} = useContext(Context)
    const [product, setProduct] = useState([])
    const [option,setOption] = useState({size:"LG",quantity:"1"})
    const [addedToCart,setAddedToCart] = useState(false)
    const navigate = useNavigate();
    const date = new Date()

    useEffect(()=>{
        const filterId = fakeData.filter((eachData)=>{
            return eachData.unique_id === id;
        })
        setProduct(filterId);
    },[])
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setAddedToCart(false)
        },2000)

        return ()=> clearTimeout(timer);
    },[addedToCart])

    const handleBack = ()=>{
        navigate("/products")
    }

    const handleOptions = (e)=>{
        e.preventDefault();
        setOption((prev)=>{
            return {...prev,[e.target.name]:e.target.value}
        });
    }

    const addToCart = ()=>{
        if(cart.length==0){
            const addToCartObject = {...product[0],...option,quantity:Number(option.quantity),total:Number(option.quantity)*product[0].price}
            console.log(addToCartObject);
            setCart((prev)=>{
                return [...prev,addToCartObject]
            })
            setAddedToCart(true)
            console.log("empty")
        }else{
            let quantity;
            const findId = cart.filter((eachItem)=>{
                return eachItem.unique_id == id;
            });
            
            console.log(findId);
        }
    }




  return (
    <React.Fragment>
        <div>
            <button onClick={handleBack} className=' font-black text-3xl px-5 text-white cursor-pointer'>←</button>
            {
                product.length===0?<ClipLoader/>:
                product.map((product)=>{
                    return(
                        <div key={product.unique_id} className=' md:grid md:grid-cols-2 relative flex flex-col items-center gap-5 bg-white m-1 rounded-md py-10 px-2 md:px-8'>
                            <div className={` bg-green-600 font-semibold px-5 py-1 uppercase text-white rounded-md fixed top-2 left-1 ${addedToCart?"translate-x-5":"-translate-x-[700px]"} transition-all`}>
                                <p>Item Added To Cart</p>
                            </div>
                            <section className=' '>
                                <img src={product.img} alt="NFT" className={` size-72 lg:size-96 rounded-md`}/>
                            </section>
                            <section className=' w-full  flex flex-col gap-5'>
                                <section className='  flex justify-between  px-3 py-2'>
                                    <p className=' text-gray-900 font-light text-lg uppercase'>Published: <span className=' font-semibold text-base'>{`${date.toLocaleDateString()}`}</span></p>
                                    <span className=' transition-colors hover:bg-gray-200 flex gap-2 ring-[1px] rounded-full py-1 px-5  ring-black items-center'>
                                            <span className=' font-semibold'>21</span>
                                        <AiOutlineHeart className=' hover:text-red-600 text-2xl'/>
                                    </span>
                                </section>
                                <h2 className=' font-semibold text-3xl'>{product.name}</h2>
                                <p className=' text-gray-900 font-semibold text-xl'>${product.price}</p>
                                <ul className=' border-b-[1px] pb-4 border-gray-600 text-gray-800 flex flex-col gap-1'>
                                    <li className=' flex gap-4 items-center  font-semibold text-[16px] '>Limited Edition <img src={limited_img} className=" size-8" alt="Limited"/></li>
                                    <li className=' text-lg uppercase font-semibold '>Krypt Collection</li>
                                </ul>
                                
                                <article className=' bg-gray-100 px-2 pb-2 rounded font-medium text-lg'>
                                    {product.description}
                                </article>
                                <span className=" font-semibold text-sm">Size</span>
                                <select onChange={handleOptions} value={option.size} name="size" id="" className=' bg-gray-200 rounded-full py-1 px-3 border-[1px] border-black'>
                                    <option value="LG">LG</option>
                                    <option value="XL">XL</option>
                                    <option value="2XL">2XL</option>
                                    <option value="3XL">3XL</option>
                                </select>
                                <span className=" font-semibold text-sm">Quantity</span>
                                <select onChange={handleOptions} value={option.quantity} name="quantity" id="" className=' bg-gray-200 rounded-full py-1 px-3 border-[1px] border-black'>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                                <button onClick={addToCart} className=' bg-black  text-white py-1 rounded-full font-medium font-mono'>Purchase</button>
                                {/* <div>
                                <span className=' font-semibold italic font-[monospace] text-xl'>{String(product.id).length<3?'0'+product.id:product.id}</span>
                                </div> */}
                                <section className=' px-5 flex flex-col'>
                                    <span className=' font-semibold text-lg'>Mint your KRYPT NFT Collection Now!</span><br />

                                </section>

                            </section>
                                    <article className=' md:col-span-2'>
                                    The wait is over! You can now mint your limited edition KRYPT NFT shirt collection on the Solana blockchain. With only 100 unique pieces available, don&apos;t miss your chance to own a piece of digital fashion history. Once you select your NFT shirt, press the Mint button to receive a unique digital asset with: - Exclusive digital fashion Art. Randomized Gifts and amazing Treasures will be assigned to your Token&apos;s Address. Our lucky winners will be Notified immediately after Minting an item in our collection. This is our way of saying our customers are priority at the KRYPT brand. Join the KRYPT community and be part of an ever-expanding universe of fashion and art. Mint your NFT shirt now and unlock exclusive experiences, prizes, and more
                                    </article>
                        </div>
                    )
                })
            }
            <br />
        </div>
    </React.Fragment>
  )
}

export default Product