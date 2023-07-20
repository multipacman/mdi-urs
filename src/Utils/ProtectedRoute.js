import { Navigate, Outlet } from 'react-router-dom';
import authService from '../services/auth.services';
import Navbar from '../Components/Navigation/Navbar';

export default function ProtectedRoutes(props) {
  let user = authService.isLoggedIn();
  return user ? (
    <Navbar>
      <Outlet>{props.children}</Outlet>
    </Navbar>
  ) : (
    <Navigate to="/" />
  );
}
