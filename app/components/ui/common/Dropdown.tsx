import React, { ReactNode } from "react";
import { Select, MenuItem, FormControl, FormHelperText, SelectChangeEvent } from "@mui/material";

type CategoryData = {
  categoryId: number;
  title: string;
}

interface DropdownProps {
  categories: CategoryData[];
  value: string;
  onChange: (event: SelectChangeEvent<string>, child: ReactNode) => void;
  error?: boolean;  // Error prop to handle validation state
  helperText?: string;  // Helper text prop for validation message
}

const Dropdown: React.FC<DropdownProps> = ({ categories, value, onChange, error, helperText, }) => {
  return (
    <div className="mb-4">
      <label className="font-[500] text-[16px] text-textBlack mb-1 block">
        Category
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
            Select Category
          </MenuItem>
          {categories?.map((category: CategoryData, index: number) => (
            <MenuItem sx={{ fontFamily: "poppins" }} key={index} value={category?.categoryId?.toString()}>
              {category?.title}
            </MenuItem>
          ))}
        </Select>
        {/* Display helper text if error exists */}
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </div>
  );
};

export default Dropdown;
