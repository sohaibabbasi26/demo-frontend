"use client";
import React from "react";
import dynamic from "next/dynamic";
import Sidebar from "@/app/components/ui/common/SidebarComponent";
import { useEffect, useState } from "react";
import {
  setInsights,
  setTotalVideos,
} from "../../../store/slices/InsightsSlice";
import { useGetInsightsQuery } from "../../../store/thunks/insightsThunk";
import { useDispatch, useSelector } from "react-redux";

const DonutChart = dynamic(
  () => import("@/app/components/ui/common/DonutChart"),
  {
    ssr: false,
  }
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const {totalLikes, totalUsers, totalVideos} = useSelector((state: any) => state.insights);
  const { data, error, isLoading } = useGetInsightsQuery({});
  const [responseMessage , setResponseMessage] = useState("");


  useEffect(() => {
    console.log("[DATA]:", data);

    if (error) {
      console.log("[ERROR WHILE FETCHING INSIGHTS]:", error);
      if (error) {
        console.log("[ERROR WHILE FETCHING CATEGORIES]:", error);
        if (error) {
          if ('data' in error) {
            const fetchError = error as { data: { message: string } };
            console.log("[ERROR WHILE FETCHING VIDEOS]:", fetchError);
            setResponseMessage(fetchError.data?.message || "An error occurred.");
          } else {
            console.log("[ERROR]:", error);
            setResponseMessage("An unknown error occurred.");
          }
        }
      }
    }

    if (data) {
      dispatch(
        setInsights({
          totalLikes: data.insights.totalLikes,
          totalVideos: data?.insights.totalVideos,
          totalUsers: data?.insights?.totalUsers,
        })
      );
    }
  }, [data,error]);

  return (
    <div className="flex h-screen">
      <div className="w-[250px]">
        <Sidebar />
      </div>

      <div className="flex-1 mt-[100px] border-t border-borderTop ">
        {responseMessage ? (
          <><div className=" text-black flex  w-full justify-center items-center my-8">{responseMessage}</div></>
        ) : (
          <>
          <div className=" p-10 ">
          <div className="flex bg-[#F7F7F7] items-center justify-around px-5 py-10">
            <div className="w-[190px] flex justify-center items-center">
              <DonutChart label="Total Users" percentage={totalVideos} />
            </div>
            <div className="w-[190px] flex justify-center items-center">
              <DonutChart label="Total Videos" percentage={totalUsers} />
            </div>
            <div className="w-[190px] flex justify-center items-center">
              <DonutChart label="Total Likes" percentage={totalLikes} />
            </div>
          </div>
        </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
