import React, { ReactNode } from "react";
import { Select, MenuItem, FormControl, FormHelperText, SelectChangeEvent } from "@mui/material";


interface LevelsDropdownProps {
  categories: string[]
  value: string;
  onChange: (event: SelectChangeEvent<string>, child: ReactNode) => void;
  error?: boolean; 
  helperText?: string;  
}

const LevelsDropdown: React.FC<LevelsDropdownProps> = ({ categories, value, onChange, error, helperText, }) => {
  return (
    <div className="mb-4">
      <label className="font-[500] text-[16px] text-textBlack mb-1 block">
        Levels
      </label>
      <FormControl fullWidth error={error}> {/* Apply error state to FormControl */}
        <Select
          value={value}
          onChange={onChange}
          displayEmpty
          sx={{
            height: "40px",
            "& .MuiSelect-placeholder": {
              textAlign: "center",
            },
            fontFamily: "poppins"
          }}
        >
          <MenuItem disabled value="" sx={{ fontFamily: "poppins" }}>
            Select Level
          </MenuItem>
          {categories?.map((category , index: number) => (
            <MenuItem sx={{ fontFamily: "poppins" }} key={index} value={category}>
              {category?.charAt(0)?.toUpperCase() + category.slice(1)}
            </MenuItem>
          ))}
        </Select>
        {/* Display helper text if error exists */}
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </div>
  );
};

export default LevelsDropdown;
