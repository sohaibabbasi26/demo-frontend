"use client";
import Image from "next/image";
import React from "react";
import { Button } from "@mui/material";

interface IconButtonWithTextProps {
  text: string;
  iconPath: string;
  onClick: () => void;
  color?: string;
  right?: string;
  top?: string;
  left?: string;
  bottom?: string;
  width?: string;
  height?: string;
  borderRad? : string
}

const IconButton: React.FC<IconButtonWithTextProps> = ({
  text,
  onClick,
  width,
  iconPath,
  height,
  right = "auto",
  bottom = "auto",
  left = "auto",
  top = "auto",
  borderRad
}) => {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      sx={{
        color: "#414141",
        borderRadius: borderRad|| "8px",
        // position: "absolute",
        right,
        top,
        bottom,
        left,
        width,
        height,
        borderColor: "#414141",
        
        textTransform: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "6px 12px",
        marginRight: "22px",
        fontWeight: "400",
        fontSize:"16px",
        fontFamily: "poppins"
        // zIndex: 1,
      }}
    >
      <Image
        src={iconPath}
        alt="Icon"
        width={13}
        height={13}
        style={{
          marginRight: "8px",
        }}
      />
      {text}
    </Button>
  );
};

export default IconButton;
