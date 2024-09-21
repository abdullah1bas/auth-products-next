"use client";
import Cookies from "js-cookie";

import Swal from "sweetalert2";
// import Categories from "./Categories";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../_RTKQ/productSlice";
import Link from "next/link";

function Products({ showTitlePage, showButton }) {
  const role = Cookies.get("role");

  const { data: products, isError, isLoading, isSuccess, error,
  } = useGetProductsQuery("products");
  const [deleteProduct] = useDeleteProductMutation();

  const deleteId = (product) => {
    Swal.fire({
      title: `Are you Sure To Delete ${[product.title]}?`,
      showCancelButton: true,
    }).then((data) => {
      data.isConfirmed && deleteProduct({ id: product.id });
    });
  };

  return (
    <>
      {isLoading && !isError && <h1>Loading...</h1>}
      {!isLoading && isError ? <p>Error : {error}</p> : null}
      {!isLoading && isSuccess && products && (
        <div>
          {showTitlePage && <h1> Products Page</h1>}
          {showButton && (
            <Link href={"/products/add"} className="btn btn-success mt-3">
              Add New Product
            </Link>
          )}
          <table className="table table-striped mt-5">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                {showButton ? <th>Operations</th> : <th>Category</th>}
              </tr>
            </thead>
            <tbody className="boody">
              {products.map((product) => {
                return (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.title}</td>
                    <td>{product.description.slice(0, 30)}...</td>
                    <td>{product.price}$</td>
                    {showButton ? (
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => {
                            if ((role && role == "admin") || role == "editor") {
                              deleteId(product);
                            }
                            // role && role == 'admin' || role == 'editor' && deleteId(product);
                          }}
                        >
                          Delete
                        </button>
                        <Link
                          href={`/products/${product.id}`}
                          className="btn btn-info btn-sm"
                        >
                          View
                        </Link>
                        <Link
                          href={`/products/edit/${product.id}`}
                          className="btn btn-primary btn-sm"
                        >
                          Edit
                        </Link>
                      </td>
                    ) : (
                      <td>{product.category}</td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default Products;
