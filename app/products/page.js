import React from "react";
import ProductsComponent from "../_components/Products";
import "./products.css";
import ProtectedRoute from "../_components/ProtectedRoute";
import { PERMISSIONS } from "../rolesPermissions";

export default function Products() {
  return (
    <div>
      <ProtectedRoute requiredPermission={PERMISSIONS.VIEW_PRODUCTS}>
        <ProductsComponent showTitlePage={true} showButton={true} />
      </ProtectedRoute>
    </div>
  );
}
