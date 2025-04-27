"use client";

import React from "react";
import { Button } from "@mui/material";
import Image from "next/image";

interface AddButtonProps {
  text: string;
  onClick: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ text, onClick }) => {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      sx={{
      
        borderRadius:"50px",
        bgcolor:'#000',
        color:'#fff',
        fontWeight:'light',
        textTransform: "none",
        display: "flex",
        alignItems: "center",
        padding: "6px 20px",
        fontFamily:"poppins"
      }}
    >
      <Image
        src="/svg/upload-icon.svg"
        alt="Plus Icon"
        width={20}
        height={20}
        style={{
          marginRight: "8px",
        }}
      />
      {text}
    </Button>
  );
};

export default AddButton;
