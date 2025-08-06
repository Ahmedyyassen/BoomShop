import API from "@/lib/apiCall";
import { Product } from "@/model/productModel";
import { SEARCH_ITEM } from "@/utils/constants";
import { FormEvent, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SearchBox = () => {
    const [products, setProducts] = useState<Product[]>([]);
      const [value, setValue]= useState<string>("");
      const navigate = useNavigate();
      const location = useLocation();

      useEffect(()=>{
          async function searchHandle() {
            if(!value.trim()){
              setProducts([]);
            }
            await API.get(SEARCH_ITEM,{params:{q:value}})
            .then((res)=>{
                setProducts(res.data.products.slice(0,5) || []);
            })
          }
          const debonuse = setTimeout(()=>{
            searchHandle();
          },300);

          return ()=> clearTimeout(debonuse);
        },[value]);

        useEffect(()=>{
          setProducts([]);
          setValue("");
        },[location])

        const handleSumbit = (e: FormEvent)=>{
            e.preventDefault();
            if (value.trim()) {
                navigate(`/search?query=${encodeURIComponent(value.trim())}`);
            }
        }
  return (
    <form onSubmit={handleSumbit} className={`w-full xl:w-fit relative flex items-center rounded-4xl border-1 ${value.length>0? "rounded-b-none":""} border-main-main`}>
    <input value={value} onChange={(e)=>setValue(e.target.value)}  type="text" placeholder="Search For Products" className="outline-0 h-10 w-full 2xl:h-12 lg:w-[400px] 2xl:w-[500px] py-1 px-4 rounded-l-4xl " />
    <button type="submit" className={`h-10 2xl:h-12 w-[80px] 2xl:w-[100px] rounded-r-4xl bg-main-main text-xl flex justify-center items-center cursor-pointer`}><FaSearch className="fill-white" /></button>
    <div className={`absolute max-h-[350px] overflow-y-auto border-1 p-1 rounded-b-2xl border-main-main border-t-0 top-[100%]  w-[calc(100%+2px)] -left-[1px]  bg-white ${value.length>0? "block":"hidden"}`}>
      {products.map((i)=>(
       <Link to={`/${i.id}`} key={i.id} className="flex hover:bg-gray-300 transition-all">
        <div className="w-10 flex justify-center items-center">
        <img src={i.images[0]} alt={i.title} className="w-auto h-12 " />
        </div>
         <h1 className="p-4 text-gray-600 text-sm font-semibold" >{i.title}</h1>
       </Link>
      ))}
      {products.length === 0 &&  <p className="text-main-p bg-white p-4">There is no any items...</p> }
    </div>
  </form> 
  )
}

export default SearchBox
