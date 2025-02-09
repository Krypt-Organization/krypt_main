import useUri from "./useUri";


// BINANCE
// COINGECKO

enum Source {
    binance="https://fapi.binance.com/fapi/v2/ticker/price?symbol=SOLUSDT",
    coingecko='https://api.coingecko.com/api/v3/coins/solana/tickers?exchange_ids=binance'
}

const resolver = {
    [Source.binance]: json=>parseFloat(json['price']),
    [Source.coingecko]: json=>parseFloat(json['tickers'].filter(x=>x['target']==='USDT')[0]['converted_last']['usd'])
}

const DEFAULT_STALE_TIME_MS = 25*60*1000;
const DEFAULT_RETRY_DELAY_MS = 1*60*1000;
export default function useMarketValue(uri:Source=Source.coingecko, 
    staleTime:number=DEFAULT_STALE_TIME_MS,){

    const {data, ...query} = useUri<number>(uri, {
        staleTime,
        retry:3,
        retryDelay:DEFAULT_RETRY_DELAY_MS,
        select(_data:any) {
            let result;
            if(_data){
                result = resolver[uri](_data);
            }
            return result?result:undefined
        },
    })
    
    return {data, ...query}
}