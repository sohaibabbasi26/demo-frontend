"use client";
import React, { useEffect } from "react";
import GenericTable from "../common/GenericTable";
import CategoryTableRow from "../category/CategoryTableRow";
import { Typography } from "@mui/material";

interface TopCategoriesProps {
  topCategories: any[] | undefined;
}

const TopCategories: React.FC<TopCategoriesProps> = ({ topCategories }) => {
  useEffect(() => {
    console.log("[topCategories]:", topCategories);
  }, [topCategories]);

  const rowsPerPage = 3;

  const headerData = [
    { id: "title", label: "Category Title" },
    { id: "numberOfVideos", label: "No. of Videos" },
    { id: "viewCount", label: "View Count" },
    { id: "likes", label: "Likes" },
  ];

  const renderRow = (row: any, index: number) => (
    <CategoryTableRow
      key={index}
      title={row.title}
      numberOfVideos={row.numberOfVideos}
      videoCount={row.totalViews}
      likes={row.totalLikes}
      showActions={false}
    />
  );

  return (
    <div className="px-5 my-10">
      <Typography
        marginTop="4px"
        marginLeft="22px"
        sx={{
          color: "#000",
          fontWeight: "700",
          fontSize: "24px",
          fontFamily: "poppins",
        }}
      >
        Top Performing Categories
      </Typography>

      <GenericTable
        tableName={"Top Performing Categories"}
        headerData={headerData}
        rowsData={topCategories}
        marginTop={3}
        rowsPerPage={rowsPerPage}
        page={1}
        renderRow={renderRow}
        hasPagination={false}
      />
    </div>
  );
};

export default TopCategories;
