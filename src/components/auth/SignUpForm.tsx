"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Scissors, Eye, EyeOff, CheckCircle } from "lucide-react";
import { useAuth } from "./AuthProvider";

interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  invitationCode: string;
}

interface SignUpFormProps {
  onToggleMode?: () => void;
}

export default function SignUpForm({
  onToggleMode = () => {},
}: SignUpFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { signUp } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const password = watch("password");

  const onSubmit = async (data: SignUpFormData) => {
    setLoading(true);
    setError(null);

    const { error } = await signUp(
      data.email,
      data.password,
      data.fullName,
      data.invitationCode,
    );

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }

    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-green-600 p-3 rounded-full">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-white">
              Account Created!
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Please check your email to verify your account before signing in.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={onToggleMode}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              Back to Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-red-600 p-3 rounded-full">
              <Scissors className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-white">
            Join Our Barber Team
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Enter your invitation code to create your barber account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="invitationCode" className="text-white">
                Invitation Code
              </Label>
              <Input
                id="invitationCode"
                type="text"
                placeholder="Enter your invitation code"
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                {...register("invitationCode", {
                  required: "Invitation code is required",
                })}
              />
              {errors.invitationCode && (
                <p className="text-sm text-red-500">
                  {errors.invitationCode.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-white">
                Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                {...register("fullName", {
                  required: "Full name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
              />
              {errors.fullName && (
                <p className="text-sm text-red-500">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 pr-10"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 pr-10"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-zinc-400">
              Already have an account?{" "}
              <button
                onClick={onToggleMode}
                className="text-red-500 hover:text-red-400 font-medium"
              >
                Sign in
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
