import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import CryptoJS from "crypto-js";


export const encryptToken = (token) => {
  return CryptoJS.AES.encrypt(token, process.env.NEXT_PUBLIC_SECRET_KEY).toString();
};
export const decryptToken = (encryptedToken) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, process.env.NEXT_PUBLIC_SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Failed to decrypt token", error);
    return null;
  }
};

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  // de m3naha 2n al server y2dr y3mel axis 3la al cookies
  credentials: 'include',
  // da 3bara 3an interceptor => y3ne m3 kol request hytb3t hyb3t m3ah al token lw fe al cooky or localStorage
  // we de func fe al baseQuery bt3mel kda bta5od al headers 2le hn7ot feh al cooky
  prepareHeaders: (headers) => {
    const token = Cookies.get('accessToken');

    if (token) {
      // we mmken al header da kman save accept-language {en - ar} 
      headers.set('authorization', `Bearer ${decryptToken(token)}`);
    }
    return headers;
  },
});
// refresh token
const baseQueryWithReauth = async (args, api, extraOptions) => {
  // console.log(args) // request url, method, body
  // console.log(api) // signal, dispatch, getState()
  // console.log(extraOptions) //custom like {shout: true}
  // initial request
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    console.log('sending refresh token');
    // need to call refresh api to get new access token
    // refreshResult == newAccessToken bbygbha al server mn jwt
    const refreshResult = await baseQuery('auth/refresh', api, extraOptions);
    if (refreshResult?.data) {
      const { accessToken } = refreshResult.data;
      Cookies.set('accessToken', encryptToken(accessToken));
      result = await baseQuery(args, api, extraOptions);
    } else {
      // da hena fe al 7ala de 2n al refresh token nafso 2le hwa jwt finished we m7tag t3mel login
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = 'Your login has expired.';
      }
      return refreshResult;
    }
  }
  return result;
};

// de bta5od endpoints le al api
export const apiSlice = createApi({
  // baseQuery => hya ale btb3t al request asln
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Authentication'],
  // hena al mfrood a3rf al endpoints le al project bs hn3melhom fe kol mkan 3shan n3mel system
  endpoints: () => ({}),
});
