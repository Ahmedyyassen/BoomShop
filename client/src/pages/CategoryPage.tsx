import PageTransition from "@/components/PageTransition";
import ProductSkeleton from "@/components/Skeleton/ProductSkeleton";
import Product from "@/components/slideProduct/Product";
import API from "@/lib/apiCall";
import { Product as pro } from "@/model/productModel";
import { PROCUCT_CATEGORY } from "@/utils/constants";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState<pro[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
      async function getProByCat(){
        setLoading(true);
          await API(`${PROCUCT_CATEGORY}/${category}`)
          .then((res)=> {
              setProducts(res.data.products);                                
      }).finally(()=> setLoading(false))};
      getProByCat()
  },[category]);
  
return (
  <PageTransition key={category} >
    <section className="container mx-auto my-32 pt-20">
      <article className="border-b-4 w-fit border-main-main py-4 mb-3">
          <h2 className="text-3xl text-main-main font-bold capitalize">{category && category.replace("-"," ")} : {products.length}</h2>
          <p className="text-main-p">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </article>

    <div className="flex flex-wrap gap-4 justify-center">
      { !loading && products.map((item)=>(
        <div key={item.id}><Product item={item} /></div>
      ))}
        {loading && Array(10).fill(0).map((_,i)=>(
          <ProductSkeleton key={i} />
          ))}
      </div>
    </section>
  </PageTransition>
)
}

export default CategoryPage
