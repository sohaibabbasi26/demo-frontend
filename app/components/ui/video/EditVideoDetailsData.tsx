import React, { useState, useEffect } from "react";
import ImageContainer from "../common/ImageContainer";
import TextInput from "../common/TextInput";
import RadioButton from "../common/RadioButton";
import Dropdown from "../common/Dropdown";
import CustomButton from "../common/Button";
import { SelectChangeEvent } from "@mui/material";
import { useUpdateVideoDetailsMutation } from "@/store/thunks/videoManagementThunk";
import { useGetCategoriesQuery } from "@/store/thunks/categoryManagementThunks";
import { useEditCustomVideoMutation } from "@/store/thunks/userManagementThunk";
import LevelsDropdown from "../common/LevelsDropdown";
interface EditVideoDetailsProps {
  video: {
    title?: string | undefined;
    description?: string | undefined;
    status?: string | undefined;
    category?: string | undefined;
    thumbnail?: string | undefined;
    customVideoId?: number | undefined;
    userId?: number | undefined;
    id?: number | undefined;
    categoryId?:number;
    customVideoThumbnail?: string | undefined;
    categoryTitle?: string | undefined;
    level: string 
    // thumbnail?: string | undefined;
  };
  isUser: boolean;
  refetchUserEntries?: () => void;
  refetchVideos?: () => void;
  handleSuccess: () => void;
}

const categories = [
  "Select Category",
  "Custom Manifestation Movie",
  "Daily Positive Affirmations",
];

type CategoryData = {
  categoryId: number 
  title: string;
};

