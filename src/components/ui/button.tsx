import { ButtonType } from 'src/utils/types';

const Button = ({ className, children, size, ...props }: ButtonType) => {
  const extraClass = className ? className : '';
  return (
    <button className={`flex content-between gap-1 ${extraClass}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
