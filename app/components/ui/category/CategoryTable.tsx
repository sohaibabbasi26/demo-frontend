"use client";

import React, { useState } from "react";
import IconButton from "../common/IconButton";
import GenericTable from "../common/GenericTable";
import CategoryTableRow from "./CategoryTableRow";
import { useRouter } from "next/navigation";
import DeleteComponent from "../common/DeleteComponent";
import { AddCategoryComponent } from "./AddCategoryComponent";
import { EditCategoryComponent } from "./EditCategoryComponent";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Typography } from "@mui/material";
import { useGetCategoriesQuery, useDeleteCategoryMutation } from "@/store/thunks/categoryManagementThunks";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { number } from "yup";
// import useDeleteCategoryMutation

export interface Category {
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

interface CategoryTableProps {
  data: Category[];
}

const CategoryTable = () => {
 

  const [deleteCategory, {error: deleteCategoryError, isLoading: deleteCategoryLoading}] = useDeleteCategoryMutation({});

  const router = useRouter();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5)
  const [showAddCategory, setShowAddCategory] = useState(false);
  const { data, error, isLoading, refetch } = useGetCategoriesQuery({page , limit});
  const [showEditCategory, setShowEditCategory] = useState(false);
  const [showDeleteCategory, setShowDeleteCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [responseMessage, setResponseMessage] = useState("");

  const rowsPerPage = 5;
  useEffect(() => {
    refetch(); // This will trigger the API call when the component mounts
  }, [refetch]); 
  useEffect(() => {
    if (data && data.data) {
      setCategories(data.data);
      console.log("[CATEGORIES]:", categories); // Directly assign the categories array from data.data
    }

    if (error) {
      console.log("[ERROR WHILE FETCHING CATEGORIES]:", error);
      if (error) {
        if ("data" in error) {
          const fetchError = error as { data: { message: string } };
          console.log("[ERROR WHILE FETCHING VIDEOS]:", fetchError);
          setResponseMessage(fetchError?.data?.message || "An error occurred.");
        } 
      }
    }
  }, [data, error]);

  // const updateCategoriesLocally = (newCategory: any) => {
  //   // Assuming `categories` is stored in state, add new category optimistically
  //   setCategories((prevCategories: any) => [...prevCategories, newCategory]);
  // };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleShowCategoryVideoDetails = (categoryName: string) => {
    router.push(`/category-management/${categoryName}/videos`);
  };
  const handleShowAddCategory = () => {
    setShowAddCategory(!showAddCategory);
  };

  const handleShowEditCategory = (row: Category) => {
    setShowEditCategory(!showEditCategory);

    setSelectedCategory(row);
  };

  const handleShowDeleteCategory = (row: Category) => {
    setShowDeleteCategory(!showDeleteCategory);
    setSelectedCategory(row);
  };

  const headerData = [
    { id: "title", label: "Category Title" },
    { id: "numberOfVideos", label: "No. of Videos" },
    { id: "viewCount", label: "View Count" },
    { id: "likes", label: "Likes" },
    { id: "actions", label: "Actions" },
  ];

  const fetchCategories = async () => {
    const response = await axios.get("/api/categories");
    return response.data;
  };

  const renderRow = (row: any, index: number) => (
    <CategoryTableRow
      key={index}
      categoryId={row?.categoryId}
      title={row?.title}
      numberOfVideos={row?.countOfVideos}
      videoCount={row?.countOfViews}
      likes={row?.countOfLikes}
      onView={() => handleShowCategoryVideoDetails(row?.categoryId)}
      onDelete={() => {
        console.log("[CATEGORY ID]:", row?.categoryId);
        handleShowDeleteCategory(row);
      }}
      onEdit={() => handleShowEditCategory(row)}
    />
  );

  const updateCategoriesLocally = (newCategory: any) => {
    setCategories((prevCategories: any) => [...prevCategories, newCategory]);
  };

  useEffect(() => {
    console.log("[DATA.DATA]:", data?.data);
  }, [data]);

  if (isLoading) return (
    <div className="flex h-[60vh] w-full justify-center items-center my-15">
    <CircularProgress size={40} />
  </div>
  );

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
          Categories
        </Typography>
        <IconButton
          text="Add New Category"
          iconPath="/svg/plus-icon.svg"
          onClick={handleShowAddCategory}
        />
      </div>
      {showAddCategory && (
        <AddCategoryComponent
          updateCategoriesLocally={updateCategoriesLocally}
          showAddCategoryComponent={showAddCategory}
          handleShowAddCategory={handleShowAddCategory}
          refetch={refetch}
        />
      )}
      {showEditCategory && (
        <EditCategoryComponent
          categoryId={selectedCategory?.categoryId}
          categoryTitle={selectedCategory?.title}
          tagLine={selectedCategory?.tagline}
          imageSrc={selectedCategory?.banner}
          showEditCategoryComponent={showEditCategory}
          handleShowEditCategory={() => setShowEditCategory(!showEditCategory)}
          colors={selectedCategory?.colors}
          updateCategoriesLocally={updateCategoriesLocally}
          refetch={refetch}
        />
      )}
  
      {showDeleteCategory && (
        <DeleteComponent
          imgSrc={selectedCategory?.banner}
          text="Are you sure you want to delete the category Daily Positive Affirmations? All videos in this category will be deleted too."
          handleDeleteComponent={() =>
            setShowDeleteCategory(!showDeleteCategory)
          }
          headingText="Delete Category"
          categoryId={selectedCategory?.categoryId}
          refetch={refetch}
          videoDetails={{}}
          isCategoryTable
        />
      )}
      {responseMessage ? (
        <>
          <div className=" text-black flex h-full w-full justify-center items-center my-8">
            {responseMessage}
          </div>
        </>
      ) : (
        <>
          <GenericTable
            tableName={"Categories"}
            headerData={headerData}
            rowsData={categories}
            rowsPerPage={rowsPerPage}
            page={page}
            handlePageChange={handlePageChange}
            renderRow={renderRow}
            totalPages={data?.pagination?.totalPages}
          />
        </>
      )}
    </>
  );
};

export default CategoryTable;
