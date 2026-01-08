"use client";

import { useState, useEffect, useTransition, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthStep, AuthState } from "@/lib/types";
import { checkEmail, login, register } from "@/lib/actions/auth";
import {
  Input,
  Button,
  Card,
  CardContent,
  PasswordStrengthIndicator,
} from "@/components/ui";
import {
  isValidEmail,
  getEmailError,
  getNameError,
} from "@/lib/utils/validation";

const REDIRECT_COUNTDOWN = 5;

export function AuthForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [state, setState] = useState<AuthState>({
    step: "email",
    email: "",
  });

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({
    email: false,
    name: false,
    password: false,
  });

  // Validation errors
  const emailError = useMemo(
    () => (touched.email ? getEmailError(state.email) : null),
    [state.email, touched.email]
  );
  const nameError = useMemo(
    () => (touched.name ? getNameError(name) : null),
    [name, touched.name]
  );

  // Check if form is valid for each step
  const isEmailStepValid = isValidEmail(state.email);
  const isLoginStepValid = password.length >= 1;
  const isRegisterStepValid = name.trim().length >= 2 && password.length >= 6;

  // Handle auto-redirect countdown
  useEffect(() => {
    if (
      state.step === "redirecting" &&
      state.redirectCountdown !== undefined &&
      state.redirectCountdown > 0
    ) {
      const timer = setTimeout(() => {
        setState((prev) => ({
          ...prev,
          redirectCountdown: (prev.redirectCountdown ?? 1) - 1,
        }));
      }, 1000);
      return () => clearTimeout(timer);
    }

    // When countdown reaches 0, redirect to the appropriate step
    if (state.step === "redirecting" && state.redirectCountdown === 0) {
      if (state.message?.includes("login")) {
        setState((prev) => ({
          ...prev,
          step: "login",
          error: undefined,
          message: undefined,
        }));
      } else if (state.message?.includes("Creating")) {
        setState((prev) => ({
          ...prev,
          step: "register",
          error: undefined,
          message: undefined,
        }));
      }
    }
  }, [state.step, state.redirectCountdown, state.message]);

  // Handle email submission
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched((prev) => ({ ...prev, email: true }));

    if (!isEmailStepValid) return;

    startTransition(async () => {
      const result = await checkEmail(state.email);
      setState((prev) => ({
        ...prev,
        email: result.email,
        step: result.exists ? "login" : "register",
        error: undefined,
      }));
    });
  };

  // Handle login submission
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched((prev) => ({ ...prev, password: true }));

    if (!isLoginStepValid) return;

    startTransition(async () => {
      const result = await login(state.email, password);

      if (result.success) {
        router.push("/blog");
        router.refresh();
      } else if (result.shouldRedirect === "register") {
        // Edge case: account doesn't exist
        setState((prev) => ({
          ...prev,
          step: "redirecting",
          message: result.message,
          redirectCountdown: REDIRECT_COUNTDOWN,
        }));
      } else {
        setState((prev) => ({ ...prev, error: result.error }));
      }
    });
  };

  // Handle register submission
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched((prev) => ({ ...prev, name: true, password: true }));

    if (!isRegisterStepValid) return;

    startTransition(async () => {
      const result = await register(state.email, name, password);

      if (result.success) {
        router.push("/blog");
        router.refresh();
      } else if (result.shouldRedirect === "login") {
        // Edge case: account already exists
        setState((prev) => ({
          ...prev,
          step: "redirecting",
          message: result.message,
          redirectCountdown: REDIRECT_COUNTDOWN,
        }));
      } else {
        setState((prev) => ({ ...prev, error: result.error }));
      }
    });
  };

  // Handle going back
  const handleBack = () => {
    setState({ step: "email", email: "" });
    setPassword("");
    setName("");
    setTouched({ email: false, name: false, password: false });
  };

  // Handle immediate redirect
  const handleGoNow = () => {
    if (state.message?.includes("login")) {
      setState((prev) => ({
        ...prev,
        step: "login",
        error: undefined,
        message: undefined,
      }));
    } else if (state.message?.includes("Creating")) {
      setState((prev) => ({
        ...prev,
        step: "register",
        error: undefined,
        message: undefined,
      }));
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardContent className="py-8 px-6">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link
              href="/"
              className="text-2xl font-semibold text-slate-900 dark:text-white"
            >
              Axis Blog
            </Link>
          </div>

          {/* Redirecting state */}
          {state.step === "redirecting" && (
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-blue-600 dark:text-blue-400 animate-pulse"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-lg text-slate-900 dark:text-white">
                  {state.message}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Redirecting in {state.redirectCountdown} seconds
                </p>
              </div>
              <Button onClick={handleGoNow} variant="secondary" fullWidth>
                Go now
              </Button>
            </div>
          )}

          {/* Email step */}
          {state.step === "email" && (
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div className="text-center mb-2">
                <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Welcome
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Enter your email to get started
                </p>
              </div>

              <Input
                type="email"
                label="Email"
                placeholder="you@example.com"
                value={state.email}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, email: e.target.value }))
                }
                onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                error={emailError ?? undefined}
                required
                autoFocus
                autoComplete="email"
                disabled={isPending}
              />

              <Button
                type="submit"
                fullWidth
                disabled={isPending || !isEmailStepValid}
              >
                {isPending ? "Checking..." : "Continue"}
              </Button>

              <div className="text-center">
                <Link
                  href="/"
                  className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  ← Back to home
                </Link>
              </div>
            </form>
          )}

          {/* Login step */}
          {state.step === "login" && (
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <div className="text-center mb-2">
                <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Welcome back!
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {state.email}
                </p>
              </div>

              {state.error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {state.error}
                  </p>
                </div>
              )}

              <Input
                type="password"
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
                autoComplete="current-password"
                disabled={isPending}
              />

              <Button
                type="submit"
                fullWidth
                disabled={isPending || !isLoginStepValid}
              >
                {isPending ? "Signing in..." : "Sign In"}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleBack}
                  className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  ← Use different email
                </button>
              </div>
            </form>
          )}

          {/* Register step */}
          {state.step === "register" && (
            <form onSubmit={handleRegisterSubmit} className="space-y-6">
              <div className="text-center mb-2">
                <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Create your account
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {state.email}
                </p>
              </div>

              {state.error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {state.error}
                  </p>
                </div>
              )}

              <Input
                type="text"
                label="Your name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                error={nameError ?? undefined}
                required
                autoFocus
                autoComplete="name"
                disabled={isPending}
              />

              <div className="space-y-2">
                <Input
                  type="password"
                  label="Create password"
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  disabled={isPending}
                />
                <PasswordStrengthIndicator password={password} />
              </div>

              <Button
                type="submit"
                fullWidth
                disabled={isPending || !isRegisterStepValid}
              >
                {isPending ? "Creating account..." : "Create Account"}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleBack}
                  className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  ← Use different email
                </button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
