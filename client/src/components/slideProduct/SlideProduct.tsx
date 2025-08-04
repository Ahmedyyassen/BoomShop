import { useCallback, useRef, useState } from "react"
import Product from "./Product"
import useScroll from "../../hooks/useScroll";
import ProductSkeleton from "../Skeleton/ProductSkeleton";

const SlideProduct = () => {
  const [page, setPage] = useState(1);
  const {products, hasMore, isLoading, error} = useScroll(page,5);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastElemRef = useCallback((node: HTMLDivElement|null)=>{
    if(isLoading) return;
    if(observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries)=>{
      if(entries[0].isIntersecting && hasMore){
        setPage((prev)=> (prev+1));        
      }
    })
    if(node) observer.current.observe(node);
  },[isLoading, hasMore]);

    
  return (
    <section className="container mx-auto my-32">
        <article className="border-b-4 w-fit border-main-main py-4 mb-3">
            <h2 className="text-3xl text-main-main font-bold">Lorem ipsum dolor sit amet.</h2>
            <p className="text-main-p">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </article>

        <div className="flex flex-wrap gap-4 justify-center">
          {products.map((item, index)=>{
            if (products.length === index+1) {              
              return  <div ref={lastElemRef} key={item.id+index} ><Product item={item} /></div>;
            }else{
              return <div key={item.id+index} ><Product item={item} /></div>;
            }
          })}
          {isLoading && Array(10).fill(0).map((_,i)=>(
                <ProductSkeleton key={i} />
          ))}
          {error && "Error"}
        </div>
    </section>
  )
}

export default SlideProduct
