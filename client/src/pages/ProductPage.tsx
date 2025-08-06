import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Product } from "../model/productModel";
import API from "../lib/apiCall";
import { PRODUCTS_ITEM } from "../utils/constants";
import { FaRegHeart, FaShare, FaStar } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import Slider from "../components/slideProduct/Slider";
import SingleProductSkeleton from "@/components/Skeleton/SingleProductSkeleton";
import { useAppDispatch, useAppSelector } from "@/hooks/useApp";
import { addCartItem } from "@/store/slices/cartSlice";
import toast from "react-hot-toast";
import { addFavItem, removeFanItem } from "@/store/slices/favSlice";
import PageTransition from "@/components/PageTransition";

const ProductPage = () => {
  const { productId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<Product>();
  const [mainImg, setMainImg] = useState<string>();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state=> state.cart);
  const favItems = useAppSelector(state=> state.fav);
  
  const navigate = useNavigate();

  useEffect(()=>{
      async function getProduct(){
        setIsLoading(true);
        scrollTo({
          top:0
        })
        await API.get(`${PRODUCTS_ITEM}/${productId}`)
        .then((res)=> {
        setProduct(res.data)
        setMainImg(undefined);
        })
        .finally(()=> setIsLoading(false));
      }
      getProduct();
  }, [productId]);

  const handleAddToCart = ()=>{
    dispatch(addCartItem(product!))
    toast.success(
      <div className="flex product?s-center gap-5 min-w-[300px] max-w-[300px]">
          <div className="w-25 flex justify-center product?s-center">
              <img src={product?.images[0]} alt={product?.title}  className="object-cover h-20 w-auto" />
              </div>
        <article className="flex flex-col gap-1 text-sm p-2">
          <h1><strong className="text-lg text-ellipsis line-clamp-1">{product?.title}</strong></h1>
          <p className="text-main-p text-sm">Added to Cart</p>
          <div>
            <button onClick={()=> navigate("/cart")} className="btn mt-5 text-sm">View Cart</button>
          </div>
        </article>
      </div>,
      {duration: 3500}
    )
  }

  const isAdded = (): boolean =>{
    return cartItems.some((i)=> i.id === product?.id);
  }
  const isFavAdded = (): boolean =>{
    return favItems.some((i)=> i.id === product?.id);
  }

  const handleToFav = ()=>{
    if (!isFavAdded()) {
      dispatch(addFavItem(product!));
      toast.success(`${product?.title.slice(0,15)} added to favorites`);
    }else{
      dispatch(removeFanItem(product!));
      toast.error(`${product?.title.slice(0,15)} Removed from favorites`);
    }
  }

  // Zoom effect
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isZoomed, setIsZoomed] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

const handleMouseMove = (e: React.MouseEvent) => {
  const { left, top, width, height } = imageRef.current!.getBoundingClientRect();
  const x = ((e.clientX - left) / width) * 100;
  const y = ((e.clientY - top) / height) * 100;
  setZoomPos({ x, y });
};

const handleMouseEnter = () => setIsZoomed(true);
const handleMouseLeave = () => setIsZoomed(false);

  return (
    <PageTransition>
      <>
    { !isLoading ?  
    <div className="container pt-45 md:pt-60 mx-auto flex justify-between items-center flex-col md:flex-row md:gap-10">
        <div className="w-[80%] md:w-[40%]">
              <div
                ref={imageRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="relative w-full h-[400px] md:h-[600px] overflow-hidden rounded-md cursor-pointer "
              >
                <img
                  src={mainImg || product?.images[0]}
                  alt={product?.title}
                  className={`transition-transform duration-300 ease-in-out w-full h-full object-cover ${
                    isZoomed ? "scale-200" : "scale-100"
                  }`}
                  style={{
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  }}
                />
              </div>

          <div className="flex justify-center w-full md:w-2/3 mt-8 mx-auto gap-2 md:gap-8 items-center">
            { product?.images && product.images.length > 1 
            && product?.images.map((img)=>(
             <div className="w-32" key={img} > <img src={img} onClick={()=> setMainImg(img)}  className="h-20 md:h-32 w-auto object-cover cursor-pointer" /></div>
            ))}
          </div>
        </div>

        <article className="w-[90%] md:w-[58%] mt-16 md:mt-0">
            <h1 className="mb-0 md:mb-8 text-main-main text-[28px] md:text-4xl font-extrabold">{product?.title}</h1>
            <span className="flex items-center gap-2 my-4" >
              {Array(4).fill(0).map((_,i)=>(
               <FaStar key={i} className="fill-[#f8d941] text-xl" />
            ))}
            </span>
            <p className="text-2xl my-5 font-bold">$ {product?.price}</p>
            <h5 className="font-semibold mb-5 text-lg textcolor">Availability: <span className="text-main-main">{product?.availabilityStatus}</span></h5>
            { product?.brand && <h5 className="font-semibold mb-5 text-lg textcolor">Brand: <span className="text-main-main">{product?.brand}</span></h5>  }
            <p className="leading-6 text-main-p dark:text-gray-400">{product?.description}</p>
            <h5 className="font-semibold my-5 text-xl text-main-main">Hurry Up! Only {product?.stock} products left in stock</h5>
            <button className="btn" disabled={isAdded()} style={{background:isAdded()? "#fff":"", color:isAdded()? "#0090f0": ""}} onClick={handleAddToCart} >{isAdded()? "Item in cart" : "Add To Cart" }<TiShoppingCart/> </button>
            
            <article className="flex gap-2 mt-6">
                <button style={{color:isFavAdded()? "#fff":"", background:isFavAdded()? "#0090f0": ""}} onClick={handleToFav}  className="icons"><FaRegHeart/></button>
                <span className="icons"><FaShare/></span>
              </article>
        </article>
    </div> 
    : <SingleProductSkeleton />
    }

    <Slider category={product?.category as string} />
    

    </>
    </PageTransition>
  )
}

export default ProductPage
