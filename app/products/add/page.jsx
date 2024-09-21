'use client'
import Input from "@/app/_components/Input";
import InputError from "@/app/_components/InputError";
import useFormZ from "@/app/_components/useFormZ";
import { useAddProductMutation } from "@/app/_RTKQ/productSlice";
import { addSchema } from "@/app/validations/addValid";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "../../styles/Form.module.css";
import ProtectedRoute from "@/app/_components/ProtectedRoute";
import { PERMISSIONS } from "@/app/rolesPermissions";

function AddProduct() {
  const {register: addForm, handleSubmit, reset, errors} = useFormZ(addSchema);
  const [category, setCategory] = useState("");
  const [addProduct, {error, isError, isLoading}] = useAddProductMutation();
  const router = useRouter();
  const handleChange = (e) => setCategory( e.target.value );

  const onSubmit = async ({ title, price, description, rate , count }) => {
    try {
      await addProduct({ title,  price,  description,  category, rating: { rate, count } });
      router.push('/products');
      reset();
    } catch (error) {
      console.log(error);
    }
  };
  const addInputs = [
    {id_name: "title", type: 'text', register: addForm('title'), placeholder: "Title", error: errors.title},
    {id_name: "price", type: 'number', register: addForm('price'), placeholder: "Price", error: errors.price, step: .01},
    {id_name: "description", type: 'text', register: addForm('description'), placeholder: "Description", error: errors.description},
    {id_name: "category", type: 'select', register: addForm('category'),placeholder: "Category", error: errors.category, handleChange: handleChange},
    {id_name: "rate", type: 'number', register: addForm('rate'), placeholder: "Rate", error: errors.rate, step: .1},
    {id_name: "count", type: 'number', register: addForm('count'), placeholder: "Count", error: errors.count},
  ]

  return (
    <>
      <h1> AddProduct </h1>
      <ProtectedRoute requiredPermission={PERMISSIONS.EDIT_PRODUCTS}>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

        {addInputs.map(({id_name, type, register, placeholder, error, step , handleChange}) => (
            <div  key={id_name}>
              <Input {...{id_name, type, register, placeholder, step, handleChange}}  />
              <InputError {...{error}} />
            </div>)
          )}

          <button  type="submit" disabled={isLoading}>
            {isLoading ? "added" : "Add Product"}
          </button>
        </form>
          {isError && error && (
            <p className={styles.error}>{error.data.message}</p>
          )}
      </ProtectedRoute>

    </>
  );
}

export default AddProduct;
