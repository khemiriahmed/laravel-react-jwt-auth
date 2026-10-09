import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function GuestRoute() {
  const token = useSelector((state) => state.auth.token);

  return token
    ? <Navigate to="/dashboard" replace />
    : <Outlet />;
}