import useApiClient, { authApi } from "@/constants/env"
import { AuthContext } from "@/context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
    const api = useApiClient();
    const queryClient = useQueryClient();
    const { setAuthUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const { mutate, isPending } = useMutation({
        mutationFn: async() => await authApi.logout(api),
        onSuccess: ()=>{
            toast.success("Logout success", { position: "top-center" });
            setAuthUser(null);
            queryClient.clear();
            navigate("/");
        },
        onError: (err)=>{
            toast.error(err.message, { position: "top-center" });
        }
    })
  return { logoutMutation: mutate, isPending };
}

export default useLogout