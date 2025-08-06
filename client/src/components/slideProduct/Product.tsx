import { FaCartArrowDown, FaCheck, FaRegHeart, FaShare } from "react-icons/fa"
import { FaStar, FaRegStarHalfStroke } from "react-icons/fa6"
import { Product as pro } from "../../model/productModel"
import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/hooks/useApp"
import { addCartItem } from "@/store/slices/cartSlice";
import { toast } from "react-hot-toast";
import { addFavItem, removeFanItem } from "@/store/slices/favSlice"

const Product = ({item}:{item:pro}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state=> state.cart);
  const favItems = useAppSelector(state=> state.fav);


  const isAdded = ()=>{
    return cartItems.some((i)=> i.id === item.id);
  }
  const isFavAdded = ()=>{
    return favItems.some((i)=> i.id === item.id);
  }

  const handleAddToCart = ()=>{
    dispatch(addCartItem(item));
    toast.success(
      <div className="flex items-center gap-5 min-w-[300px] max-w-[300px]">
          <div className="w-25 flex justify-center items-center">
              <img src={item.images[0]} alt={item.title}  className="object-cover h-20 w-auto" />
              </div>
        <article className="flex flex-col gap-1 text-sm p-2">
          <h1><strong className="text-lg text-ellipsis line-clamp-1">{item.title}</strong></h1>
          <p className="text-main-p text-sm">Added to Cart</p>
          <div>
            <button onClick={()=> navigate("/cart")} className="btn mt-5 text-sm">View Cart</button>
          </div>
        </article>
      </div>,
      {duration: 3500}
    )
  }
  

  const handleToFav = ()=>{
    if (!isFavAdded()) {
      dispatch(addFavItem(item));
      toast.success(`${item.title.slice(0,15)} added to favorites`);
    }else{
      dispatch(removeFanItem(item));
      toast.error(`${item.title.slice(0,15)} Removed from favorites`);
    }
  }
  
  return (
    <article style={{borderColor:isAdded()? "#0090f0":""}}  className="relative my-2 bg-[#f4f4f4] dark:bg-black w-[180px] md:w-[240px] lg:w-[290px] py-6 px-2 border shadow-lg group overflow-hidden border-main-border dark:border-gray-600 hover:border-main-main transition-colors rounded-lg">
      <Link   to={`/${item.id}`} >
      <span style={{top:isAdded()? "10px":"-15px"}} className="absolute left-1/2 -translate-x-1/2 text-sm transition-all flex items-center gap-1 font-semibold"><FaCheck className="text-green-400"/>in cart</span>
      <div className="h-[160px] md:h-[200px] w-auto px-6 flex items-center justify-center mb-8">
        <img src={item.images[0]} alt={item.title} className="h-[200px] object-center" />
      </div>
      <p className="mb-2 text-ellipsis text-sm md:text-lg font-semibold text-main-p line-clamp-1 ">{item.title}</p>
         <p className="flex my-4 gap-1 text-[#f8d941] text-base md:text-xl">
          {Array(Math.ceil(item.rating)).fill("").map((_,i)=>(
            <FaStar key={i} />
          ))}
          <FaRegStarHalfStroke />
         </p>
         <p className="text-sm md:text-xl font-bold text-main-main">$ {item.price}</p>
      </Link>

         <article className="absolute top-1/2 -translate-y-1/2 -right-12 group-hover:right-2 delay-100 transition-all flex flex-col gap-2">
          <button style={{backgroundColor:isAdded()? "#0090f0":"", color:isAdded()? "#fff":""}} disabled={isAdded()} className="icons" onClick={handleAddToCart}><FaCartArrowDown/></button>
          <button style={{backgroundColor:isFavAdded()? "#0090f0":"", color:isFavAdded()? "#fff":""}} onClick={handleToFav} className="icons"><FaRegHeart/></button>
          <button className="icons"><FaShare/></button>
         </article>
    </article>
  )
}

export default Product;
