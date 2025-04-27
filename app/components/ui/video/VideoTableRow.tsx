"use client";
import React from "react";
import { TableRow, TableCell, Button, Typography } from "@mui/material";
import Image from "next/image";
import { number } from "yup";

interface VideoTableRowProps {
  title: string;
  uploadDate: string;
  category?: string;
  status?: string;
  viewCount?: number;
  likes: number;
  imgSrc: string;
  saves?:number;
  showActions?:boolean;
  showSaves?:boolean;
  onView?: () => void;
  onDelete?: () => void;
}

const VideoTableRow: React.FC<VideoTableRowProps> = ({
  title,
  uploadDate,
  category,
  status,
  likes,
  imgSrc,
  viewCount,
  saves,
  showSaves=false,
  showActions= true,
  onView,
  onDelete,
}) => {
  return (
    <TableRow
    >
      <TableCell sx={{ verticalAlign: "top",paddingLeft: 0, fontFamily : "poppins", fontSize: "16px", fontWeight : "400"}}>
        <div className="flex space-x-2 ">
          <Image
            src={imgSrc}
            alt={title}
            width={60}
            height={60}
            className="rounded-lg hidden lg:block mr-4"
          />
          <Typography sx={{fontFamily: "poppins"}}
          >
            {title}
          </Typography>
        </div>
      </TableCell>

      <TableCell sx={{ verticalAlign: "top",  fontFamily : "poppins", fontSize: "12px", fontWeight : "400" }}>
        <Typography sx={{fontFamily: "poppins"}} >{uploadDate}</Typography>
      </TableCell>
      
      {viewCount != null && ( 
  <TableCell sx={{ verticalAlign: "top", fontFamily: "poppins", fontSize: "12px", fontWeight: "400" }}>
    <Typography sx={{ fontFamily: "poppins" }}>
      {viewCount} 
    </Typography>
  </TableCell>
)}




      {category && (
        <TableCell sx={{ verticalAlign: "top", fontFamily : "poppins", fontSize: "12px", fontWeight : "400" }}>
          <Typography sx={{fontFamily: "poppins"}} >{category}</Typography>
        </TableCell>
      )}
      {status && (
        <TableCell
          sx={{
            verticalAlign: "top",
            // color: status === "Free" ? "primary.main" : "error.main",
            color:
              status === "Free"
                ? "#00AB44"
                : status === "Premium"
                ? "#895CAB"
                : "#5365E5",

             fontFamily : "poppins", fontSize: "14px", fontWeight : "700"
          }}
        >
          {status}
        </TableCell>
      )}
      <TableCell sx={{ verticalAlign: "top", fontFamily : "poppins", fontSize: "16px", fontWeight : "400" }}>
      <Typography >{likes}</Typography>
      </TableCell>
      {
        showSaves &&
      <TableCell sx={{ verticalAlign: "top" }}>{saves}</TableCell>

      }
      {showActions && <TableCell sx={{ verticalAlign: "top", paddingX: 0,fontFamily : "poppins", fontSize: "14px", fontWeight : "600" }}>
        <Button
          sx={{  position: "relative", top: "-4px",  textTransform: "none", fontFamily:"poppins", fontSize: "14px", fontWeight : "600" }}
          onClick={onView}
          color="success"
          size="small"
        >
          View
        </Button>
        <Button
          sx={{  fontSize: "14px", fontWeight : "600", position: "relative", top: "-4px" , textTransform: "none", fontFamily:"poppins" }}
          onClick={onDelete}
          color="error"
          size="small"
        >
          Delete
        </Button>
      </TableCell>}
    </TableRow>
  );
};

export default VideoTableRow;
