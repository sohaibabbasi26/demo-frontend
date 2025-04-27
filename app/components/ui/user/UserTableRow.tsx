"use client";
import React from "react";
import { TableRow, TableCell, Button, Typography } from "@mui/material";
import Image from "next/image";

interface UserTableRowProps {
  name: string;
  email:string;
  phoneNumber: string;
  subscription: "Free" | "Premium" | "Standard";
  onView: () => void;
}

const UserTableRow: React.FC<UserTableRowProps> = ({
  name,
  email,
  phoneNumber,
  subscription,
  onView,
}) => {
  return (
    <TableRow>
      <TableCell sx={{ verticalAlign: "top" , fontFamily : "poppins", fontSize: "12px", fontWeight : "400" }}>
        <Typography sx={{fontFamily: "poppins"}}>
          {name}
        </Typography>
      </TableCell>

      <TableCell sx={{ verticalAlign: "top", fontFamily : "poppins", fontSize: "12px", fontWeight : "400"  }}>
        <Typography sx={{fontFamily: "poppins"}}>{email}</Typography>
      </TableCell>
      <TableCell sx={{ verticalAlign: "top", fontFamily : "poppins", fontSize: "12px", fontWeight : "400"  }}>
        <Typography sx={{fontFamily: "poppins"}} >{phoneNumber}</Typography>
      </TableCell>
      <TableCell
        sx={{
          verticalAlign: "top",
          color:
            subscription === "Free"
              ? "#00AB44"
              : subscription === "Premium"
              ? "#895CAB"
              : "#5365E5",
          fontWeight: "600",
          fontFamily : "poppins", fontSize: "14px", 
        }}
      >
        {subscription}
      </TableCell>

      <TableCell sx={{ verticalAlign: "top" }}>
        <Button
          sx={{ fontWeight: "600",textTransform: "none", position: "relative", top: "-4px", fontFamily : "poppins", fontSize: "14px", marginX : "0" }}
          onClick={onView}
          color="success"
          size="small"
        >
          View
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default UserTableRow;
