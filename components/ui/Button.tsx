import { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      inline-flex items-center justify-center
      font-medium rounded-lg
      transition-colors duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
    `;

    const variants = {
      primary: `
        bg-slate-900 text-white
        hover:bg-slate-800
        focus:ring-slate-500
        dark:bg-white dark:text-slate-900
        dark:hover:bg-slate-100
      `,
      secondary: `
        bg-slate-100 text-slate-900
        hover:bg-slate-200
        focus:ring-slate-300
        dark:bg-slate-800 dark:text-slate-100
        dark:hover:bg-slate-700
      `,
      ghost: `
        bg-transparent text-slate-600
        hover:bg-slate-100 hover:text-slate-900
        focus:ring-slate-300
        dark:text-slate-400
        dark:hover:bg-slate-800 dark:hover:text-slate-100
      `,
      danger: `
        bg-red-600 text-white
        hover:bg-red-700
        focus:ring-red-500
      `,
    };

    const sizes = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base",
    };

    return (
      <button
        ref={ref}
        className={`
          ${baseStyles}
          ${variants[variant]}
          ${sizes[size]}
          ${fullWidth ? "w-full" : ""}
          ${className}
        `}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
