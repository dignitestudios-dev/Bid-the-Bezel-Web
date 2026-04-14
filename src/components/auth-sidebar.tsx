"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/auth-sidebar-sheet";

import Login from "./auth/login";
import Register from "./auth/register";
import Username from "./auth/username";
import PurchasePlan from "./auth/purchase-plan";
import ForgotPassword from "./auth/forgot-password";
import Otp from "./auth/otp";
import ResetPassword from "./auth/reset-password";
import PasswordChanged from "./auth/password-changed";
import OtpRegister from "./auth/otp-register";
import PlanSelected from "./auth/plan-selected";
import SubscriptionConfirmation from "./auth/subscription-confirmation";

import { Button } from "./ui/button";
import { useQueryClient } from "@tanstack/react-query";

import { useRouter, useSearchParams } from "next/navigation";

//protected steps which require user to complete the previous steps before closing the sidebar
  const PROTECTED_STEPS: AuthStep[] = ["otp-register", "username", "purchase-plan", "plan-selected", "subscription-confirmation"];
const AuthSidebar = ({
  hideTrigger,
  loader,
}: {
  hideTrigger?: boolean;
  loader?: boolean;
}) => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const searchParams = useSearchParams();

  const currentStep = searchParams.get("step") as AuthStep | null;
  const open = !!currentStep;

  const isProtectedStep = !!currentStep && PROTECTED_STEPS.includes(currentStep);

  const setStep = (step: AuthStep) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("step", step);
    router.replace(`?${params.toString()}`);
  };

  const clearStep = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("step");
    router.replace(`?${params.toString()}`);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen && !isProtectedStep) {
      clearStep();
    }
  };

  const handleClose = () => clearStep();

  const handleSkipAndLogin = () => {
    clearStep();
  };

  const renderStep = () => {
    switch (currentStep) {
      case "login":
        return (
          <Login
            setStep={setStep}
            onSuccess={handleClose}
          />
        );

      case "register":
        return (
          <Register
            setStep={setStep}
            onSuccess={handleClose}
          />
        );

      case "otp-register":
        return <OtpRegister setStep={setStep} />;

      case "username":
        return <Username setStep={setStep} />;

      case "purchase-plan":
        return (
          <PurchasePlan
            setStep={setStep}
            onSkip={handleSkipAndLogin}
          />
        );

      case "plan-selected":
        return <PlanSelected setStep={setStep} />;

      case "subscription-confirmation":
        return (
          <SubscriptionConfirmation
            setStep={setStep}
            onClose={handleSkipAndLogin}
          />
        );

      case "forgot-password":
        return <ForgotPassword setStep={setStep} />;

      case "otp":
        return <Otp setStep={setStep} />;

      case "reset-password":
        return <ResetPassword setStep={setStep} />;

      case "password-changed":
        return <PasswordChanged setStep={setStep} />;

      default:
        return null
    }
  };

  const getTitle = () => {
    switch (currentStep) {
      case "login":
        return "Login";
      case "register":
        return "Create an account";
      case "otp-register":
        return "Verify your email";
      case "username":
        return "Enter Unique Username";
      case "purchase-plan":
        return "Choose a Plan";
      case "plan-selected":
        return "Plan Selected";
      case "subscription-confirmation":
        return "Subscribed to Basic Plan";
      case "forgot-password":
      case "otp":
      case "reset-password":
      case "password-changed":
        return "Forgot password";
      default:
        return "Login";
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      {!hideTrigger && (
        <SheetTrigger disabled={loader} asChild>
          <Button onClick={()=>router.push("?step=login")} className="rounded-full flex gap-2 items-center w-[105px] h-[45px] max-w-full">
            <span>Login</span> <ArrowRight size={15} />
          </Button>
        </SheetTrigger>
      )}

      <SheetContent
        onInteractOutside={(e) => { if (isProtectedStep) e.preventDefault(); }}
        className={`${
          currentStep === "plan-selected"
            ? "bg-gray-100"
            : "bg-white"
        } w-[700px]! max-w-[90%] overflow-y-auto`}
      >
        <SheetHeader>
          <SheetTitle className="text-center text-lg">
            {getTitle()}
          </SheetTitle>
        </SheetHeader>

        <div className="flex justify-center mt-8 h-full w-full">
          {renderStep()}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AuthSidebar;