import React, { useState, useEffect } from "react";
import TextInput from "@/app/components/ui/common/TextInput";
import RadioButton from "@/app/components/ui/common/RadioButton";
import Dropdown from "@/app/components/ui/common/Dropdown";
import AddButton from "@/app/components/ui/common/AddButton";
import { SelectChangeEvent } from "@mui/material";
import CustomButton from "../ui/common/Button";
import { useGetCategoriesQuery } from "@/store/thunks/categoryManagementThunks";
import { useAddVideoMutation } from "@/store/thunks/videoManagementThunk";
import { Video } from "video-metadata-thumbnails";
import LevelsDropdown from "../ui/common/LevelsDropdown";

type UploadVideoFormProps = {
  handleSuccess: () => void; // The function prop type'
  refetchVideos: Function;
  isUserFlow?: boolean;
};

const UploadVideoForm: React.FC<UploadVideoFormProps> = ({
  handleSuccess,
  refetchVideos,
  isUserFlow,
}) => {
  const [videoTitle, setVideoTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Free");
  const [category, setCategory] = useState("");
  const [addResponseMessage, setAddResponseMessage] = useState<string>();
  const [editResponseMessage, setEditResponseMessage] = useState<string>();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const { data, error, isLoading } = useGetCategoriesQuery({ page: 1, limit: 10 });
  const [categories, setCategories] = useState<[]>();
  const [thumbnail, setThumbnail] = useState<File>();
  const [level, setLevel] = useState("")

  // State to track validation errors
  const [validationErrors, setValidationErrors] = useState({
    videoTitle: "",
    description: "",
    category: "",
    level: ""
  });

  const [addVideo, { error: addVideoError, isLoading: addVideoLoading }] =
    useAddVideoMutation({});

  useEffect(() => {
    if (error) {
      console.log("[ERROR]:", error);
      return;
    }

    if (data) {
      const refinedCategoriesData = data?.data?.map((category: any) => {
        return {
          categoryId: category?.categoryId,
          title: category?.title,
        };
      });
      setCategories(refinedCategoriesData);
      return;
    }
  }, [data]);

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value);
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const handleLevelChange = (event: SelectChangeEvent) => {
    setLevel(event.target.value as string);
  };
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      console.log("[file]:", file);
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

              const thumbnailFile = new File([thumbnailBlob], "thumbnail.jpg", {
                type: "image/jpeg",
              });

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
  };

  const handleSubmit = async () => {
    let errors = {
      videoTitle: "",
      description: "",
      category: "",
      level: ""
    };

    // Check for validation
    if (!videoTitle) errors.videoTitle = "Video Title is required";
    if (!description) errors.description = "Description is required";
    if (!category) errors.category = "Category is required";
    if (!level) errors.level = "Level is required"

    // If there are errors, don't proceed with submission
    if (errors.videoTitle || errors.description || errors.category || errors.level) {
      setValidationErrors(errors);
      return;
    }

    try {
      console.log("Video details:", {
        videoTitle,
        description,
        status,
        category,
        level
      });

      const formData = new FormData();

      if (thumbnail) {
        formData.append("image", thumbnail);
      }

      formData.append("title", videoTitle);
      formData.append("categoryId", category);
      formData.append("description", description);
      formData.append("level", level)

      if (status === "Free") {
        formData.append("planId", "1");
      }
      else if (status === "Standard") {
        formData.append("planId", "2");
      }
      else if (status === "Premium") {
        formData.append("planId", "3");
      }

      if (file) {
        formData.append("video", file);
      }

      console.log("[FORM DATA GATHERED]:", formData);
      const response = await addVideo(formData).unwrap();
      console.log("[RESPONSE]:", response);
      if (response?.status === 200) {
        handleSuccess();
        refetchVideos();
        return;
      }
    } catch (err: any) {
      console.log("[ERROR]:", err?.data?.message);
      setAddResponseMessage(err?.data?.message);
      return;
    }
  };

  useEffect(() => {
    console.log(videoTitle, description, status, category, thumbnail);
  }, [videoTitle, description, status, category, file, thumbnail]);

  return (
    <>
      <h2 className="text-[20px] text-textBlack font-[700] font-poppins  mb-4">
        Upload Video
      </h2>
      <div
        className="my-4 border  border-black  w-[336px] min-h-[217px] rounded-[20px] flex justify-center items-center"
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
              onClick={() => document.getElementById("fileInput")?.click()}
              style={{
                border: "none",
                backgroundColor: "transparent",
                color: "#fff",
                fontSize: "14px",
                cursor: "pointer",
                textAlign: "center",
              }}
            >
              {"Choose Banner"}
            </button>
          </div>
        </div>
      </div>

      <div className="my-3">
        <TextInput
          label="Video Title"
          value={videoTitle}
          onChange={(e) => setVideoTitle(e.target.value)}
          variant="outlined"
          error={!!validationErrors.videoTitle}
          helperText={validationErrors.videoTitle}
        />
        <TextInput
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          variant="outlined"
          height="40px"
          error={!!validationErrors.description}
          helperText={validationErrors.description}
        />
        <RadioButton value={status} onChange={handleStatusChange} />
        <Dropdown
          categories={categories || []}
          value={category}
          onChange={handleCategoryChange}
          error={!!validationErrors.category}
          helperText={validationErrors.category}
        />
        <LevelsDropdown
          categories={["basic", "intermediate", "advanced"]}
          value={level}
          onChange={handleLevelChange}
          error={!!validationErrors.level}
          helperText={validationErrors.level}
        />

        {addResponseMessage ? (
          <p className="mt-4 text-red-600 text-center">{addResponseMessage}</p>
        ) : (
          <></>
        )}

        <CustomButton
          onClick={handleSubmit}
          loading={addVideoLoading}
          fill={false}
          border={true}
          textColor="#000"
        >
          {"Upload"}
        </CustomButton>
      </div>
    </>
  );
};

export default UploadVideoForm;
