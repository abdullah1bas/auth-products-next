'use client'
import Input from "@/app/_components/Input";
import InputError from "@/app/_components/InputError";
import useFormZ from "@/app/_components/useFormZ";
import { useEditProductMutation, useGetProductsQuery } from "@/app/_RTKQ/productSlice";
import { addSchema } from "@/app/validations/addValid";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "../../../styles/Form.module.css";
import ProtectedRoute from "@/app/_components/ProtectedRoute";
import { PERMISSIONS } from "@/app/rolesPermissions";

function ProductEdit(props) {
  const { params } = props;
  const editID = params.editID;
  const {register: editForm, handleSubmit,setValue , reset, errors} = useFormZ(addSchema);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();
  const handleChange = (e) => setCategory( e.target.value );

  const [editProduct] = useEditProductMutation();
  const {data: product, isError, isLoading, isSuccess, error, } = useGetProductsQuery(`products/${editID}`);

  useEffect(() => {
    if(isSuccess && product){
      setValue('title' ,product.title);
      setValue('price' ,Number(product.price));
      setValue('description' ,product.description);
      setValue('category' ,product.category);
      setValue('rate' ,Number(product.rating.rate));
      setValue('count' ,Number(product.rating.count));
      setCategory(product.category);
      setImage(product.image);
    }
  }, [isSuccess , product, setValue]);

  const onSubmit =  ({ title, price, description, rate , count }) => {
    try {
      editProduct({id: editID, productData: {
        id: editID, title,  price,  description, image, category,  rating: { rate, count }
      }});
      router.push('/products');
      reset();
    } catch (error) {
      console.log(error);
    }
  };
  const editInputs = [
    {id_name: "title", type: 'text', register: editForm('title'), placeholder: "Title", error: errors.title},
    {id_name: "price", type: 'number', register: editForm('price'), placeholder: "Price", error: errors.price, step: .01},
    {id_name: "description", type: 'text', register: editForm('description'), placeholder: "Description", error: errors.description},
    {id_name: "category", type: 'select', register: editForm('category'),placeholder: "Category", error: errors.category, handleChange: handleChange},
    {id_name: "rate", type: 'number', register: editForm('rate'), placeholder: "Rate", error: errors.rate, step: .1},
    {id_name: "count", type: 'number', register: editForm('count'), placeholder: "Count", error: errors.count},
  ]
  return (
    <>
      <h1>Product Edit</h1>

      <ProtectedRoute requiredPermission={PERMISSIONS.EDIT_PRODUCTS}>

        {isLoading && !isError && <h1>Loading...</h1>}
        {!isLoading && isError ? <p>Error : {error}</p> : null}
        {!isLoading && isSuccess && product && (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          {editInputs.map(({id_name, type, register, placeholder, error, step , handleChange}) => (
            <div  key={id_name}>
              <Input {...{id_name, type, register, placeholder, step , handleChange}}  />
              <InputError {...{error}} />
            </div>)
          )}

          <button  type="submit" disabled={isLoading}>
            {isLoading ? "Edited" : "Edit"}
          </button>
        </form>
        )}
        {isError && error && ( <p className={styles.error}>{error.data.message}</p> )}
      </ProtectedRoute>
    </>
  );
}

export default ProductEdit;
