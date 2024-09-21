/* eslint-disable no-unused-vars */
import { signInWithPopup } from "firebase/auth";
// import { apiSlice, encryptToken } from "../../../RTKQ/apiSlice";
import Cookies from 'js-cookie';
import { apiSlice, encryptToken } from "./apiSlice";
// import { auth, googleProvider } from "../../../config/firebase";

// injectEndpoints => y3ne b7ot endpoints fe al slice de
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (credentials) => ({
        url: "auth/register",
        method: "POST",
        // mosh lazem a7wlo le json RTK bt3mel stringify
        body: { ...credentials },
      }),
      transformResponse: (response, meta, arg) => {
        const { accessToken, role } = response;  // يجب أن يحتوي الرد على الدور
        const encryptedToken = encryptToken(accessToken);

        Cookies.set('accessToken', encryptedToken);
        Cookies.set('role', role);
        return { accessToken, role };  // تخزين الدور في حالة الـ Redux
      },
      invalidatesTags: ['Authentication'],
    }),
    login: builder.mutation({
      query: ({email, password, remember }) => ({
        url: "auth/login",
        method: "POST",
        body: { email, password },
      }),
      transformResponse: (response, meta, arg) => {
        const { accessToken, role } = response;  // يجب أن يحتوي الرد على الدور
        const encryptedToken = encryptToken(accessToken);
        const encryptedPass = encryptToken(arg.password);

        Cookies.set('accessToken', encryptedToken);
        Cookies.set('role', role);
        if (arg.remember) {
          localStorage.setItem("email", arg.email);
          localStorage.setItem("password", encryptedPass);
        } 

        return { accessToken, role };  // تخزين الدور في حالة الـ Redux
      },
      invalidatesTags: ['Authentication'],
    }),
    loginWithGoogle: builder.mutation({
      async queryFn(_arg, _queryApi, _extraOptions, baseQuery) {
        try {
          const result = await signInWithPopup(auth, googleProvider);
          const { user } = result;
          const token = await user.getIdToken();
          console.log(user);

          // افتراض أنك ستتصل بالخادم للتحقق من المستخدم والحصول على `role`
          // const response = await baseQuery({
          //   url: "auth/google-login",
          //   method: "POST",
          //   body: { token },
          // });

          // const { accessToken, role } = response.data;
          // const encryptedToken = encryptToken(accessToken);
          // Cookies.set('accessToken', encryptedToken);
          // Cookies.set('role', role);

          // return { data: { accessToken, role } };
        } catch (error) {
          console.error("Failed to log in with Google", error);
          return { error };
        }
      },
      invalidatesTags: ['Authentication'],
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      invalidatesTags: ['Authentication'],
    }),
  }),
});
export const { useRegisterUserMutation, useLoginMutation, useLoginWithGoogleMutation , useSendLogoutMutation } =
  authApiSlice;
