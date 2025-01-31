import { useQuery } from "@tanstack/react-query";
import axios from "axios";



type Data = {
    image:string,
    name:string,
    symbol?:string
}

export default function useUri(uri:string){

    return useQuery({
        queryKey:['asset', uri],
        queryFn: async ()=>{
            const req = await axios.get<Data>(uri)
            return req.data
        },
        enabled:Boolean(uri)
    })
}