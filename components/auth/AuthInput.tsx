import { type LucideIcon } from "lucide-react";
import { forwardRef } from "react";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: LucideIcon;
  error?: string;
  trailing?: React.ReactNode;
}

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, icon: Icon, error, trailing, id, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-slate-700"
        >
          {label}
        </label>
        <div className="relative flex items-center">
          {/* Leading icon */}
          <span className="pointer-events-none absolute left-3 text-slate-400">
            <Icon className="w-4 h-4" strokeWidth={1.75} />
          </span>

          <input
            id={inputId}
            ref={ref}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            className={[
              "w-full rounded-lg border bg-white py-2.5 pl-9 pr-10 text-sm text-slate-900 placeholder:text-slate-400",
              "outline-none transition-colors",
              "focus:ring-2 focus:ring-emerald-500 focus:ring-offset-0 focus:border-emerald-400",
              error
                ? "border-red-400 focus:ring-red-400"
                : "border-slate-200 hover:border-slate-300",
            ].join(" ")}
            {...props}
          />

          {/* Trailing slot (e.g. password toggle) */}
          {trailing && (
            <span className="absolute right-3 flex items-center">
              {trailing}
            </span>
          )}
        </div>

        {error && (
          <p
            id={`${inputId}-error`}
            role="alert"
            className="text-xs text-red-600 flex items-center gap-1"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

AuthInput.displayName = "AuthInput";

export default AuthInput;
