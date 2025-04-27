"use client";
import React, { useEffect, useState } from "react";
import GenericTable from "../common/GenericTable";
import VideoTableRow from "../video/VideoTableRow";
import { Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { formatDate } from "@/app/utils/formatDate";

interface TopVideosProps {
  topVideos: any[] | undefined;
  rowsPerPage?: number;
  hasPagination: boolean;
  page: number ;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages? : number
  
  
  
}

const TopVideos: React.FC<TopVideosProps> = ({
  topVideos,
  rowsPerPage,
  hasPagination,
  page, setPage, totalPages
}) => {
  const router = useRouter();
  const pathname = usePathname();

  console.log("[TOP VIDEOS IN VIDEO PERFORMANCE COMPONENT]:", topVideos);

  const [showViewAll, setShowViewAll] = useState(true);

  useEffect(() => {
    const isTopVideosPage = pathname.includes("top-videos");
    setShowViewAll(!isTopVideosPage);
  }, [pathname]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };



  const headerData = [
    { id: "title", label: "Video Title" },
    { id: "uploadDate", label: "Upload Date" },
    { id: "viewCount", label: "View Count" },
    { id: "likes", label: "Likes" },
    { id: "saves", label: "Saves" },
  ];

  const handleClick = () => {
    router.push("/content-analytics/top-videos");
  };

  const renderRow = (row: any, index: number) => (
    <VideoTableRow
      key={index}
      title={row.title}
      viewCount={row.totalViews}
      uploadDate={formatDate(row.createdAt)}
      imgSrc={row.thumbnail}
      likes={row.totalLikes}
      showSaves={true}
      saves={row.totalSaves}
      showActions={false}
    />
  );

  return (
    <>
      {showViewAll && (<div className="flex items-center justify-between px-5 my-5">
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
          Top Performing Videos
        </Typography>
        <Typography
          marginRight="32px"
          onClick={handleClick}
          className="text-black font-poppins font-[400] text-[16px] underline cursor-pointer"
        >
          View All
        </Typography>
      </div>
      )}

{!showViewAll && (<div className="flex items-center justify-between px-5 my-5">
        <Typography
          marginTop="4px"
          // marginBottom={3}
          // gutterBottom
        
          marginLeft="22px"
          sx={{
            color: "#000",
            fontWeight: "700",
            fontSize: "24px",
            fontFamily: "poppins",
          }}
        >
          Top Performing Videos
        </Typography>
        
      </div>
      )}
      <div className="px-5">
      <GenericTable
        tableName={"Top Performing Videos"}
        headerData={headerData}
        rowsData={topVideos}
        rowsPerPage={rowsPerPage}
        page={page}
        renderRow={renderRow}
        handlePageChange={handlePageChange}
        hasPagination={hasPagination}
        totalPages={totalPages}
      />
      </div>
    </>
  );
};

export default TopVideos;
