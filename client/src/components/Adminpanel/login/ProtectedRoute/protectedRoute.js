import React from 'react';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext.js';

function ProtectedRoute({ children }){
    const { isAuthorized, isLoading } = useAuth();

    if(isLoading){
        return <div>Loading...</div>
    } 

    if(!isAuthorized){
        return <Navigate to="/login" replace />
    }
  return children;
}

export default ProtectedRoute