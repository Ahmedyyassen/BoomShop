import useApiClient, { authApi } from "@/constants/env"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
    const api = useApiClient();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate, isPending } = useMutation({
        mutationFn: async() => await authApi.logout(api),
        onSuccess: ()=>{
            toast.success("Logout success", { position: "top-center" });
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