"use client";

import React, { useState, useEffect } from "react";
import GenericTable from "../common/GenericTable";
import VideoTableRow from "./VideoTableRow";
import IconButton from "../common/IconButton";
import { UploadVideoComponent } from "./UploadVideoComponent";
import VideoDetailsComponent from "./VideoDetailsComponent";
import DeleteComponent from "../common/DeleteComponent";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Typography } from "@mui/material";
import EditVideoDetailsComponent from "./EditVideoDetailsComponent";
import { useGetVideosQuery } from "../../../../store/thunks/videoManagementThunk";
import CircularProgress from "@mui/material/CircularProgress";

export interface VideoDataType {
  title: string;
  description: string;
  duration: string;
  createdAt: string;
  planTitle: "Free" | "Premium";
  category: string;
  views: number;
  likes: number;
  saves: number;
  countOfViews: number;
  countOfLikes: number;
  countOfSaves: number;
  uri: string;
  categoryTitle: string;
  videoId: number;
  thumbnail: string;
  categoryId: number;
  level: string;
}

const VideoTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const { data, error, isLoading, refetch } = useGetVideosQuery({page, limit: rowsPerPage});
  const [selectedVideoData, setSelectedVideoData] = useState<VideoDataType>();
  const [showUploadVideo, setShowUploadVideo] = useState(false);
  const [showVideoDetails, setShowVideoDetails] = useState(false);
  const [showDeleteVideo, setShowDeleteVideo] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    console.log("[DATA]:", data);

    if (error) {
      if ("data" in error) {
        const fetchError = error as { data: { message: string } };
        console.log("[ERROR WHILE FETCHING VIDEOS]:", fetchError);
        setResponseMessage(fetchError.data?.message || "An error occurred.");
      } else {
        console.log("[ERROR]:", error);
        setResponseMessage("An unknown error occurred.");
      }
    }
  }, [data, error]);

  useEffect(() => {
    refetch();
  }, []);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleShowUploadVideo = () => {
    setShowUploadVideo(!showUploadVideo);
  };
  const handleShowVideoDetails = (row: VideoDataType) => {
    console.log("[ROW]:", row);
    setSelectedVideoData(row);
    setShowVideoDetails(!showVideoDetails);
  };

  const handleShowDeleteVideo = (row: VideoDataType) => {
    setSelectedVideoData(row);
    setShowDeleteVideo(!showDeleteVideo);
  };

  const headerData = [
    { id: "title", label: "Video Title" },
    { id: "uploadDate", label: "Upload Date" },
    { id: "category", label: "Category" },
    { id: "status", label: "Status" },
    { id: "likes", label: "Likes" },
    { id: "actions", label: "Actions" },
  ];

  const fetchVideos = async () => {
    const response = await axios.get("/api/videos");
    console.log("res", response.data);
    return response.data;
  };

  const [showEditForm, setShowEditForm] = useState(false);

  const handleShowEditForm = (video?: VideoDataType) => {
    setSelectedVideoData(video);
    setShowVideoDetails(false);
    setShowEditForm(true);
  };

  const handleCloseEditForm = () => {
    setShowEditForm(false);
  };

  if (isLoading)
    return (
      <div className="flex h-[60vh] w-full justify-center items-center my-15">
        <CircularProgress size={40} />
      </div>
    );

  // if (responseMessage)
  //   return (
  //     <div className=" text-black flex h-full w-full justify-center items-center my-8">
  //       {responseMessage}
  //     </div>
  //   );

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

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

  const renderRow = (row: any, index: number) => {
    console.log("[ITEM.PLANTITLE]:", row.planTitle);
    return (
      <VideoTableRow
      key={index}
      title={row.title}
      uploadDate={formatDate(row?.createdAt)}
      category={row.category}
      status={row.planTitle}
      imgSrc={row.thumbnail}
      likes={row.countOfLikes}
      onView={() => handleShowVideoDetails(row)}
      onDelete={() => handleShowDeleteVideo(row)}
    />
    )
  }

  console.log("[CATEGORY ID IN MAIN]:", selectedVideoData?.category);

  return (
    <>
      <div className="flex items-center justify-between my-5">
        <Typography
          marginTop="4px"
          marginLeft="22px"
          sx={{
            color: "#000",
            fontWeight: "700",
            fontSize: "24px",
            fontFamily: "poppins",
          }}
          className="font-poppins"
        >
          Videos
        </Typography>
        <IconButton
          text="Upload New Video"
          iconPath="/svg/plus-icon.svg"
          onClick={handleShowUploadVideo}
        />
      </div>

      {showUploadVideo && (
        <UploadVideoComponent
          showUploadVideoComponenet={showUploadVideo}
          handleShowUploadVideo={handleShowUploadVideo}
          refetchVideos={refetch}
        />
      )}
      {showVideoDetails && (
        <VideoDetailsComponent
          videoDetails={selectedVideoData}
          handleShowVideoDetails={() => {
            setShowVideoDetails(!showVideoDetails);
          }}
          showVideoDetails ={showVideoDetails}
          handleShowEditForm={handleShowEditForm}
        />
      )}

      {showEditForm && selectedVideoData && (
        <EditVideoDetailsComponent
          showEditVideoDetailsComponent={showEditForm}
          videoDetails={{
            title: selectedVideoData.title,
            description: selectedVideoData.description,
            status: selectedVideoData.planTitle,
            category: selectedVideoData.category,
            imageSrc: selectedVideoData.uri,
            id: selectedVideoData?.videoId,
            categoryId : selectedVideoData?.categoryId,
            thumbnail: selectedVideoData?.thumbnail,
            categoryTitle: selectedVideoData?.categoryTitle,
            level: selectedVideoData?.level
          }}
          handleCloseEditForm={handleCloseEditForm}
          isUser={false}
          refetchVideos={refetch}
        />
      )}
      {showDeleteVideo && (
        <DeleteComponent
          imgSrc="/images/placeholder.png"
          text={`Are you sure you want to delete video ${selectedVideoData?.title}`}
          handleDeleteComponent={() => setShowDeleteVideo(!showDeleteVideo)}
          headingText="Delete Video"
          videoDetails={selectedVideoData}
          categoryId={selectedVideoData?.categoryId}
          refetch={refetch}
        />
      )}

      {responseMessage ? (
        <div className=" text-black flex h-full w-full justify-center items-center my-8">
          {responseMessage}
        </div>
      ) : (
        <GenericTable
        tableName={"Videos"}
        headerData={headerData}
        rowsData={data?.videos || []}
        rowsPerPage={rowsPerPage}
        page={page}
        handlePageChange={handlePageChange}
        renderRow={renderRow}
        hasPagination={true}
        totalPages={data?.pagination?.totalPages}
      />
      
      )}
    </>
  );
};

export default VideoTable;
