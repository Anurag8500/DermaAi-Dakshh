"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthInput from "@/components/auth/AuthInput";

interface SignUpForm {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

interface SignUpErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreeToTerms?: string;
}

export default function SignUpPage() {
  const [form, setForm] = useState<SignUpForm>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<SignUpErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: SignUpErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!form.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the Terms of Service";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // UI-only loading simulation
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  const handleChange =
    (field: keyof SignUpForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = field === "agreeToTerms" ? e.target.checked : e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
      if (errors[field as keyof SignUpErrors]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  return (
    <AuthLayout
      title="Create Your DermaAI Account"
      subtitle="Start your journey toward smarter skincare with AI-powered insights."
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        {/* Full Name */}
        <AuthInput
          label="Full Name"
          icon={User}
          id="full-name"
          type="text"
          placeholder="Jane Doe"
          value={form.fullName}
          onChange={handleChange("fullName")}
          error={errors.fullName}
          autoComplete="name"
        />

        {/* Email */}
        <AuthInput
          label="Email Address"
          icon={Mail}
          id="email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange("email")}
          error={errors.email}
          autoComplete="email"
        />

        {/* Password */}
        <div className="flex flex-col gap-1">
          <AuthInput
            label="Password"
            icon={Lock}
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            value={form.password}
            onChange={handleChange("password")}
            error={errors.password}
            autoComplete="new-password"
            trailing={
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((v) => !v)}
                className="text-slate-400 hover:text-slate-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" strokeWidth={1.75} />
                ) : (
                  <Eye className="w-4 h-4" strokeWidth={1.75} />
                )}
              </button>
            }
          />
          {!errors.password && (
            <p className="text-xs text-slate-400 pl-0.5">
              Password must be at least 8 characters long.
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <AuthInput
          label="Confirm Password"
          icon={Lock}
          id="confirm-password"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Re-enter your password"
          value={form.confirmPassword}
          onChange={handleChange("confirmPassword")}
          error={errors.confirmPassword}
          autoComplete="new-password"
          trailing={
            <button
              type="button"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              onClick={() => setShowConfirmPassword((v) => !v)}
              className="text-slate-400 hover:text-slate-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-4 h-4" strokeWidth={1.75} />
              ) : (
                <Eye className="w-4 h-4" strokeWidth={1.75} />
              )}
            </button>
          }
        />

        {/* Agree to Terms */}
        <div className="flex flex-col gap-1.5">
          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              id="agree-terms"
              checked={form.agreeToTerms}
              onChange={handleChange("agreeToTerms")}
              aria-describedby={errors.agreeToTerms ? "terms-error" : undefined}
              className="mt-0.5 w-4 h-4 rounded border-slate-300 text-emerald-600 accent-emerald-600 focus:ring-emerald-500 cursor-pointer flex-shrink-0"
            />
            <span className="text-sm text-slate-600 leading-snug">
              I agree to the{" "}
              <Link href="#" className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
                Privacy Policy
              </Link>
            </span>
          </label>
          {errors.agreeToTerms && (
            <p id="terms-error" role="alert" className="text-xs text-red-600">
              {errors.agreeToTerms}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 mt-1"
        >
          {isLoading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Creating Account…
            </>
          ) : (
            "Create Account"
          )}
        </button>

        {/* Nav to login */}
        <p className="text-center text-sm text-slate-500 mt-1">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
          >
            Sign In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
