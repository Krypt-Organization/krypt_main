import { AssetColor } from "../hooks/common"
import { BLACK_IMAGE, BLUE_IMAGE, WHITE_IMAGE } from "./constants"


export const getNftCounts = ()=>{
    const sizeModel = (LARGE, XL, XXL, XXXL)=>({LARGE, XL, XXL, XXXL})
    const nftCounts = {
        BLACK:sizeModel(15, 10, 5, 5),
        WHITE:sizeModel(15, 10, 5, 5),
        BLUE:sizeModel(10, 10, 10, 0)
    }
    return nftCounts;
}


type NftSizeType =  {
    LARGE: number;
    XL: number;
    XXL: number;
    XXXL: number;
};

type NftCountRecordType = {
    BLACK: NftSizeType;
    WHITE: NftSizeType;
    BLUE: NftSizeType;
}

const flatten = list=>list.reduce((a,b)=>[...a, ...b], [])

const shuffle = list=>{
    console.log(list.length)
    let currentSize = list.length;
    let randomIndex;
    while(currentSize !== 0){
        randomIndex = Math.floor(Math.random()*currentSize);
        currentSize--;
        [list[randomIndex],list[currentSize]] = [list[currentSize],list[randomIndex]];
    }
    return list;
}

const details = {
    price:100,
    name:"NFT Product",
    description:"This is a description of the NFT product",
    category:"NFT pieces", 
    owner:"John Doe",
}

type AssetInfo = {
    color:string,
    size:string,
    img:string,
    [x:string]:string
}  

export function getAvailableNFTs(nftCountRecord:NftCountRecordType){
    const result = Object.entries(nftCountRecord).map(([color, value])=>{

        let image;
        switch(color){
            case AssetColor.BLACK:
                image = BLACK_IMAGE;
                break;
            case AssetColor.BLUE:
                image = BLUE_IMAGE;
                break;
            case AssetColor.WHITE:
            default:
                image = WHITE_IMAGE;
        }
        
        let assetsList =  Object.entries(value).map(([size, count])=>
            Array(count).fill({
                color:color,
                size:size,
                img: image,
                ...details
            })
        );
        return flatten(assetsList);
    })

    return shuffle(flatten(result)) as AssetInfo[];
}