import img from "../assets/nft_product.jpg"
import img2 from "../assets/nft_product2.jpg"
import img3 from "../assets/nft_product3.jpg"


const imageList = [img,img2,img3];
export const fakeData = Array(100).fill(0).map((_,index)=>{
    return(
        {
            id: index+1,
            img: imageList[Math.floor(Math.random()*imageList.length)],
            price:100,
            name:"NFT Product",
            description:"This is a description of the NFT product",
            category:"NFT pieces", 
            owner:"John Doe",
            unique_id:"0x1234567890"+index+1
        }
    )
})
