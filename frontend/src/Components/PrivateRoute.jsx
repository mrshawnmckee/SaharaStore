//Private route for shiping, ex, so that normal viewwer cannot see it unless logged in
// Outlet is what we want to return if we are logged in, if not logged in we use the navigate component
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
    const { userInfo } = useSelector(state => state.auth)
    // return if there is user info, go to outlet(shipping screen), else, navigate to login, then replace to replace any past history
  return userInfo ? <Outlet /> : <Navigate to='/login' replace />
};

export default PrivateRoute
