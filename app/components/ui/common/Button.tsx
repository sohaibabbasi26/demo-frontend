import React from "react";
import Button from "@mui/material/Button";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  border?: boolean;
  borderColor?: string;
  fill?: boolean;
  textColor?: string;
  bgColor?: string;
  loading: boolean;
}

const CustomButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  border = false,
  borderColor = "#000",
  fill = true,
  bgColor,
  textColor = "#fff",
  loading
}) => {
  return (
    <Button
      type="submit"
      variant={fill ? "contained" : "outlined"}
      onClick={onClick}
      disabled={disabled}
      loading={loading}
      className="w-full  py-2 rounded"
      style={{
        color: textColor || "black",
        borderRadius: "12px",
        backgroundColor:
          fill && bgColor ? bgColor : fill ? "#BB90F0" : "transparent",
        border: border ? `1px solid ${borderColor}` : "none",
        marginTop: "16px",
        textTransform: "none",
        borderColor: "rgb(40,40,40)",
        fontFamily : "poppins",
        fontWeight: "400",
        fontSize: "16px",
        minHeight: "40px"
      }}
    >
      {loading ? (<></>) : children}
    </Button>
  );
};

export default CustomButton;
