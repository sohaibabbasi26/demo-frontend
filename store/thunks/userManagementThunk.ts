import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserDataType } from "@/app/components/ui/user/UserTable";
import {setUnauthorized} from '../slices/AuthSlice'
import { Limelight } from "next/font/google";


const apiUrl = `http://192.168.100.64:4000/admin`;

export interface ApiResponse {
  status: number;
  token: string;
  message: string;
  data: UserDataType[];
  user: {
    id: number;
    username: string;
  };
  pagination: {
    totalPages : number ,
    totalUsers: number,
    currentPage: number

  }
}

const getToken = () => localStorage.getItem("accessToken");

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  prepareHeaders: (headers) => {
    const token = getToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithLogout = async (args: any, api : any, extraOptions: any) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401 || result.error?.status === 403) {
    localStorage.removeItem("accessToken");

    console.log("[PUSHING TO LOGIN AGAIN]")
    api.dispatch(setUnauthorized(true));

    return { error: { message: "Session expired, please log in again." } };
  }

  return result;
};

export const userManagementReducer = createApi({
  reducerPath: "userManagementReducer",
  baseQuery: baseQueryWithLogout,
  endpoints: (builder) => ({
    getUsersList: builder.query<ApiResponse, {page: number, limit: number}>({
      query: ({page, limit}) => ({
        url: `/get-all-users?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
    getUsersByFilters: builder.query<ApiResponse,{filter : string, page :number, limit : number}>({
        query: ({filter, page ,limit}) => ({
            url: `/get-users-by-plan?plan=${filter}&page=${page}&limit=${limit}`,
            method: "GET"
        })
    }),
    editCustomVideo: builder.mutation<ApiResponse, unknown>({
        query: ({body}) => ({
            url: "/edit-custom-video",
            method: "PUT",
            body: body
        })
    }),
    deleteCustomVideo: builder.mutation<ApiResponse, { id: number | undefined , userId : number} >({
      query: ({id, userId}) => ({
        url: `/delete-custom-video`,
        method: "DELETE",
        body: { custom_manifestation_id: id, userId: userId }
      })
    }),
    addCustomVideo: builder.mutation<ApiResponse, FormData>({
        query: (formData: FormData) => ({
            url: "/assign-custom-video",
            method: "POST",
            body: formData
        })
    })
  }),
});

export const { useGetUsersListQuery, useEditCustomVideoMutation, useAddCustomVideoMutation, useGetUsersByFiltersQuery, useDeleteCustomVideoMutation } = userManagementReducer;
