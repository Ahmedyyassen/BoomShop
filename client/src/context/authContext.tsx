import useAuth from "@/hooks/useAuth";
import { User } from "@/types/user"
import { createContext, useEffect, useState } from "react"

// Define the type for the auth context value
type AuthContextValue = {
  authUser: User | null;
  setAuthUser: (user: User | null) => void;
};
export const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const { authUser:user } = useAuth();
  useEffect(()=>{
    setAuthUser(user!);
  }, [user])

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;