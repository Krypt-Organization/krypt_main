import img from "../assets/nft_product.jpeg"
import img2 from "../assets/nft_product2.jpg"

export const fakeData = Array(10).fill(0).map((_,index)=>{
    return(
        {
            id: index+1,
            img: (index+1)%2===0?img:img2,
            price:100,
            name:"NFT Product",
            description:"This is a description of the NFT product",
            category:"NFT pieces", 
            owner:"John Doe",
            unique_id:"0x1234567890"+index+1
        }
    )
})
