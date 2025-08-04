import { AuthContext } from '@/context/authContext';
import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const RequiredAuth = ({ children }: { children: React.ReactNode }) => {
  const { authUser } = useContext(AuthContext);
    const location = useLocation();

  if (!authUser) {
    return <Navigate to={"/login"} state={{ path: location.pathname }}/>
  }
  return children;
};

export default RequiredAuth