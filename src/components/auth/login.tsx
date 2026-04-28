"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { showError, showSuccess } from "@/lib/toast";
import { FloatingInput } from "../ui/floating-input";
import { Button } from "../ui/button";
import { useCheckEmail, useLogin, useUpdateFcmToken } from "@/features/auth/hooks";
import { emailSchema, loginSchema, registerSchema } from "@/features/auth/Schema";
import Google from "../icons/Google";
import Apple from "../icons/Apple";
import { signInWithGoogle } from "@/lib/auth";
import { useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { generateFCMToken } from "@/lib/fcm";

type EmailForm = z.infer<typeof emailSchema>;
type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;

const Login = ({
  setStep,
  onSuccess,
}: {
  setStep?: (step: AuthStep) => void;
  onSuccess: () => void;
}) => {
  const { mutate: loginMutate, isPending: loginPending } = useLogin();
  const { mutate: checkEmail, isPending: checkPending } = useCheckEmail();
  const { mutate: updateFcmToken } = useUpdateFcmToken();
  const [step, setLocalStep] = useState<"email" | "login" | "register">("email");
  const [checkedEmail, setCheckedEmail] = useState("");

  const emailForm = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", method: "email" },
  });

  const registerForm = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", password: "", confirmPassword: "", method: "email" },
  });

  const handleCheckEmail = (data: EmailForm) => {
    checkEmail(
      { email: data.email } as any,
      {
        onSuccess: (res: any) => {
          const exists = res?.data?.exists;
          setCheckedEmail(data.email);
          if (exists) {
            loginForm.setValue("email", data.email);
            setLocalStep("login");
          } else {
            registerForm.setValue("email", data.email);
            setLocalStep("register");
          }
        },
        onError: (err: any) => showError(err),
      }
    );
  };

  const handleLogin = (body: LoginForm) => {
    loginMutate(body, {
      onSuccess: async(data) => {
        const user = data?.data?.user;
          try {
        const token = await generateFCMToken();
        if (token) {
          updateFcmToken(token);
        }
      } catch (e) {
        console.error("FCM token error:", e);
      }
        if (!user?.isEmailVerified) { setStep?.("otp-register"); return; }
        if (!user?.isProfileCompleted) { setStep?.("username"); return; }
        showSuccess("Logged in successfully");
        onSuccess();
      },
      onError: (err: any) => { console.error(err); showError(err); },
    });
  };

  const handleRegister = (body: RegisterForm) => {
    loginMutate({ email: body.email, password: body.password, method: "email" }, {
      onSuccess: async (data) => {
        const user = data?.data?.user;
             try {
        const token = await generateFCMToken();
        if (token) {
          updateFcmToken(token);
        }
      } catch (e) {
        console.error("FCM token error:", e);
      }
        showSuccess("Account created successfully!");
        if (!user?.isEmailVerified) { setStep?.("otp-register"); return; }
        if (!user?.isProfileCompleted) { setStep?.("username"); return; }
        onSuccess();

      },
      onError: (err: any) => { console.error(err); showError(err); },
    });
  };

  const handleGoogleLogin = async () => {
    try {
      const { token } = await signInWithGoogle();
      loginMutate({ method: "google", idToken: token } as any, {
        onSuccess: async(data) => {
          const user = data?.data?.user;
                try {
        const fcmToken = await generateFCMToken();
        console.log(fcmToken)
        if (fcmToken) {
          updateFcmToken(fcmToken);
        }
      } catch (e) {
        console.error("FCM token error:", e);
      }
          if (!user?.isEmailVerified) { setStep?.("otp-register"); return; }
          if (!user?.isProfileCompleted) { setStep?.("username"); return; }
          showSuccess("Logged in successfully");
          onSuccess();
        },
        onError: (err: any) => { console.error(err); showError(err); },
      });
    } catch (error) {
      console.error("Google login error:", error);
      showError("Google login failed");
    }
  };

  return (
    <div className="w-[340px] max-w-full md:px-0 px-4">
      <h2 className="text-2xl font-semibold mb-3">Login or sign up</h2>
      {step === "email" && (
        <form onSubmit={emailForm.handleSubmit(handleCheckEmail)} className="space-y-3">
          <FloatingInput
            id="email"
            label="Email"
            type="email"
            {...emailForm.register("email")}
            error={emailForm.formState.errors.email?.message}
            maxLength={256}
          />
          <Button type="submit" disabled={checkPending} className="w-full rounded-full hover:bg-[#0b1d2a]">
            {checkPending ? "Checking..." : "Continue"}
          </Button>
        </form>
      )}
      {step === "login" && (
        <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-3">
          <FloatingInput
            id="email"
            label="Email"
            value={checkedEmail}
            disabled
          />
          <FloatingInput
            id="password"
            label="Password"
            type="password"
            {...loginForm.register("password")}
            error={loginForm.formState.errors.password?.message}
            maxLength={256}
          />
          <div className="w-full flex justify-between">
            <button type="button" onClick={() => setLocalStep("email")} className="text-sm font-medium cursor-pointer text-gray-500">
              ← Change email
            </button>
            <button type="button" onClick={() => setStep?.("forgot-password")} className="text-sm font-medium cursor-pointer">
              Forgot your password?
            </button>
          </div>
          <Button type="submit" disabled={loginPending} className="w-full rounded-full hover:bg-[#0b1d2a]">
            {loginPending ? "Logging in..." : "Log In"}
          </Button>
        </form>
      )}
      {step === "register" && (
        <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-3">
          <FloatingInput
            id="email"
            label="Email"
            value={checkedEmail}
            disabled
          />
          <FloatingInput
            id="password"
            label="Password"
            type="password"
            {...registerForm.register("password")}
            error={registerForm.formState.errors.password?.message}
            maxLength={256}
          />
          <FloatingInput
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            {...registerForm.register("confirmPassword")}
            error={registerForm.formState.errors.confirmPassword?.message}
            maxLength={256}
          />
          <button type="button" onClick={() => setLocalStep("email")} className="text-sm font-medium cursor-pointer text-gray-500">
            ← Change email
          </button>
          <Button type="submit" disabled={loginPending} className="w-full rounded-full hover:bg-[#0b1d2a]">
            {loginPending ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
      )}
      <div className="flex items-center gap-3 py-5">
        <div className="w-full h-[1.5px] bg-gray-200" />
        <p className="text-gray-600 text-sm font-medium">Or</p>
        <div className="w-full h-[1.5px] bg-gray-200" />
      </div>
      <div className="space-y-3">
        <Button disabled={loginPending} onClick={handleGoogleLogin} className="bg-[#F7F7F7] hover:bg-[#0b1d2a]/80 rounded-full w-full text-black">
          <Google />
          Continue with Google
        </Button>
        <Button disabled={loginPending} className="bg-[#F7F7F7] hover:bg-[#0b1d2a]/80 rounded-full w-full text-black">
          <Apple />
          Continue with Apple
        </Button>
      </div>
    </div>
  );
};

export default Login;
