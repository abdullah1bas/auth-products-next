'use client'
import Cookies from 'js-cookie';
import { ROLE_PERMISSIONS } from '../rolesPermissions';
import { redirect } from 'next/navigation';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children, requiredPermission }) => {
  const role = Cookies.get('role');
  const accessToken = Cookies.get('accessToken');
  if (!accessToken ) redirect("/auth/login");
  if (requiredPermission && !ROLE_PERMISSIONS[role].includes(requiredPermission)) redirect("/products");
  
  return children;
};

export default ProtectedRoute;