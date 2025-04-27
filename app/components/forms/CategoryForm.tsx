"use client";

import React, { useState, useEffect } from "react";
import TextInput from "@/app/components/ui/common/TextInput"; // Path to TextInput component
import AddButton from "@/app/components/ui/common/AddButton";
import CustomButton from "../ui/common/Button";
import ColorBox from "../ui/common/ColorBox";
import {
  useAddCategoryMutation,
  useEditCategoryMutation,
} from "@/store/thunks/categoryManagementThunks";
import { json } from "stream/consumers";

interface CategoryFormProps {
  updateCategoriesLocally: Function;
  isEditMode: boolean;
  categoryData?: {
    title: string;
    tagline: string;
    imageSrc: string;
    categoryId?: number;
    colors: {
      bgColor: string  ;
      taglineColor: string ;
      categoryTitleColor: string ;
    };
  };
  refetch: Function;
  onSubmit: (
    categoryTitle: string,
    tagline: string,
    colors: {
      bgColor: string ;
      taglineColor: string ;
      categoryTitleColor: string ;
    }
  ) => void;
  onSuccess: Function;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  updateCategoriesLocally,
  isEditMode,
  categoryData,
  onSubmit,
  onSuccess,
  refetch,
}) => {
  console.log("colors", categoryData?.colors)
  console.log("bgcolor", categoryData?.colors )
  // const parsedColors = JSON.parse(categoryData?.colors)
  let parsedColors;
if (typeof categoryData?.colors === 'string') {
  parsedColors = JSON.parse(categoryData.colors);
} else {
  parsedColors = categoryData?.colors;
}
  console.log("parsed", parsedColors)

  const [categoryTitle, setCategoryTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [openedColorPicker, setOpenedColorPicker] = useState<string | null>(
    null
  );
  const [file, setFile] = useState<File | null>(null);
  const [colors, setColors] = useState({
    bgColor: categoryData?.colors?.bgColor || "#fefef",
    taglineColor: "#FF0000",
    categoryTitleColor: "#FF0000",
  });
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [addCategory, { data, error, isLoading }] = useAddCategoryMutation({});
  const [
    editCategory,
    {
      data: editCategoryData,
      error: editCategoryError,
      isLoading: editCategoryLoading,
    },
  ] = useEditCategoryMutation({});
  const [addResponseMessage, setAddResponseMessage] = useState<string>();
  const [editResponseMessage, setEditResponseMessage] = useState<string>();
  const [validationErrors, setValidationErrors] = useState({
    categoryTitle: "",
    tagline: "",
    bgColor: "",
    categoryTitleColor: "",
    taglineColor: "",
    image: "",
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);

      setImageUrl(URL.createObjectURL(selectedFile));
    }
  };

  useEffect(() => {
    if (isEditMode && categoryData) {
      setCategoryTitle(categoryData.title);
      setTagline(categoryData.tagline);
      setImageUrl(categoryData.imageSrc);
    }
  }, [isEditMode, categoryData]);

 

  const handleColorBoxClick = (id: string) => {
    setOpenedColorPicker((prev) => (prev === id ? null : id));
  };

  const handleColorChange = (colorKey: string, colorValue: string) => {
    setColors((prev) => ({ ...prev, [colorKey]: colorValue }));
  };

  const validateForm = () => {
    const errors = {
      categoryTitle: "",
      tagline: "",
      bgColor: "",
      categoryTitleColor: "",
      taglineColor: "",
      image: "",
    };

    if (!categoryTitle) errors.categoryTitle = "Category title is required";
    if (!tagline) errors.tagline = "Tagline is required";
    if (!colors.bgColor) errors.bgColor = "Background color is required";
    if (!colors.categoryTitleColor) errors.categoryTitleColor = "Title color is required";
    if (!colors.taglineColor) errors.taglineColor = "Tagline color is required";
    if (!isEditMode && !file) errors.image = "Banner image is required";

    setValidationErrors(errors);
    
    // Return true if no errors
    return !Object.values(errors).some(error => error !== "");
  };




  
  const handleSubmit = async () => {
    setValidationErrors({
      categoryTitle: "",
      tagline: "",
      bgColor: "",
      categoryTitleColor: "",
      taglineColor: "",
      image: "",
    });

    if (!validateForm()) {
      return;
    }
    try {
      if (!categoryTitle || !tagline || !colors) {
        console.log("[Didn't get all the fields]");
        return;
      }

      setAddResponseMessage("");
      onSubmit(categoryTitle, tagline, colors);

      const formData = new FormData();
      formData.append("title", categoryTitle);
      formData.append("tagline", tagline);
      formData.append("colors", JSON.stringify(colors));

      if (file) {
        formData.append("file", file);
      }

      const response = await addCategory(formData).unwrap();
      console.log("[RESPONSE OF ADDING A CATEGORY]:", response);
      if (response?.status === 200) {
        const optimisticCategory = {
          categoryId: Math.random(),
          title: categoryTitle,
          tagline,
          imageSrc: imageUrl || "",
          colors,
          createdAt: new Date().toISOString(),
          countOfLikes: 0,
          countOfViews: 0,
          countOfVideos: 0,
        };

        updateCategoriesLocally(optimisticCategory);
        refetch();
        onSuccess();
      }
    } catch (err: any) {
      console.log("[ERROR]:", err);
      setAddResponseMessage(err?.data?.message);
      return;
    }
  };

  const handleEditSubmit = async () => {
    setValidationErrors({
      categoryTitle: "",
      tagline: "",
      bgColor: "",
      categoryTitleColor: "",
      taglineColor: "",
      image: "",
    });

    if (!validateForm()) {
      return;
    }
    try {
      setEditResponseMessage("");
      const formData = new FormData();
      if (categoryTitle) formData.append("title", categoryTitle);
      if (tagline) formData.append("tagline", tagline);
      if (colors) formData.append("colors", JSON.stringify(colors));

      if (file) formData.append("file", file);
      if (categoryData && categoryData?.categoryId)
        formData.append("categoryId", categoryData?.categoryId.toString());

      const response = await editCategory(formData).unwrap();
      console.log("[RESPONSE OF EDITING A CATEGORY]:", response);
      if (response?.status === 200) {
        refetch();
        onSuccess();
      }
    } catch (err: any) {
      console.log("[ERROR]:", err);
      setEditResponseMessage(err?.data?.message);
      return;
    }
  };

  return (
    <>
      <h2 className="text-[20px] text-textBlack font-[700] font-poppins  mb-4">
        {isEditMode ? "Edit Category" : "Add New Category"}
      </h2>
      <div
        className="my-4 border  border-black  w-[336px] min-h-[217px] rounded-[20px] flex justify-center items-center"
        style={{
          backgroundImage: `url(${imageUrl ?? categoryData?.imageSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {isEditMode ? (
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
                accept="image/*"
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
                {"Edit Banner"}
              </button>
            </div>
          </div>
        ) : (
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
                accept="image/*"
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
        )}
      </div>
      <div className="my-5">
        <ColorBox
          title="Background Color"
          color={parsedColors?.bgColor  || "#000"}
          id="colorBox-1"
          openedColorPicker={openedColorPicker}
          onClick={handleColorBoxClick}
          onColorChange={(color) => handleColorChange("bgColor", color)}
        />
       
        <div className="my-3">
          <TextInput
            label="Category Title"
            value={categoryTitle}
            onChange={(e) => setCategoryTitle(e.target.value)}
            variant="outlined"
            error={!!validationErrors.categoryTitle}
            helperText={validationErrors.categoryTitle}
          />
        </div>

        <ColorBox
          title="Category Title Color"
          color={parsedColors?.categoryTitleColor  || "#000"}
          id="colorBox-2"
          openedColorPicker={openedColorPicker}
          onClick={handleColorBoxClick}
          onColorChange={(color) =>
            handleColorChange("categoryTitleColor", color)
          }
        />
        
        <div className="my-3">
          <TextInput
            label="Tagline"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            variant="outlined"
            error={!!validationErrors.tagline}
            helperText={validationErrors.tagline}
          />
        </div>
        <ColorBox
          title="Tagline Color"
          color={parsedColors?.taglineColor || "#000"}
          id="colorBox-3"
          openedColorPicker={openedColorPicker}
          onClick={handleColorBoxClick}
          onColorChange={(color) => handleColorChange("taglineColor", color)}
        />
         

        {addResponseMessage ? (
          <p className="mt-4 text-red-600 text-center">{addResponseMessage}</p>
        ) : (
          <></>
        )}

        {editResponseMessage ? (
          <p className="mt-4 text-red-600 text-center">{editResponseMessage}</p>
        ) : (
          <></>
        )}

        <CustomButton
          fill={false}
          border={true}
          textColor="#000"
          onClick={isEditMode ? () => handleEditSubmit() : () => handleSubmit()}
          loading={isLoading || editCategoryLoading}
        >
          {isEditMode ? "Save Category" : "Add Category"}
        </CustomButton>
      </div>
    </>
  );
};

export default CategoryForm;
