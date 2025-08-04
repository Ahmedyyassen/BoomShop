import PageTransition from "@/components/PageTransition";
import useSignUp from "@/hooks/useSignUp";
import { FormEvent } from "react";
import { FiLoader } from "react-icons/fi";
import { Link } from "react-router-dom";

const Register = () => {
  const { signupForm, isLoading, handleChangeInput, saveData } = useSignUp(); 

  const handelSubmit = (e:FormEvent)=>{
    e.preventDefault();
    saveData();
  }
  return (
    <PageTransition>
      <section className="flex justify-center items-center h-screen">
        <div className="w-[90%] md:w-[60%] lg:w-[40%] xl:w-[35%] 2xl:w-[25%] px-5 border border-main-border shadow-lg rounded-2xl mx-auto">
          <h1 className="border-b border-b-main-border text-center py-3 lg:py-5 mb-5 text-main-main text-lg lg:text-2xl font-bold">
            Create Account
          </h1>
          <form onSubmit={handelSubmit}>
            <div className="flex flex-col gap-y-2 lg:gap-y-4">
              <div className="grid grid-cols-2 gap-x-2 lg:gap-x-4">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="First Name"
                  value={signupForm.firstName}
                  onChange={handleChangeInput}
                  className="w-full border h-12 lg:h-16 text-sm lg:text-lg border-main-border py-2 px-2 lg:px-4 rounded-lg"
                />
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Last Name"
                  value={signupForm.lastName}
                  onChange={handleChangeInput}
                  className="w-full border h-12 lg:h-16 text-sm lg:text-lg border-main-border py-2 px-2 lg:px-4 rounded-lg"
                />
              </div>

              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={signupForm.email}
                onChange={handleChangeInput}
                className="w-full border h-12 lg:h-16 text-sm lg:text-lg border-main-border py-2 px-2 lg:px-4 rounded-lg"
              />

              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={signupForm.password}
                onChange={handleChangeInput}
                className="w-full border h-12 lg:h-16 text-sm lg:text-lg border-main-border py-2 px-2 lg:px-4 rounded-lg"
              />
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={signupForm.confirmPassword}
                onChange={handleChangeInput}
                className="w-full border h-12 lg:h-16 text-sm lg:text-lg border-main-border py-2 px-2 lg:px-4 rounded-lg"
              />
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
                type="submit"
                className="w-full flex justify-center bg-main-main text-white border-2 rounded-lg border-main-border py-4 text-xl cursor-pointer font-bold transition-all hover:bg-transparent hover:text-main-main"
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
                <p className="font-semibold hover:underline">Login</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

export default Register
