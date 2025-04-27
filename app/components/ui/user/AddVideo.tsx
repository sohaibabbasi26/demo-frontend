"use client";

import React, { useEffect } from "react";
import UploadVideoForm from "../../forms/UploadVideoForm";
import CloseButton from "../common/CloseButton";
import TextInput from "../common/TextInput";
import AddButton from "../common/AddButton";
import { useState } from "react";
import CustomButton from "../common/Button";
import { Video } from "video-metadata-thumbnails";
import { useAddCustomVideoMutation } from "@/store/thunks/userManagementThunk";

interface UploadVideoComponentProps {
  userId: string | null | undefined;
  showUploadVideoComponenet: boolean;
  handleShowUploadVideo: () => void;
  refetch: () => void;
  blur?: boolean;
}

export const AddVideo: React.FC<UploadVideoComponentProps> = ({
  userId,
  showUploadVideoComponenet,
  handleShowUploadVideo,
  refetch,
  blur = true,
}) => {
  const [videoTitle, setVideoTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState<File>();
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [
    addCustomVideo,
    { error: addCustomVideoError, isLoading: addCustomVideoLoading },
  ] = useAddCustomVideoMutation();
  const [addResponseMessage, setAddResponseMessage] = useState<string>();
  const [errors, setErrors] = useState({
    videoTitle: "",
    description: "",
    file: "",
  });
  useEffect(() => {
    if (addCustomVideoError) {
      console.log("[ERROR]:", addCustomVideoError);
      return;
    }
  }, [addCustomVideoError]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      if (event.target.files) {
        const selectedFile = event.target.files[0];
        console.log("[file]:", selectedFile);
        setFile(selectedFile);

        if (selectedFile.type.startsWith("video/")) {
          const videoFile = selectedFile;

          const videoBlob = videoFile;

          const video = new Video(videoBlob);

          try {
            const thumbnails = await video.getThumbnails({
              quality: 0.6,
              start: 1,
            });

            if (thumbnails && thumbnails.length > 0) {
              const thumbnailBlob = thumbnails[0].blob;

              if (thumbnailBlob) {
                const thumbnailUrl = URL.createObjectURL(thumbnailBlob);
                setImageUrl(thumbnailUrl);

                const thumbnailFile = new File(
                  [thumbnailBlob],
                  "thumbnail.jpg",
                  {
                    type: "image/jpeg",
                  }
                );

                setThumbnail(thumbnailFile);
              } else {
                console.log("Thumbnail blob is null");
              }
            } else {
              console.log("No thumbnails generated.");
            }
          } catch (error) {
            console.error("Error generating thumbnail:", error);
          }
        }
      }
    } catch (err) {
      console.log("[ERROR]:", err);
      return;
    }
  };

  const handleCustomVideoSubmit = async () => {
    setErrors({
      videoTitle: "",
      description: "",
      file: "",
    });

    let formIsValid = true;

    if (!videoTitle) {
      setErrors((prev) => ({ ...prev, videoTitle: "Video title is required." }));
      formIsValid = false;
    }

    if (!description) {
      setErrors((prev) => ({ ...prev, description: "Description is required." }));
      formIsValid = false;
    }

    if (!file) {
      setErrors((prev) => ({ ...prev, file: "Please upload a video file." }));
      formIsValid = false;
    }

    if (!formIsValid) return;
    try {
      if (!videoTitle || !description) {
        console.log("[Didn't find all required fields]");
        return;
      }
      console.log("Video details:", {
        videoTitle,
        description,
        status,
      });

      const formData = new FormData();

      if (thumbnail) {
        formData.append("image", thumbnail);
      }

      formData.append("title", videoTitle);
      formData.append("description", description);
      if (userId) formData.append("userId", userId.toString());

      if (file) {
        formData.append("video", file);
      }

      console.log("[FORM DATA GATHERED]:", formData);
      const response = await addCustomVideo(formData).unwrap();
      console.log("[RESPONSE]:", response);
      if (response?.status === 200) {
        handleShowUploadVideo();
        refetch();
        return;
      
      }
    } catch (err: any) {
      console.log("[ERROR]:", err?.data?.message);
      setAddResponseMessage(err?.data?.message);
      return;
    }
  };

  return (
    <>

        <>
          {blur && (
            <div
              className="fixed top-0 left-0 right-0 bottom-0 z-30"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.7)",
              }}
            ></div>
          )}

          <div
            className="bg-white fixed right-0 z-40 overflow-y-scroll min-h-screen h-screen overflow-x-hidden p-8 w-[400px] lg:w-[400px]  top-0 flex flex-col shadow border-r"
            >
            <CloseButton
              right={"2rem"}
              top={"2.4rem"}
              onClick={handleShowUploadVideo}
            />

            <div>
              <h2 className="text-[20px] text-textBlack font-[700] font-poppins  mb-4">
                Upload Video
              </h2>
              <div
                className="my-4 border  border-black  w-[336px] h-[217px] rounded-[20px] flex justify-center items-center"
                style={{
                  backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="w-full h-full flex justify-center items-center overflow-hidden">
                  <div
                    style={{
                      borderRadius: "50px",
                      backgroundColor: "#000",
                      color: "#fff",
                      fontWeight: "light",
                      textTransform: "none",
                      display: "flex",
                      alignItems: "center",
                      padding: "6px 20px",
                      fontFamily: "poppins",
                      width: "50%",
                    }}
                  >
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleFileChange}
                      id="fileInput"
                      className="hidden"
                    />
                    <button
                      onClick={() =>
                        document.getElementById("fileInput")?.click()
                      }
                      style={{
                        border: "none",
                        backgroundColor: "transparent",
                        color: "#fff",
                        fontSize: "14px",
                        cursor: "pointer",
                        textAlign: "center",
                      }}
                    >
                      {"Choose Video"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="">
                <TextInput
                  label="Video Title"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  variant="outlined"
                  helperText={errors.videoTitle}
                  error={!!errors.videoTitle}
                />
                <TextInput
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  variant="outlined"
                  height="40px"
                  helperText={errors.description}
                  error={!!errors.description}
                />
              </div>

              {addResponseMessage ? (
                <p className="mt-2 text-red-600 text-center">
                  {addResponseMessage}
                </p>
              ) : (
                <></>
              )}

              <CustomButton
                loading={addCustomVideoLoading}
                fill={false}
                border={true}
                textColor="#000"
                onClick={handleCustomVideoSubmit}
              >
                {"Upload"}
              </CustomButton>
            </div>
          </div>
        </>
      
    </>
  );
};
