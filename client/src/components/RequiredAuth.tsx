import { AuthContext } from '@/context/authContext';
import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const RequiredAuth = ({ children }: { children: React.ReactNode }) => {
  const { authUser, loading } = useContext(AuthContext);
    const location = useLocation();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!authUser) {
    return <Navigate to={"/login"} state={{ path: location.pathname }}/>
  }
  return children;
};

export default RequiredAuth