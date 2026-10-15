import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const inputId = id || props.name;
    return (
      <div className="space-y-1 text-left w-full">
        {label && (
          <label
            className="block text-gray-800 text-md font-medium"
            htmlFor={inputId}
          >
            {label}
          </label>
        )}

        <input
          className={`transition-colors w-full text-black text-sm
            px-4 py-2.5 border border-gray-300 rounded-lg
            focus:ring-2 focus:ring-blue-500 outline-none
            ${error ? "border-red-500" : "border-gray-300"} ${className}`}
          {...props}
          id={inputId}
          ref={ref}
        />
        {error && <p className="text-red-500 text-xs font-medium">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
