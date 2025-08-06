import useAuth from '@/hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from './Spinner';


const RequiredAuth = ({ children }: { children: React.ReactNode }) => {
  const { authUser, isLoading } = useAuth();
    const location = useLocation();

  if (isLoading) {
    return <Spinner />
  }

  if (!authUser) {
    return <Navigate to={"/login"} state={{ path: location.pathname }}/>
  }
  return children;
};

export default RequiredAuth