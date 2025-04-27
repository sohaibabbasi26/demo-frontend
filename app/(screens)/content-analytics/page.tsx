"use client";

import TopCategories from "@/app/components/ui/content-analytics/TopCategories";
import TopVideos from "@/app/components/ui/content-analytics/TopVideos";
import React, { useEffect, useState } from "react";
import Sidebar from "@/app/components/ui/common/SidebarComponent";
import { useGetTopPerformanceInsightsQuery } from "@/store/thunks/insightsThunk";
import CircularProgress from "@mui/material/CircularProgress";

const ContentAnalytics = () => {
  const [page, setPage] =useState(1)
  const { data, error, isLoading } = useGetTopPerformanceInsightsQuery({page, limit: 5});
  const [videosData, setVideosData] = useState<any[]>();
  const [categoriesData, setCategoriesData] = useState<any[]>();
  const [responseMessage, setResponseMessage] = useState<string>("");
const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  useEffect(() => {
    if (data) {
      console.log("[DATA]:", data);
      if ("insights" in data) {
        const fetchData = data as { insights: any };
        console.log("[FETCH DATA]:", fetchData);
        // setResponse(fetchData?.data);
        setCategoriesData(fetchData?.insights?.topCategories);
        setVideosData(fetchData?.insights?.topVideos?.slice(0,5));
      }
    }

    if (error) {
      console.log("[ERROR]:", error);
      if ("data" in error) {
        const fetchError = error as { data: { message: string } };
        console.log("[ERROR WHILE FETCHING INSIGHTS]:", fetchError);
        setResponseMessage(fetchError.data?.message || "An error occurred.");
        console.log("[responseMessage]:", responseMessage);
      } else {
        console.log("[ERROR]:", error);
        setResponseMessage("An unknown error occurred.");
      }
    }
  }, [data, error, responseMessage]);

  return (
    <div className="flex">
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>
      <div className="flex-grow px-4 mt-[100px] border-t border-borderTop">
        {isLoading ? (
          <>
            <div className="flex h-[60vh] w-full justify-center items-center my-15">
              <CircularProgress size={40} />
            </div>
          </>
        ) : responseMessage ? (
          <>
            <div className="flex h-full w-full justify-center items-center my-8">
              <p className="text-black">{responseMessage}</p>
            </div>
          </>
        ) : (
          <>
            <>
              <TopVideos
                topVideos={videosData}
                hasPagination={false}
                setPage={()=>{}}
                page={page}

              />
              <TopCategories topCategories={categoriesData} />
            </>
          </>
        )}
      </div>
    </div>
  );
};

export default ContentAnalytics;
