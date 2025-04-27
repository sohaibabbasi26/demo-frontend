"use client";
import { Typography } from "@mui/material";
import React from "react";
import CustomButton from "../common/Button";
// import { UploadVideoComponent } from "../video/UploadVideoComponent";
import IconButton from "../common/IconButton";

interface CustomVideoDetailsProps {
  customVideoDetails: any;
  handleShowUploadVideo: () => void;
  handleShowEditVideo: () => void;
  handleShowDeleteVideo: () => void;
}

const CustomVideoDetails: React.FC<CustomVideoDetailsProps> = ({
  customVideoDetails,
  handleShowUploadVideo,
  handleShowEditVideo,
  handleShowDeleteVideo
}) => {
  console.log("details", customVideoDetails)
  return (
    <>
      <div className="text-black">
        <div className="h-[25vh]">
          <Typography sx={{fontWeight:"500", fontSize: "16px", fontFamily: "poppins"}}>
            Custom Manifestation Movie
          </Typography>
          <Typography
            sx={{ fontWeight: "bold", color: "#895CAB", fontFamily: "poppins" }}
            variant="body1"
          >
            {/* {customVideoDetails?.charAt(0).toUpperCase() +
              customVideoDetails?.slice(1)} */}
              {customVideoDetails?.isCustomVideoAssigned === true ? "Uploaded" : "Pending"}
          </Typography>
        </div>
        {customVideoDetails?.isCustomVideoAssigned === false ?  (
          <CustomButton
            loading={false}
            onClick={handleShowUploadVideo}
            fill={false}
            border={true}
            textColor="#000"
          >
            {"Upload"}
          </CustomButton>
        ) : (
          <>
            <IconButton
             width="100%"
              text="Edit Video"
              iconPath="/svg/upload-icon-dark.svg"
              onClick={handleShowEditVideo}
              borderRad="12px"
            />
            <CustomButton
            loading={false}
            onClick={handleShowDeleteVideo}
            bgColor="#CD0000" textColor="white">{"Delete"}</CustomButton>
          </>
        )}
      </div>
    </>
  );
};

export default CustomVideoDetails;
