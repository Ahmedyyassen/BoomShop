import useApiClient, { authApi } from "@/constants/env"
import { REGISTERFORM } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const useSignUp = () => {
    
    const api = useApiClient();
    const navigate = useNavigate();
    const [signupForm, setSignupForm] = useState<REGISTERFORM>({
        firstName: "",
        lastName:"",
        email: "",
        password: "",
        confirmPassword: "",
      });

    const { mutate, isPending } = useMutation({
      mutationFn: async (data: REGISTERFORM) =>
        await authApi.register(api, data),
      onSuccess: () => {
        toast.success("User registered successfully", { position: "top-center" });
        navigate("/login", { replace: true });
      },
      onError: (error) => {
        toast.error(error.message, {
          position: "top-center",
        });
      },
    });
      const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignupForm((prev)=> ({...prev, [name]: value}))
      };
      
      const saveData = () => {
        mutate(signupForm);
      };

  return {
    saveData,
    isLoading:isPending,
    handleChangeInput,
    signupForm
}
}

export default useSignUp