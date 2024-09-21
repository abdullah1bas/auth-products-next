import Products from "../_components/Products";
import ProtectedRoute from "../_components/ProtectedRoute";
import { PERMISSIONS } from "../rolesPermissions";

function Categories() {
  return (
    <>
      <h1> Categories Page</h1>
      <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_CATEGORIES}>
        <Products showTitlePage={false} showButton={false} />
      </ProtectedRoute>
    </>
  );
}

export default Categories;
