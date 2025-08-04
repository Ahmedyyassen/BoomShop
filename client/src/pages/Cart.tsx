import PageTransition from "@/components/PageTransition";
import { useAppDispatch, useAppSelector } from "@/hooks/useApp"
import { deleteCartItem, increamentCartItem } from "@/store/slices/cartSlice";
import { FaTrashAlt } from "react-icons/fa";

const Cart = () => {
  const cartItems = useAppSelector(state=> state.cart);
  const total = cartItems.reduce((cur, acc)=>(cur + acc.price * acc.quantity!) ,0);
  const  dispatch = useAppDispatch();
  return (
    <PageTransition>
      <section className="pt-70 ">
        <div className="w-[45%] px-5 border border-main-border shadow-sm rounded-xl mx-auto">
          <h1 className="border-b border-b-main-border py-5 mb-5 text-main-main text-4xl font-bold">Order Summery</h1>
          <div className="h-[450px] overflow-y-auto">
            {cartItems.length === 0 ? 
            <p className="text-main-p text-2xl text-center mt-4">Your Cart is Empty.</p> 
            : (cartItems.map((item)=>(
              <div key={item.id} className="flex items-center justify-between h-[150px] border-b border-b-main-border pr-5 gap-5 last:border-0">
                <div className="flex gap-5">

                <div className="w-25 flex justify-center items-center">
                <img src={item.images[0]} alt={item.title}  className="object-cover h-20 w-auto" />
                </div>
                  <article className="">
                    <h4 className="text-main-heading mb-2 font-semibold text-xl line-clamp-1 overflow-ellipsis">{item.title}</h4>
                    <p className="text-main-p text-lg">${item.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                        <button onClick={()=> dispatch(increamentCartItem({mode:"remove",id:item.id}))} className="w-[27px] h-[27px] flex items-center justify-center cursor-pointer text-xl rounded-xs border border-main-border">-</button>
                          <span className="text-xl min-w-10 flex justify-center items-center bg-main-bg border text-main-main border-main-border">{item.quantity}</span>
                        <button onClick={()=> dispatch(increamentCartItem({mode:"add",id:item.id}))} className="w-[27px] h-[27px] flex items-center justify-center cursor-pointer text-xl rounded-xs border border-main-border">+</button>
                    </div>
                  </article>

                </div>
                <button onClick={()=> dispatch(deleteCartItem({id: item.id}))}><FaTrashAlt className="text-2xl cursor-pointer text-[#e51a1a] transition-all  hover:scale-120" /></button>
              </div>
            )))
            }
          </div>

          <div className="border-t border-main-border pt-6 ">
              <article className="flex items-center justify-between mb-5 ">
                <p className="text-xl text-main-heading capitalize">Total:</p>
                <span className="text-xl font-bold">${total.toFixed(2)}</span>
              </article>
              <div className="border-t border-main-border py-8 ">
                <button className="w-full bg-main-main text-white border-2 border-main-border py-4 rounded-xs text-xl cursor-pointer font-bold transition-all delay-200 hover:bg-transparent hover:text-main-main">Place Order</button>
              </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}

export default Cart;
