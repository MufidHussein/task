import React, { type FC } from "react";
import TextField from "@mui/material/TextField";

interface CustomTextFieldProps {
  id: string;
  label: string;
  name: string;
  type: string;
  value?: any;
  onChange?: (e: any) => void;
}

const CustomTextField: FC<CustomTextFieldProps> = ({
  id,
  label,
  name,
  type,
  value,
  onChange,
}) => {
  return (
    <TextField
      margin="normal"
      fullWidth={true}
      id={id}
      autoFocus={true}
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={true}
    />
  );
};

export default CustomTextField;
