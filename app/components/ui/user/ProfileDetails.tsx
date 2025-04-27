"use client";
import React, { useState } from "react";
import { Tab, Tabs, Box, Typography, Avatar } from "@mui/material";
import Image from "next/image";
import GeneralDetails from "./GeneralDetails";
import EngagementDetails from "./EngagementDetails";
import CustomVideoDetails from "./CustomVideoDetails";
import { UserDataType } from "./UserTable";
import { formatDate } from "@/app/utils/formatDate";

interface ProfileDetailsProps {
  userData: UserDataType | undefined;
  handleShowUploadVideo: () => void;
  handleShowEditVideo: () => void;
  handleShowDeleteVideo: () => void;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  userData,
  handleShowUploadVideo,
  handleShowEditVideo,
  handleShowDeleteVideo,
}) => {
  const [value, setValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (!userData) {
    return <div>User data not found!</div>;
  }

  return (
    <>
      <h2 className="text-[20px] text-black font-[700] font-poppins  mb-4">
        User Profile
      </h2>

      <div className="w-full flex flex-col items-center">
        <div className="flex flex-col items-center mb-4">
          <Avatar
            alt="Avatar"
            src={userData.profile_picture}
            sx={{ width: 80, height: 80 }}
          />
          <Typography
            sx={{
              marginTop: "10px",
              color: "black",
              fontFamily: "poppins",
              fontWeight: "700",
              fontSize: "18px",
            }}
            className=" mt-10 text-black font-[700] text-[18px] font-poppins "
          >
            {userData.name}
          </Typography>
        </div>

        <Tabs
          value={value}
          onChange={handleTabChange}
          aria-label="profile auto tabs"
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            width: "100%",
            ".MuiTabs-indicator": { display: "none" }, // Hides the underline
          }}
        >
          <Tab
            label="General Details"
            sx={{
              textTransform: "none",
              flex: 1,
              fontFamily: "poppins",
              fontWeight: "400",
              fontSize: "14px",
              color: "#000",
              "&.Mui-selected": {
                backgroundColor: "#F1E9FC",
                color: "#000",
              },
            }}
          />
          <Tab
            label="Engagement"
            sx={{
              textTransform: "none",
              flex: 1,
              fontFamily: "poppins",
              fontWeight: "400",
              fontSize: "14px",
              color: "#000",
              "&.Mui-selected": {
                backgroundColor: "#F1E9FC",
                color: "#000",
              },
            }}
          />
          {userData.planTitle === "Premium" && (
            <Tab
              label="Custom Video"
              sx={{
                textTransform: "none",
                flex: 1,
                fontFamily: "poppins",
                fontWeight: "400",
                fontSize: "14px",
                color: "#000",
                "&.Mui-selected": {
                  backgroundColor: "#F1E9FC",
                  color: "#000",
                },
              }}
            />
          )}
        </Tabs>

        <Box sx={{ marginTop: 4, width: "100%" }}>
          {value === 0 && (
            <GeneralDetails
              email={userData.email}
              dob={formatDate(userData.dob)}
              phone_number={userData.phone_number}
            />
          )}

          {value === 1 && (
            <EngagementDetails
              
              likedVideos={userData.liked_videos}
              subscription={userData.planTitle}
              saved={userData.saved_videos}
              joinDate={formatDate(userData.createdAt)}
            />
          )}

          {value === 2 && (
            <CustomVideoDetails
              customVideoDetails={{
                isCustomVideoAssigned: userData.isCustomVideoAssigned,
                customVideo: userData?.customVideo
              }}
              handleShowUploadVideo={handleShowUploadVideo}
              handleShowEditVideo={handleShowEditVideo}
              handleShowDeleteVideo={handleShowDeleteVideo}
            />
          )}
        </Box>
      </div>
    </>
  );
};

export default ProfileDetails;
