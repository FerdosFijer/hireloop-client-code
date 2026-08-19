"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Card, CardHeader, CardFooter } from "@heroui/react";
import { Description, Label, Radio, RadioGroup } from "@heroui/react";
import {
  Person,
  At,
  Key,
  ArrowRight,
  CircleCheck,
  CircleExclamation,
  Eye,
  EyeSlash,
} from "@gravity-ui/icons";
// Adjust this import path based on where your Better Auth client is initialized
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("seeker");

  // Field error states
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Form submit feedback states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Validation Handlers
  const validateEmail = (val) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!val) {
      setEmailError("Email address is required");
      return false;
    } else if (!emailRegex.test(val)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (val) => {
    if (!val) {
      setPasswordError("Password is required");
      return false;
    } else if (val.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    if (emailError) validateEmail(val);
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    if (passwordError) validatePassword(val);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Trigger validations on submit
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    setLoading(true);

    try {
      await authClient.signUp.email(
        {
          email,
          password,
          name,
          role,
          callbackURL: "/",
        },
        {
          onRequest: () => {
            setLoading(true);
          },
          onSuccess: () => {
            setLoading(false);
            setSuccess("Account created successfully! You can now sign in.");
          },
          onError: (ctx) => {
            setLoading(false);
            setError(
              ctx?.error?.message || "Something went wrong. Please try again.",
            );
          },
        },
      );
    } catch (err) {
      setLoading(false);
      setError(err.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader className="flex flex-col gap-1 items-start px-0 pt-0 pb-4">
          <h1 className="text-2xl font-bold">Create an Account</h1>
          <p className="text-small text-default-500">
            Enter your details below to get started
          </p>
        </CardHeader>

        <form
          onSubmit={handleSignUp}
          className="flex flex-col gap-4 py-2"
          noValidate
        >
          {/* Full Name Field */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium">
              Full Name <span className="text-danger">*</span>
            </label>
            <div className="relative flex items-center">
              <Person className="absolute left-3 text-default-400 text-lg pointer-events-none" />
              <input
                id="name"
                required
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-default-200 rounded-medium bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Email Address Field */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium">
              Email Address <span className="text-danger">*</span>
            </label>
            <div className="relative flex items-center">
              <At
                className={`absolute left-3 text-lg pointer-events-none ${emailError ? "text-danger" : "text-default-400"}`}
              />
              <input
                id="email"
                required
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={handleEmailChange}
                onBlur={(e) => validateEmail(e.target.value)}
                className={`w-full pl-10 pr-3 py-2 border rounded-medium bg-transparent text-sm focus:outline-none focus:ring-2 ${
                  emailError
                    ? "border-danger focus:ring-danger text-danger"
                    : "border-default-200 focus:ring-primary"
                }`}
              />
            </div>
            {emailError && (
              <span className="text-xs text-danger flex items-center gap-1 mt-0.5">
                <CircleExclamation className="text-xs" /> {emailError}
              </span>
            )}
          </div>

          {/* Password Field with Show/Hide Toggle */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium">
              Password <span className="text-danger">*</span>
            </label>
            <div className="relative flex items-center">
              <Key
                className={`absolute left-3 text-lg pointer-events-none ${passwordError ? "text-danger" : "text-default-400"}`}
              />
              <input
                id="password"
                required
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={handlePasswordChange}
                onBlur={(e) => validatePassword(e.target.value)}
                className={`w-full pl-10 pr-10 py-2 border rounded-medium bg-transparent text-sm focus:outline-none focus:ring-2 ${
                  passwordError
                    ? "border-danger focus:ring-danger text-danger"
                    : "border-default-200 focus:ring-primary"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-default-400 hover:text-default-600 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeSlash className="text-lg" />
                ) : (
                  <Eye className="text-lg" />
                )}
              </button>
            </div>
            {passwordError && (
              <span className="text-xs text-danger flex items-center gap-1 mt-0.5">
                <CircleExclamation className="text-xs" /> {passwordError}
              </span>
            )}
          </div>

          {/* Role Selection */}
          <div className="flex flex-col gap-4 border not-only-of-type:rounded-medium bg-transparent  p-2">
            <Label>Subscription plan</Label>
            <RadioGroup
              defaultValue="seeker"
              name="role"
              onChange={value => setRole(value)}
              orientation="horizontal"
            >
              <Radio  value="seeker">
                <Radio.Content >
                  <Radio.Control >
                    <Radio.Indicator />
                  </Radio.Control>
                  Job Seeker
                </Radio.Content>
              </Radio>
              <Radio value="recruiter">
                <Radio.Content>
                  <Radio.Control>
                    <Radio.Indicator />
                  </Radio.Control>
                  Recruiter
                </Radio.Content>
              </Radio>
            </RadioGroup>
          </div>

          {/* Global API Feedback Messages (Positioned between Password and Sign Up) */}
          {error && (
            <div className="flex items-center gap-2 p-3 text-sm rounded-lg bg-danger-50 text-danger border border-danger-200 my-1">
              <CircleExclamation className="text-lg shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center justify-center gap-2 p-3 text-sm rounded-lg bg-success-50 text-success border border-success-200 text-center my-1">
              <CircleCheck className="text-lg shrink-0" />
              <span>{success}</span>
            </div>
          )}

          <Button
            type="submit"
            color="primary"
            isLoading={loading}
            className="w-full font-semibold mt-1"
          >
            Sign Up
          </Button>
        </form>

        <CardFooter className="flex justify-center px-0 pb-0 pt-4">
          <p className="text-small text-default-500 flex items-center gap-2">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-primary font-medium hover:underline inline-flex items-center gap-1"
            >
              Sign In <ArrowRight className="text-sm" />
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
