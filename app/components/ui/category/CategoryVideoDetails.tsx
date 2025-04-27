  "use client";
  import React, { useState, useEffect } from "react";
  import VideoTableRow from "../video/VideoTableRow";
  import GenericTable from "../common/GenericTable";
  import { Typography } from "@mui/material";
  import VideoDetailsComponent from "../video/VideoDetailsComponent";
  import DeleteComponent from "../common/DeleteComponent";
  import { VideoDataType } from "../video/VideoTable";
  import axios from "axios";
  import { useQuery } from "@tanstack/react-query";
  import EditVideoDetailsComponent from "../video/EditVideoDetailsComponent";
  import { useGetVideosByCategoryQuery } from "@/store/thunks/categoryManagementThunks";
  import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

  interface CategoryVideoDetailsProps {
    category: string;
    categoryId: string;
  }

  const CategoryVideoDetails: React.FC<CategoryVideoDetailsProps> = ({
    category,
    categoryId
  }) => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5)
    const [showUploadVideo, setShowUploadVideo] = useState(false);
    const [showVideoDetails, setShowVideoDetails] = useState(false);
    const [selectedVideoData, setSelectedVideoData] = useState<VideoDataType>();
    const [responseMessage, setResponseMessage] = useState<string>();

    const [showDeleteVideo, setShowDeleteVideo] = useState(false);
    const rowsPerPage = 5;


    const { data, error, isLoading, refetch } = useGetVideosByCategoryQuery({
      id: categoryId, page, limit
    });
    useEffect(() => {
      console.log("[CATEGORY]:", category);

      // Explicitly check for `error` type and handle it
      if (error) {
        console.log("[IN ERROR CONDITION]:",error);
        if ((error as FetchBaseQueryError).data) {
          // FetchBaseQueryError has a `data` property
          const fetchError = error as any;
          console.log("[IN ERROR CONDITION]:",fetchError);
          if (fetchError.data) {
            console.log("[IN ERROR CONDITION]:",fetchError);
            setResponseMessage(fetchError.data.message); // If it's a FetchBaseQueryError
          }
          // setResponseMessage((error as FetchBaseQueryError).data.message); 
        }

      }

      console.log("[DATA]:", data);
      
    }, [data, error, categoryId]);


    useEffect(() => {
      console.log("[ERROR]:",error);
    },[error]);



    const handlePageChange = (
      event: React.ChangeEvent<unknown>,
      value: number
    ) => {
      setPage(value);
    };
  console.log(category, "category")
    // const handleShowUploadVideo = () => {
    //   setShowUploadVideo(!showUploadVideo);
    // };
    const handleShowVideoDetails = (row: VideoDataType) => {
      setSelectedVideoData(row);
      setShowVideoDetails(!showVideoDetails);
    };

    const handleShowDeleteVideo = (row: VideoDataType) => {
      setSelectedVideoData(row);
      setShowDeleteVideo(!showDeleteVideo);
    };

      const [showEditForm, setShowEditForm] = useState(false);
    
      const handleShowEditForm = (video?: VideoDataType) => {
        setSelectedVideoData(video);
        setShowVideoDetails(false)
        setShowEditForm(true);
      };
    
      const handleCloseEditForm = () => {
        setShowEditForm(false);
      };


    const headerData = [
      { id: "title", label: "Video Title" },
      { id: "uploadDate", label: "Upload Date" },
      { id: "viewCount", label: "View Count" },
      { id: "likes", label: "Likes" },
      { id: "actions", label: "Actions" },
    ];

    const formatDate = (dateString: string): string => {
      const date = new Date(dateString);
    
      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'short' }); 
      const year = date.getFullYear();
    
      const suffix = (day: number): string => {
        if (day > 3 && day < 21) return `${day}th`;
        switch (day % 10) {
          case 1: return `${day}st`;
          case 2: return `${day}nd`;
          case 3: return `${day}rd`;
          default: return `${day}th`;
        }
      };
    
      return `${suffix(day)} ${month} ${year}`;
    };

    const renderRow = (row: any, index: number) => {
console.log("VOEWS", row?.countOfViews )


return (
      <VideoTableRow
        key={index}
        title={row?.title}
        viewCount={row?.countOfViews}
        uploadDate={formatDate(row?.createdAt)}
        imgSrc={row?.thumbnail}
        likes={row?.countOfLikes}
        
        onView={() => handleShowVideoDetails(row)}
        onDelete={() => handleShowDeleteVideo(row)}
      />)
    };


    if (isLoading) return <div className="text-black">Loading...</div>;
    if (responseMessage) {
      console.log("[RESPONSE MESSAGE]:",responseMessage);
      return <div className="text-black">{responseMessage}</div>;
    }

    return (
      <>
      <div className="flex items-center justify-between  my-5">
              <Typography
                marginTop="4px"

              
                marginLeft="22px"
                sx={{
                  color: "#000",
                  fontWeight: "700",
                  fontSize: "24px",
                  fontFamily: "Poppins",
                }}
              >
                {data?.categoryTitle}
                
              </Typography>
              <Typography
                marginRight="32px"
                
                className="text-black font-poppins font-[400] text-[16px]  cursor-pointer"
              >
                Total Videos: {data?.data?.length}
              </Typography>
            </div>
      


        {showVideoDetails && (
          <VideoDetailsComponent
            videoDetails={selectedVideoData}
            handleShowVideoDetails={() => {
              setShowVideoDetails(!showVideoDetails);
            }}
            handleShowEditForm={handleShowEditForm}
            showVideoDetails={showVideoDetails}
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
              categoryId:selectedVideoData.categoryId,
              imageSrc: selectedVideoData.uri,
              id: selectedVideoData?.videoId,
              thumbnail: selectedVideoData?.thumbnail,
              level: selectedVideoData?.level
            }}
            refetchVideos={refetch}
            handleCloseEditForm={handleCloseEditForm}
            isUser={false}
          />)}
        {showDeleteVideo && (
          <DeleteComponent
            imgSrc={selectedVideoData?.thumbnail}
            text={`Are you sure you want to delete video ${selectedVideoData?.title}?`}
            handleDeleteComponent={() => setShowDeleteVideo(!showDeleteVideo)}
            headingText="Delete Video"
            videoDetails={selectedVideoData}
            refetch={refetch}
          />
        )}
        <GenericTable
          tableName={category}
          headerData={headerData}
          rowsData={data?.data}
          rowsPerPage={rowsPerPage}
          page={page}
          handlePageChange={handlePageChange}
          renderRow={renderRow}
          totalPages={data?.pagination?.totalPages}

        />
      </>
    );
  };

  export default CategoryVideoDetails;
