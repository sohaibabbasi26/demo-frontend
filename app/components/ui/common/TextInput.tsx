import React from 'react';
import TextField, { TextFieldVariants } from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

interface TextInputProps {
  label?: string;
  type?: string;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  variant:TextFieldVariants ;
  height?:string;
}

const StyledTextField = styled(TextField)(({ height }: { height?: string }) => ({
  '& .MuiFilledInput-root': {
    backgroundColor: 'inputBorder', 
    borderRadius: '6px',
    paddingTop: '2px',
  },
  '& .MuiInputBase-input': {
    fontSize: '14px',
    fontFamily: 'Poppins, sans-serif',
    
    // padding: '12px 12px',  // Increased vertical padding for more height
   height:height || '100%',
    padding: '8px 12px', 
  
  },
  '& .MuiInputLabel-root': {
    transform: 'none', 
    position: 'static',
    marginBottom: '10px',
    marginTop : "5px", 
    color: '#000', 
    fontWeight: 'bold', 
    
  },
  '& .MuiFilledInput-underline:before': {
    borderBottom: 'none', 
  },
  '& .MuiFilledInput-underline:after': {
    borderBottom: '2px solid #673ab7',
  },
}));

const TextInput: React.FC<TextInputProps> = ({ label, type = 'text', value, onChange , error,helperText, variant,height}) => {
  return (
    <div className="mb-4"
    >
      <label className="font-[500] text-[16px] text-textBlack"
      >{label}</label>
      <StyledTextField
        type={type}
        variant={variant}
        value={value || ""}
        onChange={onChange}
        error={error}
        helperText={helperText}
        fullWidth
        height={height}
        sx={{fontFamily: "poppins"}}
       
     
      />
    </div>
  );
};

export default TextInput;
