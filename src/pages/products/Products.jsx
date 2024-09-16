import React, { useEffect, useState } from 'react'
import ProductList from './ProductList'
import {useNavigate} from "react-router-dom"
import {fakeData} from "../../extras/fakeData"

function Products() {
    const navigate = useNavigate()
    const [bannerProduct, setBannerProduct] = useState([])

    useEffect(()=>{
        const randomNumber = Math.floor(Math.random()*149)
        setBannerProduct(()=>{
            return [ fakeData[randomNumber]]
        })
    },[])


  return (
    <React.Fragment>
        <div>
            <section className=' m-1 rounded-md bg-white px-5 py-5'>
                <p className=' text-center font-semibold uppercase text-2xl font-serif pb-5'>KRYPT MERCH </p>
                {
                    bannerProduct.map((obj)=>{
                        return(
                            <div key={obj.unique_id} className=' grid grid-cols-2'>
                                <section>
                                    <img src={obj.img} className=' size-48' alt="Product" />
                                </section>
                                <section className=' flex flex-col gap-2'>
                                    <p className='text-2xl font-light'>By Frank Diba</p>
                                    <p className=' font-semibold text-2xl'>{obj.name}</p>
                                    <p className=' font-semibold text-2xl'>${obj.price}</p>
                                    <p className=' font-semibold text-base'>#{obj.id}</p>
                                    <button className=' bg-black text-white rounded-full px-2 font-semibold py-1' onClick={()=>{
                                        navigate(`/${obj.unique_id}`)
                                    }}>Preview</button>
                                </section>
                            </div>
                        )
                    })
                }
            </section>
            <section>
                <ProductList listEnd={150}/>
            </section>
        </div>
    </React.Fragment>
  )
}

export default Products