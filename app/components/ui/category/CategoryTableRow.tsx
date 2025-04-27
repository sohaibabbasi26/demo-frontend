"use client";
import { Button, TableCell, TableRow, Typography } from "@mui/material";
import React, {useEffect} from "react";

interface VideoTableRowProps {
  categoryId?: number;
  title: string;
  numberOfVideos: number;
  videoCount: number;
  likes: number;
  onView?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
  showActions?: boolean;
}

const CategoryTableRow: React.FC<VideoTableRowProps> = ({
  title,
  numberOfVideos,
  likes,
  videoCount,
  onView,
  onDelete,
  onEdit,
  showActions = true,
}) => {

  // useEffect(() => {
  //   console.log("[data in category table row]:", {  title,
  //     numberOfVideos,
  //     likes,
  //     videoCount,
  //     onView,
  //     onDelete, 
  //     onEdit,
  //     showActions :true,})
  // }, []);

  return (
    <TableRow>
      <TableCell sx={{ verticalAlign: "top", fontFamily : "poppins", fontSize: "12px", fontWeight : "400"  }}>
        <Typography sx={{fontFamily: "poppins"}} >
          {title}
        </Typography>
      </TableCell>

      <TableCell sx={{ verticalAlign: "top" , fontFamily : "poppins", fontSize: "12px", fontWeight : "400" }}>
      <Typography sx={{fontFamily: "poppins"}}>{numberOfVideos}</Typography>
      </TableCell>
      <TableCell
        sx={{
          verticalAlign: "top",
          fontFamily : "poppins", fontSize: "12px", fontWeight : "400" 
        }}
      >
        <Typography sx={{fontFamily: "poppins"}}>{videoCount}</Typography>
      </TableCell>
      <TableCell sx={{ verticalAlign: "top", fontFamily : "poppins", fontSize: "12px", fontWeight : "400"  }}><Typography>{likes}</Typography></TableCell>
      {showActions && (
        <TableCell sx={{ verticalAlign: "top", display: "flex", paddingX: 0,fontFamily : "poppins", fontSize: "14px", fontWeight : "700"}}>
          <Button
            sx={{ color: "#2200AB", fontWeight: "600", fontSize: "14px", position: "relative", top: "-4px", textTransform: "none",fontFamily : "poppins"}}
            onClick={onEdit}
            color="primary"
            size="small"
            
          >
            Edit
          </Button>

          <Button
            sx={{ fontWeight: "600", fontSize: "14px",  position: "relative", top: "-4px" , textTransform: "none" ,fontFamily : "poppins"}}
            onClick={onView}
            color="success"
            size="small"
            
          >
            View
          </Button>
          <Button
            sx={{ fontWeight: "600", fontSize: "14px",  position: "relative", top: "-4px", textTransform: "none",fontFamily : "poppins" }}
            onClick={onDelete}
            color="error"
            size="small"
          >
            Delete
          </Button>
        </TableCell>
      )}
    </TableRow>
  );
};

export default CategoryTableRow;
