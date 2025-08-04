import PageTransition from "@/components/PageTransition";
import { FormEvent } from "react";
import { Link } from "react-router-dom";
import { FiLoader } from "react-icons/fi";
import useLogin from "@/hooks/useLogin";


const Login = () => {
    const { handleChangeInput, isLoading, saveData,loginForm } = useLogin();
    
    const handelSubmit = (e:FormEvent)=>{
      e.preventDefault();
      saveData();
    }
  return (
    <PageTransition>
      <section className="flex justify-center items-center h-screen">
        <div className="w-[90%] md:w-[60%] lg:w-[40%] xl:w-[35%] 2xl:w-[25%] px-5 border border-main-border shadow-lg rounded-2xl mx-auto">
          <h1 className="border-b border-b-main-border text-center py-3 lg:py-5 mb-5 text-main-main text-lg lg:text-2xl font-bold">
            Login Account
          </h1>
          <form onSubmit={handelSubmit}>
            <div className="flex flex-col gap-y-2 lg:gap-y-4">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={loginForm.email}
                onChange={handleChangeInput}
                  className="w-full border h-12 lg:h-16 text-sm lg:text-lg border-main-border py-2 px-2 lg:px-4 rounded-lg"
              />

              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={loginForm.password}
                onChange={handleChangeInput}
                  className="w-full border h-12 lg:h-16 text-sm lg:text-lg border-main-border py-2 px-2 lg:px-4 rounded-lg"
              />
        
            </div>
            <div className="border-t border-main-border py-8 ">
              <button 
              disabled={isLoading}
              type="submit"
              className="w-full flex justify-center bg-main-main text-white border-2 rounded-lg border-main-border py-4 text-xl cursor-pointer font-bold transition-all hover:bg-transparent hover:text-main-main">
                {isLoading ? (
                  <FiLoader className="animate-spin text-3xl"  />
                ) : (
                  <p>Login</p>
                )}
              </button>
            </div>
          </form>
          <div>
            <div className="flex pb-4 items-center">
              <p className="text-main-p text-sm lg:text-lg ">Don&apos;t have an account?</p>
              <Link to="/register">
                <p className="font-semibold hover:underline">signup</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

export default Login
