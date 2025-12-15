import React from "react";
import { FloatingInput } from "../ui/floating-input";
import { Button } from "../ui/button";
import Google from "../icons/Google";
import Apple from "../icons/Apple";

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

const Login = ({
  setCurrentStep,
  onSuccess,
}: {
  setCurrentStep?: React.Dispatch<React.SetStateAction<Step>>;
  onSuccess?: () => void;
}) => {
  return (
    <div className="w-[340px] max-w-full">
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">Welcome Back</h2>

        <FloatingInput id="email" label="Email" type="email" />
        <FloatingInput id="password" label="Password" type="password" />

        <div className="w-full flex justify-end">
          <button
            onClick={() => setCurrentStep?.("forgot-password")}
            className="text-sm text-end font-medium cursor-pointer"
          >
            Forgot your password?
          </button>
        </div>

        <Button onClick={onSuccess} className="w-full rounded-full">
          Log In
        </Button>
      </div>

      <div className="flex items-center gap-3 py-5">
        <div className="w-full h-[1.5px] bg-gray-200" />
        <p className="text-gray-600 text-sm font-medium">Or</p>
        <div className="w-full h-[1.5px] bg-gray-200" />
      </div>

      <div className="space-y-3">
        <Button className="bg-[#F7F7F7] hover:bg-[#f3f3f3] rounded-full w-full text-black">
          <Google />
          Continue with Google
        </Button>

        <Button className="bg-[#F7F7F7] hover:bg-[#f3f3f3] rounded-full w-full text-black">
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
