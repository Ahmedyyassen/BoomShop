import { useContext, useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { PiSignInBold } from "react-icons/pi";
import {
  Link,
  NavLink,
  NavLinkRenderProps,
  useLocation,
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useApp";
import { getCategoryList } from "../../store/apiCalls/categoryApiCalls";
import { AuthContext } from "@/context/authContext";

const navLinks = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Accessories", path: "/accessories" },
  { title: "Blog", path: "/blog" },
  { title: "Contant", path: "/contant" },
];

const BottomHeader = () => {
  const { authUser } = useContext(AuthContext);
  const [menu, setMenu] = useState(false);
  const location = useLocation();
  const { data, isLoading } = useAppSelector((state) => state.cat);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategoryList());
  }, [dispatch]);

  useEffect(() => {
    setMenu(false);
  }, [location]);

  const navigateStyle = ({ isActive }: NavLinkRenderProps) => {
    return {
      background: isActive ? "#0079ca" : "",
    };
  };
  return (
    <div className="bg-main-main z-10">
      <div className="container mx-auto flex justify-between items-center">
        <nav className="flex items-center gap-12">
          <div className="w-[220px] h-full relative ">
            <a
              onClick={() => setMenu(!menu)}
              className="flex items-center w-full h-full text-lg  justify-between py-4 cursor-pointer text-white"
            >
              <IoMdMenu />
              <p className="font-semibold">Browse Category</p>
              <MdOutlineArrowDropDown />
            </a>
            <article
              style={{
                clipPath: menu
                  ? "polygon(0 0,100% 0,100% 100%,0 100%)"
                  : "polygon(0 0,100% 0,100% 0,0 0)",
              }}
              className="absolute top-full w-full transition-all flex flex-col max-h-[400px] overflow-y-auto bg-white z-10 border border-[#999] border-t-0"
            >
              {!isLoading &&
                data.map((item) => (
                  <Link
                    key={item}
                    to={`/category/${item}`}
                    className="p-3 border-b hover:bg-gray-300 transition-all capitalize border-main-border text-sm"
                  >
                    {item.replace("-", " ")}
                  </Link>
                ))}
            </article>
          </div>

          <article className="flex items-center gap-8 text-lg text-white">
            {navLinks.map((item) => (
              <NavLink
                key={item.title}
                style={navigateStyle}
                className="h-full py-4 px-6"
                to={item.path}
              >
                {item.title}
              </NavLink>
            ))}
          </article>
        </nav>
        {!authUser ? (
          <div className="flex gap-6 text-3xl text-white">
            <Link title="Login" to={"/login"}>
              <PiSignInBold />
            </Link>
            <Link title="Register" to={"/register"}>
              <FaUserPlus />
            </Link>
          </div>
        ) : (
          <Link to={"/profile"}>
            <div className="size-12 rounded-full border-2 border-main-border cursor-pointer bg-main-heading">
              <img
                src={authUser.profilePicture}
                className="w-full h-full rounded-full object-cover"
                title={authUser.username}
                alt={authUser.username}
              />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default BottomHeader;
