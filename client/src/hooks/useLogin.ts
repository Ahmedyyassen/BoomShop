import useApiClient, { authApi } from "@/constants/env"
import { LOGINFORM } from "@/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
const useLogin = () => {
    const queryClient = useQueryClient()
      
    const location = useLocation();
    const redirectPath = location.state?.path || "/";
    const { authUser } = useAuth()
    const api = useApiClient();
    const navigate = useNavigate();
    const [loginForm, setLoginForm] = useState<LOGINFORM>({
        email: "",
        password: "",
      });

    const { mutate, isPending } = useMutation({
      mutationFn: async (data: LOGINFORM) => await authApi.login(api, data),
      onSuccess: () => {
        toast.success("User Login successfully", { position: "top-center" });
        queryClient.invalidateQueries({queryKey: ["authUser"]})
      },
      onSettled:()=>{
        if (authUser) {
          navigate(redirectPath, { replace: true });
        }
      },
      onError: (error) => {
        toast.error(error.message, {
          position: "top-center",
        });
      }
    });
      const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginForm((prev)=> ({...prev, [name]: value}))
      };
      
      const saveData = () => {
        mutate(loginForm);
      };

  return {
    saveData,
    isLoading:isPending,
    handleChangeInput,
    loginForm
}
}

export default useLogin