import React, { InputHTMLAttributes, forwardRef } from "react";
import { InputStyle } from "./style";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: React.Ref<HTMLInputElement>;
}

const Input: React.FC<InputProps> = forwardRef(
  ({ children, ...props }, ref) => {
    return <InputStyle ref={ref} {...props} />;
  }
);

Input.displayName = "Input";

export default Input;
