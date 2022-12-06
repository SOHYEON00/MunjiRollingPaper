import React, { memo } from "react";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  contents: string;
}

const Button = memo(({ contents, className, ...props }: ButtonProps) => {
  return (
    <button className={`button ${className}`} {...props}>
      {contents}
    </button>
  );
});

export default Button;
