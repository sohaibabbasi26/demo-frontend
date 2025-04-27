"use client";
import React from "react";
import TextField from "../common/TextField";
import ImageContainer from "../common/ImageContainer";
import IconButton from "../common/IconButton";
import EditVideoDetailsComponent from "./EditVideoDetailsComponent";
import { VideoDataType } from "./VideoTable";

interface VideoDetailsProps {
  video: VideoDataType | undefined;
  handleEditClick: () => void;
}

const VideoDetailsData: React.FC<VideoDetailsProps> = ({
  video,
  handleEditClick,
}) => {
  console.log("DEtails", video);
  if (!video) {
    return <h2>Video data not found!</h2>;
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    console.log("[VIDEO DETAILS COMPONENT]:", video?.thumbnail);

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    const suffix = (day: number): string => {
      if (day > 3 && day < 21) return `${day}th`;
      switch (day % 10) {
        case 1:
          return `${day}st`;
        case 2:
          return `${day}nd`;
        case 3:
          return `${day}rd`;
        default:
          return `${day}th`;
      }
    };

    return `${suffix(day)} ${month} ${year}`;
  };

  return (
    <>
      <h2 className="text-lg   text-black font-semibold  mb-4">
        Video Details
      </h2>

      <ImageContainer src={video?.thumbnail} alt="Video Thumbnail" /> 
      <div className="my-4">
        <TextField label="Video Title" text={video.title} />
        <TextField label="Description" text={video.description} />
        <TextField label="Duration" text={video.duration} />
        <TextField label="Upload Date" text={formatDate(video.createdAt)} />
        <TextField
          label="Status"
          text={video.planTitle}
          color={
            video.planTitle === "Free"
              ? "#00AB44"
              : video.planTitle === "Premium"
              ? "#895CAB"
              : "#5365E5"
          }
        />
        <TextField
          label="Category"
          text={video.categoryTitle || video.category}
        />
           <TextField
          label="Level"
          text={video.level}
        />
        <TextField
          label="Views Count"
          text={String(video?.countOfViews)}
        />
        <TextField
          label="Likes"
          text={String(video?.countOfLikes)}
        />

        <TextField
          label="Saved"
          text={String(video?.countOfSaves)}
        />
      </div>

      <IconButton
        bottom="5%"
        width="100%"
        text="Edit Video"
        iconPath="/svg/upload-icon-dark.svg"
        onClick={handleEditClick}
      />
    </>
  );
};

export default VideoDetailsData;
