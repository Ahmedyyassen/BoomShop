import PageTransition from "@/components/PageTransition";
import ProductSkeleton from "@/components/Skeleton/ProductSkeleton";
import Product from "@/components/slideProduct/Product";
import API from "@/lib/apiCall";
import { Product as sss } from "@/model/productModel";
import { SEARCH_ITEM } from "@/utils/constants";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"

const SearchResult = () => {
    const query = new URLSearchParams(useLocation().search).get("query");

    const [products, setProducts] = useState<sss[]>([]);
    const [loading, setLoading] = useState(true);

   
    useEffect(()=>{
        async function searchHandle() {
            setLoading(true);
          await API.get(SEARCH_ITEM,{params:{q:query}})
          .then((res)=>{
              setProducts(res.data.products)
          }).finally(()=> setLoading(false))
        }
        if (query) searchHandle();
      },[query]);
    
  return (
    <PageTransition key={query} >
     <section className="container mx-auto my-32 pt-20">
      <article className="border-b-4 w-fit border-main-main py-4 mb-3">
          <h2 className="text-3xl text-main-main font-bold capitalize">Results for : <span className="text-main-heading">{ query && query}</span> </h2>
      </article>

    <div className="flex flex-wrap gap-4 justify-center">
      { !loading &&  (products.length > 0 ? products.map((item)=>(
        <div key={item.id}><Product item={item} /></div>
      ))
      : <p className="text-2xl text-main-p">No Results found.</p>) }

        {loading && Array(10).fill(0).map((_,i)=>(
          <ProductSkeleton key={i} />
          ))}
      </div>
    </section>
    </PageTransition>
  )
}

export default SearchResult;
