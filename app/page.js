// import Image from "next/image";
// import styles from "./page.module.css";

import Dashboard from "./_components/Dashboard";
import ProtectedRoute from "./_components/ProtectedRoute";
import { PERMISSIONS } from "./rolesPermissions";

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_DASHBOARD}>
        <Dashboard />
      </ProtectedRoute>
    </div>
  );
}
