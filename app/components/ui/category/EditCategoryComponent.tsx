"use client";

import React, { useEffect } from "react";
import CategoryForm from "../../forms/CategoryForm";
import CloseButton from "../common/CloseButton";

interface EditCategoryComponentProps {
  showEditCategoryComponent: boolean;
  handleShowEditCategory: () => void;
  refetch: Function;
  categoryTitle: string | undefined;
  categoryId: number | undefined;
  tagLine: string | undefined;
  imageSrc: string | undefined;
  colors: any;
  updateCategoriesLocally: Function;
}

export const EditCategoryComponent: React.FC<EditCategoryComponentProps> = ({
  showEditCategoryComponent,
  handleShowEditCategory,
  refetch,
  categoryTitle = "",
  categoryId,
  tagLine,
  imageSrc,
  colors,
  updateCategoriesLocally
}) => {
  const data = {
    categoryId: categoryId,
    title: categoryTitle,
    tagline: tagLine || "",
    imageSrc: imageSrc || "",
    colors
  };

  useEffect(() => {
    // Prevent background scrolling when modal is open
    if (showEditCategoryComponent) {
      document.body.classList.add("overflow-x-hidden");
    } else {
      document.body.classList.remove("overflow-x-hidden");
    }

    // Cleanup when component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showEditCategoryComponent]);

  return (
    <>
      {showEditCategoryComponent && (
        <>
          {/* Overlay Background */}
          <div
            className="fixed top-0 left-0 right-0 bottom-0 z-10 bg-black bg-opacity-70"
          ></div>

          {/* Modal */}
          <div
            className="bg-white absolute top-0 right-0 z-10 p-8 w-[400px] lg:w-[400px] min-h-screen flex flex-col shadow border-r"
            >
            <CloseButton
              right={"2rem"}
              top={"2.4rem"}
              onClick={handleShowEditCategory}
            />

            <CategoryForm
              updateCategoriesLocally={updateCategoriesLocally}
              isEditMode={true}
              categoryData={data}
              onSubmit={(categoryTitle, tagline) => {
                console.log("Category submitted", categoryTitle, tagline);
              }}
              onSuccess={handleShowEditCategory}
              refetch={refetch}
            />
          </div>
        </>
      )}
    </>
  );
};
