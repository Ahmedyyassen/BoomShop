import { useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { PiSignInBold } from "react-icons/pi";
import { IoCloseCircleOutline } from "react-icons/io5";

import {
  Link,
  NavLink,
  NavLinkRenderProps,
  useLocation,
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useApp";
import { getCategoryList } from "../../store/apiCalls/categoryApiCalls";
import useAuth from "@/hooks/useAuth";


const navLinks = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Accessories", path: "/accessories" },
  { title: "Blog", path: "/blog" },
  { title: "Contant", path: "/contant" },
];

const BottomHeader = () => {
  const { authUser } = useAuth();
  const [menu, setMenu] = useState(false);
  const location = useLocation();
  const { data, isLoading } = useAppSelector((state) => state.cat);
  const dispatch = useAppDispatch();
  const [closeMenu, setCloseMenu] = useState(true);

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
      <div className="container mx-auto flex justify-between items-center py-1 px-3">
        <IoMdMenu
          onClick={() => setCloseMenu((prev)=> !prev)}
          className="xl:hidden my-2 text-white text-2xl"
        />
        <nav className="flex items-center gap-12">
            <div className="w-[200px] h-full relative hidden lg:block ">
              <a
                onClick={() => setMenu(!menu)}
                className="flex items-center w-full h-full text-base justify-between py-4 cursor-pointer text-white"
              >
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

          <article
            className={`fixed h-screen top-0 transition-all ${
              closeMenu ? "left-[-100%]" : "left-0"
            } lg:relative lg:h-full w-full md:w-1/2 lg:left-0 text-lg text-center text-white bg-main-main`}
          >
              <span
                onClick={() => setCloseMenu((prev)=> !prev)}
                className="block xl:hidden absolute top-4 right-8"
              >
                <IoCloseCircleOutline
                  size={40}
                  className="hover:text-red-500 transition-colors cursor-pointer"
                />
              </span>

            <div className="flex flex-col lg:flex-row items-center gap-2 mt-16 lg:mt-0 " >
              {navLinks.map((item) => (
                <NavLink
                  key={item.title}
                  style={navigateStyle}
                  className="h-full py-4 px-6 hover:bg-[#0079ca] transition-colors w-full"
                  to={item.path}
                >
                  {item.title}
                </NavLink>
              ))}
            </div>

          </article>
          {!closeMenu && (
            <div
              onClick={() => setCloseMenu((prev)=> !prev)}
              className="fixed bg-gray-600 opacity-40 h-screen w-1/2 right-0 top-0 hidden md:block"
            />
          )}
        </nav>

        {!authUser ? (
          <div className="flex gap-2 xl:gap-6 text-3xl text-white">
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
