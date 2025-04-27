'use client'
import React from "react";
import EditVideoDetailsData from "./EditVideoDetailsData";
import CloseButton from "../common/CloseButton";
import { useEffect } from "react";
interface VideoDetailsComponentProps {
  showEditVideoDetailsComponent: boolean;
  videoDetails: {
    title: string;
    description: string;
    status?: string;
    category?: string;
    imageSrc: string;
    id?: number;
    categoryId?: number;
    thumbnail?: string | undefined;
    categoryTitle?: string | undefined;
    level: string 
  };
  refetchUserEntries?: () => void;
  isUser: boolean;
  handleCloseEditForm: () => void;
  refetchVideos?: () => void;
}

const EditVideoDetailsComponent: React.FC<VideoDetailsComponentProps> = ({
  showEditVideoDetailsComponent,
  videoDetails,
  refetchUserEntries,
  handleCloseEditForm,
  refetchVideos,
  isUser,
  
}) => {


  useEffect(() => {
    // Prevent background scrolling when modal is open
    if (showEditVideoDetailsComponent) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup when component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showEditVideoDetailsComponent]);

  return (
    <>
      {showEditVideoDetailsComponent && (
        <>
            
            <div
            className="fixed top-0 left-0 right-0 bottom-0 z-30 bg-black bg-opacity-30"
          ></div>

         

          <div
            className="bg-white fixed right-0 z-40 overflow-y-scroll min-h-screen h-screen overflow-x-hidden p-8 w-[400px] lg:w-[400px]  top-0 flex flex-col shadow border-r"
          > <CloseButton
          right={"2rem"}
          top={"2.3rem"}
          onClick={handleCloseEditForm}
        />
            <EditVideoDetailsData refetchUserEntries={refetchUserEntries} isUser={isUser}  handleSuccess={handleCloseEditForm} refetchVideos={refetchVideos} video={videoDetails} />
          </div>
        </>
      )}
    </>
  );
};

export default EditVideoDetailsComponent;
