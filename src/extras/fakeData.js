import img from "../assets/nft_product.jpg"
import img2 from "../assets/nft_product2.jpg"
import img3 from "../assets/nft_product3.jpg"
import { AssetColor } from "@w3b/hooks/common";

const imageList = [img,img2,img3];
export const fakeData = Array(100).fill(0).map((_,index)=>{
    const idx = Math.floor(Math.random()*imageList.length);
    const color = idx==0?AssetColor.BLUE:
        idx==1?AssetColor.WHITE:
        AssetColor.BLACK;

    return(
        {
            id: index+1,
            img: imageList[idx],
            color,
            price:100,
            name:"NFT Product",
            description:"This is a description of the NFT product",
            category:"NFT pieces", 
            owner:"John Doe",
            unique_id:"0x1234567890"+index+1
        }
    )
})
