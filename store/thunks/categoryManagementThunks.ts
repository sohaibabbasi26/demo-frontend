import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useRouter } from "next/router"
import { setUnauthorized } from '../slices/AuthSlice';
// import { cookies } from "next/headers";
// import Cookies from "js-cookie";


const apiUrl = `http://192.168.100.64:4000/admin`;



interface ApiResponse {
  status: number;
  token: string;
  message: string;
  data: any;
  categoryTitle: string;
  pagination: {
    totalPages: number
    currentPage: number
    totalCategories: number
  }
}



const getToken = () => localStorage.getItem("accessToken");
const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/admin`,
  credentials: "include"
});


const baseQueryWithLogout = async (args: any, api: any, extraOptions: any) => {

  const result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401 || result.error?.status === 403) {
    localStorage.removeItem("accessToken");

    console.log("[PUSHING TO LOGIN AGAIN]")
    api.dispatch(setUnauthorized(true));

    return { error: { message: "Session expired, please log in again." } };
  }

  return result;
};

export const categoriesManagementReducer = createApi({
  reducerPath: "categoryManagementReducer",
  baseQuery: baseQueryWithLogout,
  endpoints: (builder) => ({
    getCategories: builder.query<ApiResponse, { page: number; limit: number }>({
      query: ({ page, limit }) => ({
        url: `/get-all-categories?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
    getVideosByCategory: builder.query<ApiResponse, { id: string, page: number, limit: number }>({
      query: ({ id, page, limit }) => ({
        url: `/get-videos-by-category?categoryId=${id}&page=${page}&limit=${limit}`,
        method: "GET"
      })
    }),
    addCategory: builder.mutation<ApiResponse, FormData>({
      query: (formData: FormData) => ({
        url: "/create-category",
        method: "POST",
        body: formData,
      }),
    }),
    editCategory: builder.mutation<ApiResponse, FormData>({
      query: (formData: FormData) => ({
        url: "/update-category",
        method: "PUT",
        body: formData,
      }),
    }),
    deleteCategory: builder.mutation<ApiResponse, { categoryId: number | undefined }>({
      query: ({ categoryId }) => ({
        url: `/delete-category/${categoryId}`,
        method: "DELETE",
      }),
    })
  }),
});

export const { useGetCategoriesQuery, useGetVideosByCategoryQuery, useAddCategoryMutation, useEditCategoryMutation, useDeleteCategoryMutation } = categoriesManagementReducer;
