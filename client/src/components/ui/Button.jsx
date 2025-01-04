import { cn } from "../../../lib/utils.jsx";

const Button = ({ children, type = "button", className = "", ...props }) => {
  return (
    <button
      {...props}
      type={type}
      className={cn(
        "px-4 py-2 rounded-lg font-bold bg-green-600 hover:bg-green-700 transition duration-200 ease-in-out",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;