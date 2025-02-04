import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";


type UriOptionParams = {
    prefix?:string,
    staleTime?:number,
}

export default function useUri<D>(uri:string, {prefix='asset', ...option}:UriOptionParams={}){

    return useQuery({
        queryKey:[prefix, uri],
        queryFn: async ()=>{
            const req = await axios.get<D>(uri)
            return req.data
        },
        enabled:Boolean(uri),
        ...option
    })
}