import useApiClient, { apiUser } from "@/constants/env";
import { CHANGEPASSWORD } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

const useChangePassword = () => {
    const api = useApiClient();
    const queryClient = useQueryClient();

    const [changePassword, setChangePassword] = useState<CHANGEPASSWORD>({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });
    const { mutate, isPending } = useMutation({
        mutationFn: async (data:CHANGEPASSWORD) => await apiUser.changePassword(api, data),
        onSuccess:()=>{
            toast.success("Password changed successfully", { position: "top-center" });
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
              setChangePassword({
              currentPassword: "",
              newPassword: "",
              confirmNewPassword: "",
            });
        },
        onError:(error)=>{
            toast.error(error.message, { position: "top-center" });
        }
    });
    const saveDate = ()=>{
        mutate(changePassword);
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
      const { name, value } = e.target;
      setChangePassword((prev) => ({ ...prev, [name]: value }));
    }
    const handleValid = ():boolean=>{
      return Boolean(
        changePassword.currentPassword &&
          changePassword.newPassword &&
          changePassword.confirmNewPassword &&
          changePassword.currentPassword.length >= 6 &&
          changePassword.newPassword.length >= 6 &&
          changePassword.confirmNewPassword === changePassword.newPassword
      );
    }

  return {
    saveDate,
    isPending,
    handleValid,
    handleChange,
    changePassword
  };
};

export default useChangePassword