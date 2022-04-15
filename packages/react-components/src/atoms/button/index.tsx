import React from "react";

export interface IButtonProps {}

export const Button: React.FC<
  IButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = (props) => {
  const { children } = props;

  return <button {...props}>{children}</button>;
};
