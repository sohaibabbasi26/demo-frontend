"use client";
import React from "react";
import { Typography } from "@mui/material";

interface TextFieldProps {
  label: string;
  text: string;
  color?: string; 
}

const TextField: React.FC<TextFieldProps> = ({ label, text, color }) => {

  console.log("[DATA IN TEXTFIELD]:", { label, text, color })
  return (
    <div className="mb-4">
      <Typography sx={{fontFamily : "poppins", fontWeight :"500", fontSize : "16px", color: "#282828"}}>
        {label}
      </Typography>
      <Typography  sx={{fontFamily : "poppins", fontWeight :"400", fontSize : "14px",  color: color || "rgb(40, 40, 40)"}}>
        {text}
      </Typography>
    </div>
  );
};

export default TextField;