const EditVideoDetailsData: React.FC<EditVideoDetailsProps> = ({
  video,
  refetchUserEntries,
  refetchVideos,
  handleSuccess,
  isUser
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | string | null>(video?.categoryId  || null);

  const [category, setCategory] = useState(video?.category);
  const [plan, setplan] = useState(video.status);
  const [videoTitle, setVideoTitle] = useState(video?.title);
  const [description, setDescription] = useState(video?.description);
  
  const [categories, setCategories] = useState<CategoryData[]>();
  const [editResponseMessage, setEditResponseMessage] = useState<string>();
  const [level, setLevel] = useState(video?.level)
   const [validationErrors, setValidationErrors] = useState({
      videoTitle: "",
      description: "",
      category: "",
      level:""
    });
     
    
  console.log("[VIDEO DETAILS IN EDIT COMPONENT]:",video.category);

  const {
    data,
    error: getCategoriesError,
    isLoading: categoriesLoading,
  } = useGetCategoriesQuery({page: 1, limit: 10});


  const [updateVideoDetails, { error, isLoading }] =
    useUpdateVideoDetailsMutation();

    const [editVideoDetails, { error: editCustomVideoError, isLoading: editCustomVideoLoading}] =
    useEditCustomVideoMutation();

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };
  const handleLevelChange = (event: SelectChangeEvent) => {
    setLevel(event.target.value as string);
  };
  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setplan(event.target.value);
  };

  // const handleSubmit = async () => {
  //   try {
  //     if (!video?.id || !category) {
  //       console.log("[Didn't find all required fields]");
  //       return;
  //     }
  //     let errors = {
  //       videoTitle: "",
  //       description: "",
  //       category: "",
  //     };
  
  //     // Check for validation
  //     if (!videoTitle) errors.videoTitle = "Video Title is required";
  //     if (!description) errors.description = "Description is required";
  //     if (!category) errors.category = "Category is required";
  
  //     // If there are errors, don't proceed with submission
  //     if (errors.videoTitle || errors.description || errors.category) {
  //       setValidationErrors(errors);
  //       return;
  //     }
  

  //     let body: any = {};
  //     if (videoTitle) body.title = videoTitle;
  //     if (description) body.description = description;
  //     if (status === "Free") {
  //       body.planId = 2;
  //     } else {
  //       body.planId = 3;
  //     }
  //     console.log("category id", category)
  //     body.categoryId = selectedCategoryId;
  //     const response = await updateVideoDetails({
  //       id: video?.id,
  //       body,
  //     }).unwrap();
  //     if (response?.status === 200) {
  //       handleSuccess();
  //       if (refetchVideos) {
  //         refetchVideos();
  //       }
  //       return;
  //     }
  //   } catch (err: any) {
  //     console.log("[ERROR]:", err?.data?.message);
  //     setEditResponseMessage(err?.data?.message);
  //     return;
  //   }
  // };
  const handleSubmit = async () => {
    try {
      // Clear previous errors
      setValidationErrors({
        videoTitle: "",
        description: "",
        category: "",
        level: ""
      });
  
      let errors = {
        videoTitle: "",
        description: "",
        category: "",
        level:""
      };
  
      // Validate fields
      if (!videoTitle) errors.videoTitle = "Video Title is required";
      if (!description) errors.description = "Description is required";
      if (!selectedCategoryId) errors.category = "Category is required";
       if(!level) errors.level = "Level is required"
  
      // If there are errors, set them and return
      if (errors.videoTitle || errors.description || errors.category) {
        setValidationErrors(errors);
        return;
      }
  
      // Only proceed if we have a video ID
      if (!video?.id) {
        console.log("Video ID is required");
        return;
      }
  
      let body: any = {};
      if (videoTitle) body.title = videoTitle;
      if (description) body.description = description;
      if (plan === "Free") {
body.planId = 1      }
      else if (plan === "Standard") {
        body.planId = 2
      }
      else if (plan === "Premium") {
        body.planId =3
      }
      body.categoryId = selectedCategoryId;
      body.level = level; 
  
      const response = await updateVideoDetails({
        id: video?.id,
        body,
      }).unwrap();
  
      if (response?.status === 200) {
        handleSuccess();
        if (refetchVideos) {
          refetchVideos();
        }
      }
    } catch (err: any) {
      console.log("[ERROR]:", err?.data?.message);
      setEditResponseMessage(err?.data?.message);
    }
  };
  const handleEditCustomVideo = async () => {
    try {
      setValidationErrors({
        videoTitle: "",
        description: "",
        category: "",
        level: ""
      });
  
      let errors = {
        videoTitle: "",
        description: "",
        category: "",
        level:""
      };
  
      if (!videoTitle) errors.videoTitle = "Video Title is required";
      if (!description) errors.description = "Description is required";
          if (errors.videoTitle || errors.description ) {
            setValidationErrors(errors);
            return;
          }
      
      const body: any = {
        custom_manifestation_id: video?.customVideoId,
        userId: video?.userId
      }

      if (videoTitle) body.title = videoTitle;
      if (description) body.description = videoTitle;

      const response = await editVideoDetails({body}).unwrap();
      console.log("[RESPONSE]:",response);

      if (response?.status === 200) {
        if(refetchUserEntries){
          await refetchUserEntries();
        }
        if (refetchVideos) {
          console.log("[REFETCHING VIDEOS]");
          await refetchVideos();
        }
        handleSuccess();
        return;
      }
    } catch (err: any) {
      console.log("[ERROR]:",err);
      setEditResponseMessage(err?.data?.message);
      return;
    }
  }

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

  return (
    <>
      <h2 className="text-[20px] text-textBlack font-[700] font-poppins  mb-4">
        Edit Video Details
      </h2>

      <ImageContainer src={video?.customVideoThumbnail || video?.thumbnail} alt="Video Thumbnail" />
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
          error={!!validationErrors.description}
          helperText={validationErrors.description}
        />

        {plan && <RadioButton value={plan} onChange={handleStatusChange} />}
        {category && ( 
        <Dropdown
        value={selectedCategoryId?.toString() || ""}
        onChange={(e) => setSelectedCategoryId(parseInt(e.target.value))}
        categories={categories || []}
        error={!!validationErrors.category}
          helperText={validationErrors.category}
      />
         )}
      </div>
      {category && (<LevelsDropdown
categories={["basic",  "intermediate", "advanced"]}
          value={level}
          onChange={handleLevelChange}
          error={!!validationErrors.level}
          helperText={validationErrors.level}
        />)}

      <CustomButton
        onClick={isUser ? handleEditCustomVideo : handleSubmit}
        loading={isLoading || editCustomVideoLoading}
        fill={false}
        border={true}
        textColor="#000"
      >
        {"Save Changes"}
      </CustomButton>
    </>
  );
};

export default EditVideoDetailsData;
