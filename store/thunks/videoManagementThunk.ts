import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {setUnauthorized} from '../slices/AuthSlice'


const apiUrl = `http://192.168.100.64:4000/admin`;

interface ApiResponse {
  status: number;
  token: string;
  message: string;
  videos: any;
  user: {
    id: number;
    username: string;
  };
  pagination: {
    totalPages: number | undefined,
    currentPage: number | undefined,
    totalVideos: number | undefined
  }
}
 
const getToken = () => localStorage.getItem("accessToken");

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  credentials: "include"
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

export const videosReducer = createApi({
  reducerPath: "videosReducer",
  baseQuery: baseQueryWithLogout,
  endpoints: (builder) => ({
    getVideos: builder.query<ApiResponse, {page : number, limit : number}>({
      query: ({page, limit}) => ({
        url: `/get-all-videos?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
    addVideo: builder.mutation<ApiResponse, FormData>({
      query: (formData: FormData) => ({
        url: "/upload-video",
        method: "POST",
        body: formData
      })
    }),
    deleteVideo: builder.mutation<ApiResponse, { id: number | undefined } >({
      query: ({id}) => ({
        url: `/delete-video/${id}`,
        method: "DELETE",
        body: { videoId : id }
      })
    }),
    updateVideoDetails: builder.mutation<ApiResponse, { id: number, body: any } >({
      query: ({id, body}) => ({
        url: `/update-video/${id}`,
        method: "PUT",
        body: body
      })
    }),
  }),
});

export const { useGetVideosQuery, useAddVideoMutation, useDeleteVideoMutation, useUpdateVideoDetailsMutation} = videosReducer;
