/* eslint-disable @next/next/no-img-element */
'use client'
import { useViewProductQuery } from "@/app/_RTKQ/productSlice";

function ProductDetails(props) {
    const {params} = props;
    const productID = params.productID;
  const {data: product , isError, isLoading, isSuccess, error,} = useViewProductQuery(productID);

  return (
    <>
      {isLoading && !isError && <h1>Loading...</h1>}
      {!isLoading && isError ? <p>Error : {error}</p> : null}
      {!isLoading && isSuccess && product && (
        <div className="card">  
          <img
            src={product.image}
            className="card-img-top w-25"
            alt={product.title}
          />
          <div className="card-body">
            <h5 className="card-title">{product.title}</h5>

            <p className="card-text">{product.description}</p>

            <p> Price: {product.price}$ </p>
            <p> category: {product.category} </p>
            <p> rate: {product.rating.rate} </p>
            <p> count: {product.rating.count} </p>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetails;
