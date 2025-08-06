import { Swiper, SwiperSlide } from "swiper/react"
import { memo, useEffect, useState } from "react";
import { Product as mod } from "../../model/productModel";
import API from "../../lib/apiCall";
import { PROCUCT_CATEGORY } from "../../utils/constants";
import Product from "./Product";
import { Autoplay, Navigation } from "swiper/modules";

type Props={
    category:string;
}
const Slider = memo(function Slider ({category}:Props){
    const [products, setProducts] = useState<mod[]>([]);

    useEffect(()=>{
        async function getProByCat(){
            await API(`${PROCUCT_CATEGORY}/${category}`)
            .then((res)=> {
                setProducts(res.data.products);                                
        })};
        getProByCat()
    },[category]);
    
  return (
    <section className="container mx-auto my-32">
    <article className="border-b-4 w-fit border-main-main py-4 mb-3">
        <h2 className="text-3xl text-main-main font-bold capitalize">{ category &&category.replace("-"," ")}</h2>
        <p className="text-main-p">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    </article>

    <div className="relative ">
        <Swiper 
        className=" bg-red-500"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false}}
         slidesPerView={5}
         breakpoints={
            { 1000: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 2,
            },
            640: {
                slidesPerView: 1,
            },
         }}
        spaceBetween={20} loop={true} navigation={true} modules={[Navigation,Autoplay]}>
        { products.map((item)=>(
            <SwiperSlide><Product item={item} key={item.id} /></SwiperSlide>
        ))}
    </Swiper>
        </div>
</section>
  )
})

export default Slider;
