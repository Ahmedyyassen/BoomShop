import PageTransition from "@/components/PageTransition";
import useSignUp from "@/hooks/useSignUp";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import { Link } from "react-router-dom";

const Register = () => {
  const { signupForm, isLoading, handleChangeInput, saveData } = useSignUp(); 
  const [showPassword, setshowPassword] = useState({password:false, cPassword:false});
  

  return (
    <PageTransition>
      <section className="flex justify-center items-center h-screen">
        <div className="w-[90%] md:w-[60%] lg:w-[40%] xl:w-[35%] 2xl:w-[25%] px-5 border border-main-border shadow-lg rounded-2xl mx-auto">
          {/* LOGO */}
          <div className="border-b border-b-main-border py-3 lg:py-6 mb-5 flex justify-center">
            <div className="w-36">
              <Link to={"/"}>
                <img src="icon.png" className="" />
              </Link>
            </div>
          </div>

          <form>
            <div className="flex flex-col gap-y-2 lg:gap-y-4">
              <div className="grid grid-cols-2 gap-x-2 lg:gap-x-4">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="First Name"
                  value={signupForm.firstName}
                  onChange={handleChangeInput}
                  className="w-full border h-10 md:h-12 lg:h-16 text-sm lg:text-lg border-main-border py-2 px-2 lg:px-4 rounded-full"
                />
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Last Name"
                  value={signupForm.lastName}
                  onChange={handleChangeInput}
                  className="w-full border h-10 md:h-12 lg:h-16 text-sm lg:text-lg border-main-border py-2 px-2 lg:px-4 rounded-full"
                />
              </div>

              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={signupForm.email}
                onChange={handleChangeInput}
                className="w-full border h-10 md:h-12 lg:h-16 text-sm lg:text-lg border-main-border py-2 px-2 lg:px-4 rounded-full"
              />
              <div className="relative">
                <input
                  type={showPassword.password ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={signupForm.password}
                  onChange={handleChangeInput}
                  className="w-full border h-10 md:h-12 lg:h-16 text-sm lg:text-lg border-main-border py-2 px-2 lg:px-4 rounded-full"
                />
                {showPassword.password ? (
                  <FaEye
                    onClick={() =>
                      setshowPassword((pre) => ({ ...pre, password: false }))
                    }
                    className="absolute top-1/2 -translate-y-1/2 right-6 text-2xl cursor-pointer"
                  />
                ) : (
                  <FaEyeSlash
                    onClick={() =>
                      setshowPassword((pre) => ({ ...pre, password: true }))
                    }
                    className="absolute top-1/2 -translate-y-1/2 right-6 text-2xl cursor-pointer"
                  />
                )}
              </div>
              <div className="relative mb-4">
                <input
                  type={showPassword.cPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={signupForm.confirmPassword}
                  onChange={handleChangeInput}
                  className="w-full border h-10 md:h-12 lg:h-16 text-sm lg:text-lg border-main-border py-2 px-2 lg:px-4 rounded-full"
                  onKeyDown={(e) => e.key === "Enter" && saveData()}
                />
                  {showPassword.cPassword ? (
                  <FaEye
                    onClick={() =>
                      setshowPassword((pre) => ({ ...pre, cPassword: false }))
                    }
                    className="absolute top-1/2 -translate-y-1/2 right-6 text-2xl cursor-pointer"
                  />
                ) : (
                  <FaEyeSlash
                    onClick={() =>
                      setshowPassword((pre) => ({ ...pre, cPassword: true }))
                    }
                    className="absolute top-1/2 -translate-y-1/2 right-6 text-2xl cursor-pointer"
                  />
                )}
              </div>
              {/* <div className="flex items-center gap-x-2 mb-4">
                <input
                  type="checkbox"
                  name="accept"
                  id="accept"
                  className=" w-4 h-4 accent-main-main transition-all"
                  required
                />
                <label htmlFor="accept" className="text-main-p text-base">
                  I accept the terms and conditions
                </label>
              </div> */}
            </div>
            <div className="border-t border-main-border py-8 ">
              <button
                disabled={isLoading}
                type="button"
                onClick={saveData}
                className="w-full flex justify-center bg-main-main text-white border-2 rounded-full border-main-border py-2 md:py-4 text-xl cursor-pointer font-bold transition-all hover:bg-transparent hover:text-main-main"
              >
                {isLoading ? (
                  <FiLoader className="animate-spin text-3xl" />
                ) : (
                  <p>Sign up</p>
                )}
              </button>
            </div>
          </form>
          <div>
            <div className="flex pb-4 items-center">
              <p className="text-main-p text-sm lg:text-lg ">
                Already have an account?
              </p>
              <Link to="/login">
                <p className="font-semibold hover:underline text-main-main">
                  Login
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

export default Register
