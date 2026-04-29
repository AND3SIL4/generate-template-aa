import { ButtonType } from 'src/utils/types';

const Button = ({ children, className, size, ...props }: ButtonType) => {
  return (
    <button
      className={`
        cursor-pointer flex justify-between gap-1
        ${className ? className : ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
