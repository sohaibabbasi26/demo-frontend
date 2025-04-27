"use client"

import TopVideos from '@/app/components/ui/content-analytics/TopVideos'
import React from 'react'
import Sidebar from '@/app/components/ui/common/SidebarComponent'
import { useEffect, useState } from 'react'
import { useGetTopPerformanceInsightsQuery } from "@/store/thunks/insightsThunk";


const TopVids = () => {
const [page, setPage] = useState(1)
  const {data, error, isLoading} = useGetTopPerformanceInsightsQuery({page, limit :10});
  const [categoriesData, setCategoriesData] = useState<any[]>();
  const [videosData, setVideosData] = useState<any[]>();

  useEffect(() => {
    if (data) {
      console.log("[DATA]:",data);
      if ("insights" in data) {
        const fetchData = data as { insights: any };
        console.log("[FETCH DATA]:", fetchData);
        // setResponse(fetchData?.data);
        setVideosData(fetchData?.insights?.topVideos);
      }
      // setVideosData(data?.insights?.topCategories);
    }
  },[data]);

  return (

    <div className='flex'>
      <div className='w-64 flex-shrink-0'><Sidebar /></div>
      <div className='flex-grow mt-[100px] border-t border-borderTop'>
        
        <TopVideos
        topVideos={videosData}
        hasPagination={true}
        rowsPerPage={10}
        page={page}
        setPage ={setPage}
        totalPages = {data?.insights?.pagination?.totalPages}
      /></div>

    </div>
  )
}

export default TopVids