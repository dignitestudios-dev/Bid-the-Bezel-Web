"use client";
import React, { useState } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { login } from "@/lib/slices/authSlice";
import { ArrowRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/auth-sidebar-sheet";
import Login from "./auth/login";
import { Button } from "./ui/button";
import Username from "./auth/username";
import PurchasePlan from "./auth/purchase-plan";
import ForgotPassword from "./auth/forgot-password";
import Otp from "./auth/otp";
import ResetPassword from "./auth/reset-password";
import PasswordChanged from "./auth/password-changed";
import Register from "./auth/register";
import OtpRegister from "./auth/otp-register";
import PlanSelected from "./auth/plan-selected";
import SubscriptionConfirmation from "./auth/subscription-confirmation";

type Step =
  | "login"
  | "register"
  | "otp-register"
  | "username"
  | "purchase-plan"
  | "plan-selected"
  | "subscription-confirmation"
  | "forgot-password"
  | "otp"
  | "reset-password"
  | "password-changed";

const AuthSidebar = () => {
  const [currentStep, setCurrentStep] = useState<Step>("login");
  const [open, setOpen] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setCurrentStep("login");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentStep("login");
  };

  const dispatch = useAppDispatch();

  const handleSkipAndLogin = () => {
    dispatch(login({ id: "skipped_user", name: "Guest" }));
    setOpen(false);
    setCurrentStep("login");
  };

  return (
    <>
      <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetTrigger asChild>
          <Button className="rounded-full flex gap-2 items-center w-[105px] h-[45px] max-w-full">
            <span>Login</span> <ArrowRight size={15} />
          </Button>
        </SheetTrigger>
        <SheetContent
          className={`${
            currentStep === "plan-selected" ? "bg-gray-100" : "bg-white"
          }  w-[700px]! max-w-[90%] overflow-y-auto`}
        >
          <SheetHeader>
            <SheetTitle className="text-center text-lg">
              {currentStep === "login" && "Login"}
              {currentStep === "register" && "Create an account"}
              {currentStep === "otp-register" && "Verify your email"}
              {currentStep === "username" && "Enter Unique Username"}
              {currentStep === "purchase-plan" && "Choose a Plan"}
              {currentStep === "plan-selected" && "Plan Selected"}
              {currentStep === "subscription-confirmation" &&
                "Subscribed to Basic Plan"}
              {(currentStep === "forgot-password" ||
                currentStep === "otp" ||
                currentStep === "reset-password" ||
                currentStep === "password-changed") &&
                "Forgot password"}
            </SheetTitle>
          </SheetHeader>

          <div className="flex justify-center mt-8 h-full w-full">
            {currentStep === "login" && (
              <Login setCurrentStep={setCurrentStep} onSuccess={handleSkipAndLogin} />
            )}

            {currentStep === "register" && (
              <Register setCurrentStep={setCurrentStep} />
            )}

            {currentStep === "otp-register" && (
              <OtpRegister setCurrentStep={setCurrentStep} />
            )}

            {currentStep === "username" && (
              <Username setCurrentStep={setCurrentStep} />
            )}

            {currentStep === "purchase-plan" && (
              <PurchasePlan
                setCurrentStep={setCurrentStep}
                onSkip={handleSkipAndLogin}
              />
            )}

            {currentStep === "plan-selected" && (
              <PlanSelected setCurrentStep={setCurrentStep} />
            )}

            {currentStep === "subscription-confirmation" && (
              <SubscriptionConfirmation
                setCurrentStep={setCurrentStep}
                onClose={handleSkipAndLogin}
              />
            )}

            {currentStep === "forgot-password" && (
              <ForgotPassword setCurrentStep={setCurrentStep} />
            )}

            {currentStep === "otp" && <Otp setCurrentStep={setCurrentStep} />}

            {currentStep === "reset-password" && (
              <ResetPassword setCurrentStep={setCurrentStep} />
            )}

            {currentStep === "password-changed" && (
              <PasswordChanged setCurrentStep={setCurrentStep} />
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AuthSidebar;
