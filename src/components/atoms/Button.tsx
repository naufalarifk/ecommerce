import React, { type ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const variantClasses = {
  primary: "bg-green-600 text-white hover:bg-green-700",
  secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
  outline: "border-2 border-green-600 text-green-600 hover:bg-green-50",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

const sizeClasses = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const Button = ({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "rounded font-semibold transition-colors",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
};

export default Button;
