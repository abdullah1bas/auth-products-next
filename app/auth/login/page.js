'use client'
import {  useEffect } from "react";
import Cookies from "js-cookie";
import styles from "../../styles/Form.module.css";
import GoogleButton from "react-google-button";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/app/_config/firebase";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import { useLoginMutation } from "@/app/_RTKQ/authApiSlice";
import { decryptToken, encryptToken } from "@/app/_RTKQ/apiSlice";
import Input from "@/app/_components/Input";
import InputError from "@/app/_components/InputError";
import { loginSchema } from "@/app/validations/loginValid";
import useFormZ from "@/app/_components/useFormZ";

function LoginRTK() {
  const { register: loginForm, handleSubmit, setValue, reset, errors } = useFormZ(loginSchema);
  const router = useRouter();
  const [login, { isError, isLoading, error }] = useLoginMutation();

  useEffect(() => {
    if (localStorage.getItem("password") && localStorage.getItem("email")) {
      const locStorgPass = localStorage.getItem("password");
      const locStorgEmaill = localStorage.getItem("email");
      const password = decryptToken(locStorgPass);

      // setUserInputs({ email: locStorgEmaill, password, remember: true });
      // تحديث الحقول المسجلة في useForm
      setValue('email', locStorgEmaill);
      setValue('password', password);
      setValue('remember', true);
    }
  }, [setValue]);
  if (Cookies.get("accessToken")) redirect("/");

  const handleChange = (e) => {
    const isCheckbox = e.target.type == 'checkbox';
    // setUserInputs({...userInputs, [e.target.name]: isCheckbox ? e.target.checked : e.target.value });
    if (isCheckbox && !e.target.checked) {
      localStorage.removeItem("password");
      localStorage.removeItem("email");
    }
  };

  const onSubmit = async ({ email, password, remember }) => {
    try {
      const {data: result} = await login({ email, password, remember });
    } catch (error) {
      console.log(error);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const token = await user.getIdToken();
      // console.log(user);
      // console.log(token);
      Cookies.set('role', 'user');
      Cookies.set('accessToken', encryptToken(token));
      
      localStorage.removeItem("password");
      localStorage.removeItem("email");
      router.push('/');
      // إرسال التوكن إلى الخادم
      // await loginWithGoogle({ token });
    } catch (error) {
      console.error("Google login error: ", error);
    }
  };

  let loginInputs = [
    { id_name: "email", type: "email", register: loginForm("email"), placeholder: "Email", 
      error: errors.email, handleChange: handleChange,
    },
    { id_name: "password", type: "password", register: loginForm("password"), placeholder: "Password", 
      error: errors.password, handleChange: handleChange,
    },
    { id_name: "remember", type: "checkbox", register: loginForm("remember"), 
      placeholder: "Remember Me", handleChange: handleChange,
    },
  ];
  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2>Login ﷺ </h2>

        {loginInputs.map(
          ({ id_name, type, register, placeholder, error, handleChange }) => (
            <div key={id_name}>
              <Input {...{ id_name, type, register, placeholder, handleChange}} />
              <InputError {...{ error }} />
            </div>
          )
        )}
        <button style={{marginBottom: '1rem'}} type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Signin"}
        </button>
        <GoogleButton onClick={handleGoogleLogin} />
      </form>
      {isError && error && ( <p className={styles.error}>{error?.data?.message}</p> )}
      <p> Don`t have an account? <Link href="/auth/register">Register here</Link></p>
    </>
  );
}

export default LoginRTK;


