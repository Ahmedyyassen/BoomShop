import { FaRegHeart } from "react-icons/fa"
import { TiShoppingCart } from "react-icons/ti"
import { Link } from "react-router-dom"
import { ModeToggle } from "../ModeToggle"
import { useAppSelector } from "@/hooks/useApp"
import SearchBox from "./SearchBox"

const TopHeader = () => {
    const cartItems = useAppSelector(state=> state.cart);
    const favItems = useAppSelector(state=> state.fav);

  return (
    <div>
      <div className="container mx-auto px-4 flex items-center justify-between py-2 flex-wrap">

        <Link to={"/"} >
          <img src="icon.png" className="w-10 h-10 xl:size-12 2xl:size-16" />
        </Link>

        <div className="order-2 md:order-1 mt-2 md:mt-0 w-full">
          <SearchBox />
        </div>

        <div className="order-1 md:order-2">
          <div className="flex items-center gap-4 2xl:gap-8">
            <ModeToggle />

            <Link to={"/favorite"} className="relative cursor-pointer">
              <FaRegHeart className="text-3xl" />
              <span className="icon">{favItems.length || 0}</span>
            </Link>

            <Link to={"/cart"} className="relative cursor-pointer">
              <TiShoppingCart className="text-3xl" />
              <span className="icon">{cartItems.length || 0}</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default TopHeader
