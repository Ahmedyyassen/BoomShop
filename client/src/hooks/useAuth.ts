import useApiClient, { apiUser } from "@/constants/env"
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query"

const useAuth = () => {
    const api = useApiClient();
    const { data, isLoading, error } = useQuery<User>({
      queryKey: ["authUser"],
      queryFn: async () => {
        const res = await apiUser.syncUser(api);
        return res.data.user;
      },
      retry: false, // <--- very important!
    });
  return { authUser:data, isLoading, error }
}

export default useAuth;