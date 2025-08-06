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
        <div className="container mx-auto flex items-center justify-between p-1">
          <Link to={"/"}><img src="./src/img/icon.png" className="size-20" /></Link>
         
            <SearchBox />

          <div>
            <div className="flex items-center gap-8">
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
  )
}

export default TopHeader
