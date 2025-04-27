"use client";

import React from "react";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

interface RadioButtonProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({ value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="font-medium text-[16px] text-textBlack mb-2 block">
        Plan
      </label>
      <RadioGroup
        row
        value={value}
        onChange={onChange}
        sx={{
          "& .MuiFormControlLabel-root": {
            marginRight: "16px", // Add spacing between radio buttons
          },
        }}
      >
        <FormControlLabel
          value="Free"
          
          control={
            <Radio
              sx={{
                color: "gray", 
                "&.Mui-checked": {
                  color: "#65558F", // Checked color
                },
              }}
            />
          }
          label="Free"

          sx={{
            "& .MuiFormControlLabel-label": { color: "#282828", fontFamily: "poppins" }, // Customize label color
          }}
        />
        <FormControlLabel
          value="Standard"
          control={
            <Radio
              sx={{
                color: "gray", // Unchecked color
                "&.Mui-checked": {
                  color: "#65558F", // Checked color
                },
              }}
            />
          }
          label="Standard"
          sx={{
            "& .MuiFormControlLabel-label": { color: "#282828", fontFamily: "poppins" }, // Customize label color
          }}
        />
      </RadioGroup>
    </div>
  );
};

export default RadioButton;
