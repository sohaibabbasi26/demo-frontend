import React, { useState } from "react";
import ImageContainer from "./ImageContainer";
import CustomButton from "./Button";
import { Typography } from "@mui/material";
import CloseButton from "./CloseButton";
import { useDeleteVideoMutation } from "@/store/thunks/videoManagementThunk";
import { useDeleteCategoryMutation } from "@/store/thunks/categoryManagementThunks";
import { useDeleteCustomVideoMutation } from "@/store/thunks/userManagementThunk";

interface Category {
  categoryId: number;
  title: string;
  banner: string;
  colors: {
    bgColor: string;
    taglineColor: string;
    categoryTitleColor: string;
  };
  tagline: string;
  createdAt: string;
  updatedAt: string;
  countOfViews: number;
  countOfLikes: number;
  countOfVideos: number;
}

interface DeleteComponentProps {
  imgSrc: string | undefined;
  text: string;
  handleDeleteComponent: () => void;
  blur?: boolean;
  headingText: string;
  categoryId?: number | undefined;
  refetch?: Function;
  videoDetails: any;
  isCategoryTable?: boolean;
  isCustomVideo? : boolean
}

const DeleteComponent: React.FC<DeleteComponentProps> = ({
  imgSrc,
  text,
  handleDeleteComponent,
  blur = true,
  headingText,
  categoryId,
  refetch,
  videoDetails,
  isCategoryTable, 
  isCustomVideo
}) => {
  const [deleteCustomVideo, {  isSuccess, isError }] = useDeleteCustomVideoMutation();
    
  const [deleteVideo, { error, isLoading }] = useDeleteVideoMutation();
  const [
    deleteCategory, { error: deleteCategoryError, isLoading: deleteCategoryLoading },] = useDeleteCategoryMutation({});

  const [responseMessage, setResponseMessage] = useState<string>("");
  // const deleteSelectedVideo = async () => {
  //   try {
  //     setResponseMessage("");
  //     console.log("[CATEGORY ID]:", categoryId);
  //     const response = await deleteVideo({
  //       id: videoDetails?.videoId,
  //     }).unwrap();
  //     console.log("[RESPONSE]:", response);

  //     if (response.status === 200) {
  //       if (refetch) {
  //         await refetch();
  //         handleDeleteComponent();
  //       }
  //       return;
  //     }
  //   } catch (err: any) {
  //     console.log("[ERROR]:", err);
  //     setResponseMessage(err?.data?.message);
  //     return;
  //   }
  // };

  // const deleteSelectedCategory = async () => {
  //   try {
  //     setResponseMessage("");
  //     console.log("[CATEGORY ID]:", categoryId);
  //     const response = await deleteCategory({
  //       categoryId: categoryId,
  //     }).unwrap();
  //     console.log("[RESPONSE]:", response);

  //     if (response.status === 200) {
  //       if (refetch) {
  //         refetch();
  //         handleDeleteComponent();
  //       }
  //       return;
  //     }
  //   } catch (err: any) {
  //     console.log("[ERROR]:", err);
  //     setResponseMessage(err?.data?.message);
  //     return;
  //   }
  // };
  const deleteSelectedItem = async () => {
    try {
      setResponseMessage("");
      let response;
  
      if (isCategoryTable) {
        // Delete Category
        response = await deleteCategory({ categoryId }).unwrap();
      } else if (isCustomVideo) {
        // Delete Custom Video
        response = await deleteCustomVideo({ id: videoDetails?.customVideoId, userId: videoDetails?.userId }).unwrap();
      } else {
        // Delete Standard Video
        response = await deleteVideo({ id: videoDetails?.videoId }).unwrap();
      }
  
      console.log("[DELETE RESPONSE]:", response);
  
      if (response.status === 200) {
        if (refetch) await refetch();
        handleDeleteComponent();
      }
    } catch (err: any) {
      console.error("[DELETE ERROR]:", err);
      setResponseMessage(err?.data?.message ?? "Something went wrong");
    }
  };
  
  return (
    <>
      {blur && (
        <div
          className="absolute top-0 left-0 right-0 bottom-0 z-30"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            position: "fixed",
          }}
        ></div>
      )}
      <div
        className="bg-white fixed min-h-screen m-0 right-0 top-0 z-40 p-8 w-[400px] lg:w-[400px] flex flex-col shadow border-r"
      >
        <CloseButton
          right={"2.2rem"}
          top={"2.4rem"}
          onClick={handleDeleteComponent}
        />

        <h2 className="text-[20px] text-textBlack font-[700] font-poppins  mb-4">
          {headingText}
        </h2>
        <ImageContainer
          src={videoDetails?.thumbnail || imgSrc}
          alt="Video Thumbnail"
        />

        <Typography
          variant="body1"
          marginTop={1}
          gutterBottom
          sx={{
            color: "rgb(40,40,40)",
            fontWeight: "400",
            fontSize: "18px",
            textAlign: "center",
          }}
          className="font-poppins"
        >
          {text}
        </Typography>

        {responseMessage ? (
          <p className="mt-4 text-red-600 text-center">{responseMessage}</p>
        ) : (
          <></>
        )}

        <CustomButton
          loading={isLoading}
          // onClick={isCategoryTable ? () => deleteSelectedCategory() : () =>  deleteSelectedVideo()}
          onClick={deleteSelectedItem}
          fill={false}
          border={true}
          textColor="rgb(40,40,40"
        >
          {"Yes"}
        </CustomButton>
      </div>
    </>
  );
};

export default DeleteComponent;
