"use client";
import Sidebar from "@/app/components/ui/common/SidebarComponent";
import VideoTable from "../../components/ui/video/VideoTable";

const VideoManagement = () => {
  return (
    <div className="flex ">
    
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>
      
      <div className="flex-grow px-4 mt-[100px] border-t border-borderTop">
        <VideoTable />
      </div>
    </div>
  );
};


export default VideoManagement;
