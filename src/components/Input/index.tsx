import React, { InputHTMLAttributes, forwardRef } from "react";
import { InputStyle } from "./style";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = forwardRef(
  ({ children, ...props }, ref: React.Ref<HTMLInputElement>) => {
    return <InputStyle ref={ref} {...props} />;
  }
);

Input.displayName = "Input";

export default Input;
