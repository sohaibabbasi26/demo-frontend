"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import CategoryVideoDetails from "@/app/components/ui/category/CategoryVideoDetails";
import Sidebar from "@/app/components/ui/common/SidebarComponent";

const CategoryVideos: React.FC = () => {
  const { category } = useParams();
  const categoryId = Array.isArray(category) ? category[0] : category || "0";



  useEffect(() => {
    console.log("[CATEGORY]:", category);
  }, [category]);
  
  return (
    <div className="flex">
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>
      <div className="flex-grow px-4 mt-[100px] border-t border-borderTop">
        <CategoryVideoDetails categoryId={categoryId} category={category as string} />
      </div>
    </div>
  );
};

export default CategoryVideos;
