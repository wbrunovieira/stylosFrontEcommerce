// components/Button.tsx
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
}) => {
  const baseStyles = 'focus:outline-none transition ease-in-out duration-150';
  const variantStyles = {
    primary: 'bg-prymary hover:bg-secondary text-white rounded-md',
    secondary: 'bg-secondary hover:bg-primary text-white rounded-md',
  };
  const sizeStyles = {
    small: 'text-xs px-3 py-2',
    medium: 'text-md px-4 py-2',
    large: 'text-lg px-5 py-3',
  };

  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} text-white-important`;

  return <button className={classes}>{children}</button>;
};

export default Button;
