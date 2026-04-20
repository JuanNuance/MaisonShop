import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-sans font-medium text-stone-700"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full px-4 py-3 font-sans text-stone-900
            bg-white border border-stone-200 rounded-md
            placeholder:text-stone-400
            focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent
            transition-all duration-300 ease-in-out
            disabled:bg-stone-50 disabled:text-stone-400 disabled:cursor-not-allowed
            ${error ? "border-red-400 focus:ring-red-400" : ""}
            ${className}
          `}
          {...props}
        />
        {error && (
          <span className="text-sm text-red-500 font-sans">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
