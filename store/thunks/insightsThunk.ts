import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {setUnauthorized} from '../slices/AuthSlice'
import Cookies from "js-cookie";


const apiUrl = `http://192.168.100.64:4000/admin`;

interface ApiResponse {
  status: number;
  token: string;
  message: string;
  insights: {
    totalLikes: number;
    totalVideos: number;
    totalUsers: number;
    pagination: {
      totalPages: number
    }
  };
  user: {
    id: number;
    username: string;
  };
}


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

export const insightsReducer = createApi({
  reducerPath: "insightsReducer",
  baseQuery: baseQueryWithLogout,
  endpoints: (builder) => ({
    getInsights: builder.query<ApiResponse, unknown>({
      query: () => ({  
        url: "/get-overall-insights",    
        method: "GET",
      }),
    }),
    getTopPerformanceInsights: builder.query<ApiResponse, {page: number, limit: number}>({
        query: ({page, limit}) => ({
          url: `/get-top-performance-insights?page=${page}&limit=${limit}`,
          method: "GET",
        }),
      }),
  }),
});

export const { useGetInsightsQuery, useLazyGetInsightsQuery, useGetTopPerformanceInsightsQuery } = insightsReducer;
