import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const isAuthenticated:boolean = localStorage.getItem('token')?true:false
    console.log(isAuthenticated)
  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to="/login"  />;
  }
};

export default ProtectedRoute;
