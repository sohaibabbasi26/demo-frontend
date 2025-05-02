import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiUrl = `https://demo-frontend-kmdj.vercel.app`;

interface ApiResponse {
  status: number;
  token: string;
  message: string;
  user: {
    id: number;
    username: string;
  };
}

interface LoginData {
    email: string;
    password: string;
    provider: string;
    fcmToken?: string
  }

export const authBaseSlice = createApi({
  reducerPath: "authBaseApi", 
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl, credentials: "include" }),
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponse, LoginData>({
      query: (credentials) => ({
        url: "/api/auth/login", // Calls /api/auth/login (Next.js API)
        method: "POST",
        body: credentials,
      }),
    }),
  }),
  // baseQuery: fetchBaseQuery({ baseUrl: "/api", credentials: "include" }),
  // endpoints: (builder) => ({
  //   login: builder.mutation<ApiResponse, LoginData>({
  //     query: (credentials) => ({
  //       url: "/auth/login",
  //       method: "POST",
  //       body: credentials,
  //     }),
  //   }),
  // }),
  
});

export const { useLoginMutation } = authBaseSlice;
