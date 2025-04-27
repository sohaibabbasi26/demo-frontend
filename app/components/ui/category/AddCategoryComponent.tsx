"use client";

import React from "react";
import CloseButton from "../common/CloseButton";
import CategoryForm from "../../forms/CategoryForm";
interface AddCategoryComponentProps {
  showAddCategoryComponent: boolean;
  handleShowAddCategory: () => void;
  updateCategoriesLocally: Function
  refetch: Function
}

export const AddCategoryComponent: React.FC<AddCategoryComponentProps> = ({
  showAddCategoryComponent,
  handleShowAddCategory,
  updateCategoriesLocally,
  refetch
}) => {
  return (
    <>
      {showAddCategoryComponent && (
        <>
          <div
            className="absolute top-0 left-0 right-0 bottom-0 z-0"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              position: "fixed",
              zIndex: 5,
            }}
          ></div>

          <div
            className="bg-white absolute top-0 right-0 z-10 p-8 w-[400px] lg:w-[400px] min-h-screen flex flex-col shadow border-r"
            style={{ zIndex: 10 }}
          >
            <CloseButton
              right={"2rem"}
              top={"2.4rem"}
              onClick={handleShowAddCategory}
            />

            <CategoryForm
              updateCategoriesLocally={updateCategoriesLocally}
              isEditMode={false}
              onSubmit={(categoryTitle, tagline) => {
                console.log("Category submitted", categoryTitle, tagline);
              }}
              onSuccess={handleShowAddCategory}
              refetch={refetch}
            />
          </div>
        </>
      )}
    </>
  );
};
