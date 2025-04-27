"use client";

import React from "react";
import UploadVideoForm from "../../forms/UploadVideoForm";
import CloseButton from "../common/CloseButton";
import { useEffect } from "react";
interface UploadVideoComponentProps {
  showUploadVideoComponenet: boolean;
  handleShowUploadVideo: () => void;
  blur?:boolean;
  refetchVideos: Function,

}

export const UploadVideoComponent: React.FC<UploadVideoComponentProps> = ({
  showUploadVideoComponenet,
  handleShowUploadVideo,
  refetchVideos,
  blur=true,
}) => {
  useEffect(() => {
      // Prevent background scrolling when modal is open
      if (showUploadVideoComponenet) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }
  
      // Cleanup when component unmounts
      return () => {
        document.body.classList.remove("overflow-hidden");
      };
    }, [showUploadVideoComponenet]);
  
  return (
    <>
      {showUploadVideoComponenet && (
        <>
         <div
            className="absolute top-0 left-0 right-0 bottom-0 z-10 bg-black bg-opacity-70"
            style={{ zIndex: 5 }}
          ></div>

          <div
            className="bg-white absolute top-0 right-0 z-20 p-8 w-[400px] lg:w-[400px] overflow-y-scroll h-screen min-h-screen overflow-x-hidden flex  flex-col shadow border-r"
            style={{ zIndex: 10 }}
          >

            <CloseButton right={"2rem"} top={"2.4rem"} onClick={handleShowUploadVideo} />

            <UploadVideoForm isUserFlow handleSuccess={handleShowUploadVideo} refetchVideos={refetchVideos} />
          </div>
        </> 
      )}
    </>
  );
};
