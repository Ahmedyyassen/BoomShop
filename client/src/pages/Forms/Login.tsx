import PageTransition from "@/components/PageTransition";
import { Link } from "react-router-dom";
import { FiLoader } from "react-icons/fi";
import useLogin from "@/hooks/useLogin";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";




const Login = () => {
    const { handleChangeInput, isLoading, saveData,loginForm } = useLogin();
    const [showPassword, setshowPassword] = useState(false);

  return (
    <PageTransition>
      <section className="flex justify-center items-center h-screen">
        <div className="w-[90%] md:w-[60%] lg:w-[40%] xl:w-[35%] 2xl:w-[25%] px-5 border border-main-border shadow-lg rounded-4xl mx-auto">
          {/* LOGO */}
          <div className="border-b border-b-main-border py-3 lg:py-6 mb-5 flex justify-center">
            <div className="w-36">
              <Link to={"/"} ><img src="./src/img/icon.png" className="" /></Link>
            </div>
          </div>

          <form className="py-2">
            <div className="flex flex-col gap-y-2 lg:gap-y-4">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={loginForm.email}
                onChange={handleChangeInput}
                className="w-full border h-12 lg:h-16 text-sm lg:text-lg border-main-border py-2 px-2 lg:px-4 rounded-full"
              />
              <div className="relative mb-6">
              <input
                type={ showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                value={loginForm.password}
                onChange={handleChangeInput}
                className="w-full border h-12 lg:h-16 text-sm lg:text-lg border-main-border py-2 px-2 lg:px-4 rounded-full"
                onKeyDown={(e) => e.key === "Enter" && saveData()}
              />
              { showPassword ? 
              <FaEye onClick={()=> setshowPassword(false)} className="absolute top-1/2 -translate-y-1/2 right-6 text-2xl cursor-pointer" />
              : <FaEyeSlash onClick={()=> setshowPassword(true)} className="absolute top-1/2 -translate-y-1/2 right-6 text-2xl cursor-pointer" />
              }

              </div>
            </div>
            <div className="border-t border-main-border py-6">
              <button
                disabled={isLoading}
                type="button"
                onClick={saveData}
                className="w-full flex justify-center bg-main-main text-white border-2 rounded-full border-main-border py-4 text-xl cursor-pointer font-bold transition-all hover:bg-transparent hover:text-main-main"
              >
                {isLoading ? (
                  <FiLoader className="animate-spin text-3xl" />
                ) : (
                  <p>Login</p>
                )}
              </button>
            </div>
          </form>
          <div>
            <div className="flex pb-4 items-center">
              <p className="text-main-p text-sm lg:text-lg ">
                Don&apos;t have an account?
              </p>
              <Link to="/register">
                <p className="font-semibold hover:underline text-main-main ml-1">signup</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

export default Login
