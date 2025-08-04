import axios, { Canceler } from "axios"
import { useEffect, useState } from "react"
import API from "../lib/apiCall";
import { Product } from "../model/productModel";

const useScroll = (page: number, limit: number) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(false);
    const [error, setError] = useState(false);

    const skip = (page - 1) * limit;

    useEffect(()=>{
        let cancel: Canceler;
        setIsLoading(true);
        setError(false);

       const getFn = async()=>{
        await API.get("products",{
            params: {limit, skip},
            cancelToken: new axios.CancelToken(c=> cancel = c)
        }).then((res)=>{
            setProducts((prev)=>{
                return [...new Set([...prev, ...res.data.products])]
              });
              setIsLoading(false);
              setHasMore(res.data.products.length > 0);
        }).catch((e)=>{
            if (axios.isCancel(e)) return;
            setError(true);
        })
       }
       getFn();
        return ()=> cancel()
    },[limit, skip]);

    
  return {products, isLoading, hasMore, error};
}

export default useScroll;
