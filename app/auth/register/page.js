'use client'
import Cookies from "js-cookie";
import styles from "../../styles/Form.module.css";
import useFormZ from "@/app/_components/useFormZ";
import { signupSchema } from "@/app/validations/registerValid";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useRegisterUserMutation } from "@/app/_RTKQ/authApiSlice";
import Input from "@/app/_components/Input";
import InputError from "@/app/_components/InputError";

function RegisterRTK() {
  const {register: registerForm, handleSubmit, reset, errors} = useFormZ(signupSchema);

  const router = useRouter();

  const [ registerUser, { isError, isLoading, error }] = useRegisterUserMutation();

  if (Cookies.get("accessToken")) redirect("/");

  const onSubmit = async ({ first_name, last_name, email, password }) => {
    try {
      const { data: result } = await registerUser({first_name, last_name, email, password});
      if (result.accessToken) {
        router.push('/');
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const signupInputs = [
    {id_name: "first_name", type: 'text', register: registerForm('first_name'), placeholder: "First Name", error: errors.first_name},
    {id_name: "last_name", type: 'text', register: registerForm('last_name'), placeholder: "Last Name", error: errors.last_name},
    {id_name: "email", type: 'email', register: registerForm('email'), placeholder: "Email", error: errors.email},
    {id_name: "password", type: 'password', register: registerForm('password'), placeholder: "Password", error: errors.password},
    {id_name: "confirm_password", type: 'password', register: registerForm('confirm_password'), placeholder: "Confirm Password", error: errors.confirm_password},
  ]
  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {signupInputs.map(({id_name, type, register, placeholder, error}) => (
          <div  key={id_name}>
            <Input {...{id_name, type, register, placeholder}}  />
            <InputError {...{error}} />
          </div>)
        )}
          
        <button type='submit' disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Create Account'}
        </button>
      </form>
      {isError && error && <p className={styles.error}>{error.data.message}</p>}
    </>
  );
}

export default RegisterRTK;
