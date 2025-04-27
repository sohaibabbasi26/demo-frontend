import React, { useState, useEffect } from "react";
import VideoDetailsData from "./VideoDetailsData";
import CloseButton from "../common/CloseButton";
import EditVideoDetailsComponent from "./EditVideoDetailsComponent";
import { VideoDataType } from "./VideoTable";

interface VideoDetailsComponentProps {
  handleShowVideoDetails: () => void;
  videoDetails: VideoDataType | undefined;
  handleShowEditForm: (video: VideoDataType) => void;
  showVideoDetails: boolean
}

const VideoDetailsComponent: React.FC<VideoDetailsComponentProps> = ({
  handleShowVideoDetails,
  videoDetails,
  handleShowEditForm,
  showVideoDetails
}) => {
 console.log("Vid", videoDetails)
  if(!videoDetails){
    return (
      <h2>Video data not found!</h2>
    )
  }
  // const editVideoDetails = {
  //   title: videoDetails.title,
  //   description: videoDetails.description,
  //   status: videoDetails.status,
  //   category: videoDetails.category,
  //   imageSrc: videoDetails.imgSrc
  // }
  // const [showEditForm, setShowEditForm] = useState(false);

  // const handleEditClick = () => {
  //   // handleShowVideoDetails();
  //   setShowEditForm(true);
  // };

  // const handleCloseEditForm = () => {
  //   // handleShowVideoDetails();
  //   setShowEditForm(false);
  // };
  useEffect(() => {
    // Prevent background scrolling when modal is open
    if (showVideoDetails) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup when component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showVideoDetails]);
  return (
    <>
      <>
      <div
            className="fixed top-0 left-0 right-0 bottom-0 z-10 bg-black bg-opacity-70"
          ></div>

        <div
            className="bg-white fixed top-0 right-0 z-20 p-8 w-[400px] lg:w-[400px] overflow-y-scroll h-screen min-h-screen flex overflow-x-hidden flex-col shadow border-r "
        >
          <CloseButton
            right={"2rem"}
            top={"2.1rem"}
            onClick={handleShowVideoDetails}
          />
        
          <VideoDetailsData video={videoDetails} handleEditClick={() => handleShowEditForm(videoDetails)} />
        </div>
      </>
      {/* {showEditForm && (
        <EditVideoDetailsComponent
          showEditVideoDetailsComponent={showEditForm}
          videoDetails={editVideoDetails}
          handleCloseEditForm={handleCloseEditForm}
        />
      )} */}





    </>
  );
};

export default VideoDetailsComponent;
