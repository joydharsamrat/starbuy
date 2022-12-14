import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import SmallSpinner from '../../Components/SmallSpinner';
import { authContext } from '../../Context/AuthProvider';

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(authContext);
    const location = useLocation();
    if (loading) {
        return <SmallSpinner></SmallSpinner>
    }
    if (!user?.uid) {
        return <Navigate to='/login' state={{ from: location }} replace></Navigate >
    }
    return children
};

export default PrivateRoutes;