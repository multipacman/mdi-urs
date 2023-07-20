import { Navigate, Outlet } from 'react-router-dom';
import authService from '../services/auth.services';

export default function ProtectedRoutes() {
  let user = authService.isLoggedIn();
  return user ? <Outlet /> : <Navigate to="/" />;
}
