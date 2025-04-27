"use client";

import React, { useState, useEffect } from "react";
import ProfileDetails from "./ProfileDetails";
import CloseButton from "../common/CloseButton";
import { UserDataType } from "./UserTable";
import { AddVideo } from "./AddVideo";
import EditVideoDetailsComponent from "../video/EditVideoDetailsComponent";
import DeleteComponent from "../common/DeleteComponent";

interface UserProfileProps {
  handleShowUserDetails: () => void;
  userDetails: UserDataType | undefined;
  refetchUserEntries: () => void;
  showUserDetails : boolean
}

const video = {
  title: "Mental Training",
  description: "Lorem ipsum dolor sit amet consectetur.",
  imageSrc: "/images/placeholder.png",
};

const UserProfile: React.FC<UserProfileProps> = ({
  handleShowUserDetails,
  userDetails,
  refetchUserEntries,
  showUserDetails
}) => {
  const [showUploadVideo, setShowUploadVideo] = useState(false);
  const [showEditVideo, setShowEditVideo] = useState(false);
  const [showDeleteVideo, setShowDeleteVideo] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const handleShowUploadVideo = () => {
    setShowUploadVideo(!showUploadVideo);
  };
  const handleShowEditVideo = () => {
   
    setShowEditVideo(true);
  };

  const handleShowDeleteVideo = () => {
    setShowDeleteVideo(!showDeleteVideo);
  };

  console.log("[user details in user profile]:", userDetails);
    useEffect(() => {
      if (showUserDetails) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }
  
      return () => {
        document.body.classList.remove("overflow-hidden");
      };
    }, [showUserDetails]);

  let dataToBeEdited: any = {};

  dataToBeEdited.title = userDetails?.customVideoTitle;
  dataToBeEdited.description = userDetails?.customVideoDescription;
  dataToBeEdited.customVideoId = userDetails?.customVideoId;
  dataToBeEdited.userId = userDetails?.userId;
  dataToBeEdited.customVideoThumbnail = userDetails?.customVideoThumbnail;

  console.log("[DATA TO BE EDITED]:", dataToBeEdited);

  return (
    <>
      <>
        <div
         className="fixed top-0 left-0 right-0 bottom-0 z-10 bg-black bg-opacity-70"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          }}
        ></div>

        <div
            className="bg-white fixed top-0 right-0 z-20 p-8 w-[400px] lg:w-[400px] overflow-y-scroll h-screen min-h-screen flex overflow-x-hidden flex-col shadow border-r "
        >
          <CloseButton
            right={"2rem"}
            top={"2.4rem"}
            onClick={handleShowUserDetails}
          />

          <ProfileDetails
            userData={userDetails}
            handleShowUploadVideo={handleShowUploadVideo}
            handleShowEditVideo={handleShowEditVideo}
            handleShowDeleteVideo={handleShowDeleteVideo}
          />
        </div>
      </>
      {showUploadVideo && (
        <AddVideo
          userId={userDetails?.userId}
          showUploadVideoComponenet={showUploadVideo}
          handleShowUploadVideo={() => {
            handleShowUploadVideo();
            handleShowUserDetails();
          }}
          refetch={refetchUserEntries}
          blur={false}
        />
      )}

      {showEditVideo && (
        <EditVideoDetailsComponent
          videoDetails={dataToBeEdited}
          showEditVideoDetailsComponent={showEditVideo}
          handleCloseEditForm={() => {
            handleShowEditVideo();
            handleShowUserDetails();
          }}
          isUser
          refetchUserEntries={refetchUserEntries}
        />
      )}

      {showDeleteVideo && (
        <DeleteComponent
          blur={false}
          imgSrc={userDetails?.customVideoThumbnail}
          text={`Are you sure you want to delete video ${userDetails?.customVideoTitle}`}
          handleDeleteComponent={() => {
            handleShowDeleteVideo();
            handleShowUserDetails();
          }}
          isCustomVideo = {true}
          headingText="Delete Video"
          videoDetails={dataToBeEdited}
          refetch={refetchUserEntries}
        />
      )}
    </>
  );
};

export default UserProfile;
