"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { showError, showSuccess } from "@/lib/toast";
import { FloatingInput } from "../ui/floating-input";
import { Button } from "../ui/button";
import { useLogin } from "@/features/auth/hooks";
import { LoginPayload, loginSchema } from "@/features/auth/Schema";
import Google from "../icons/Google";
import Apple from "../icons/Apple";
import { useAppDispatch } from "@/lib/hooks";
import { login } from "@/lib/slices/authSlice";
import { signInWithGoogle } from "@/lib/auth";
import { useQueryClient } from "@tanstack/react-query";

const Login = ({
  setCurrentStep,
  onSuccess,
}: {
  setCurrentStep?: React.Dispatch<React.SetStateAction<AuthStep>>;
  onSuccess?: () => void;
}) => {
  const { mutate, isPending } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      method: "email",
    },
  });

  const onSubmit = (body: LoginPayload) => {
    mutate(body, {
      onSuccess: (data) => {
        const user = data?.data?.user;
        if (!user?.isEmailVerified) {
          setCurrentStep?.("otp-register");
          return;
        }
        if (!user?.isProfileCompleted) {
          setCurrentStep?.("username");
          return;
        }
        // dispatch(login(user));
        window.location.reload();
        showSuccess("Logged in successfully");
        onSuccess?.();
      },

      onError: (err: any) => {
        console.error(err);
        showError(err);
      },
    });
  };

  const handleGoogleLogin = async () => {
    try {
      const { token } = await signInWithGoogle();

      mutate(
        {
          method: "google",
          idToken: token,

        } as any,
        {
          onSuccess: (data) => {
            const user = data?.data?.user;

            if (!user?.isEmailVerified) {
              setCurrentStep?.("otp-register");
              return;
            }

            if (!user?.isProfileCompleted) {
              setCurrentStep?.("username");
              return;
            }

            // dispatch(login(user));
            window.location.reload();
            showSuccess("Logged in successfully");
            onSuccess?.();
          },

          onError: (err: any) => {
            console.error(err);
            showError(err);
          },
        },
      );
    } catch (error) {
      console.error("Google login error:", error);
      showError("Google login failed");
    }
  };

  return (
    <div className="w-[340px] max-w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <h2 className="text-2xl font-semibold">Welcome Back</h2>

        <FloatingInput
          id="email"
          label="Email"
          type="email"
          {...register("email")}
          error={errors.email?.message}
        />

        <FloatingInput
          id="password"
          label="Password"
          type="password"
          {...register("password")}
          error={errors.password?.message}
        />

        <div className="w-full flex justify-end">
          <button
            type="button"
            onClick={() => setCurrentStep?.("forgot-password")}
            className="text-sm font-medium cursor-pointer"
          >
            Forgot your password?
          </button>
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full rounded-full hover:bg-[#0b1d2a]"
        >
          {isPending ? "Logging in..." : "Log In"}
        </Button>
      </form>

      <div className="flex items-center gap-3 py-5">
        <div className="w-full h-[1.5px] bg-gray-200" />
        <p className="text-gray-600 text-sm font-medium">Or</p>
        <div className="w-full h-[1.5px] bg-gray-200" />
      </div>

      <div className="space-y-3">
        <Button disabled={isPending} onClick={handleGoogleLogin} className="bg-[#F7F7F7] hover:bg-[#0b1d2a]/80 rounded-full w-full text-black">
          <Google />
          Continue with Google
        </Button>

        <Button disabled={isPending} className="bg-[#F7F7F7] hover:bg-[#0b1d2a]/80 rounded-full w-full text-black">
          <Apple />
          Continue with Apple
        </Button>

        <p className="text-center mt-5">
          First time here?{" "}
          <button
            onClick={() => setCurrentStep?.("register")}
            className="font-semibold cursor-pointer"
          >
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
