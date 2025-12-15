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

const Register = ({
  setCurrentStep,
}: {
  setCurrentStep?: React.Dispatch<React.SetStateAction<Step>>;
}) => {
  return (
    <div className="w-[340px] max-w-full">
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">Lets get your account set up</h2>

        <FloatingInput id="email" label="Email" type="email" />
        <FloatingInput id="password" label="Password" type="password" />

        <Button
          onClick={() => setCurrentStep?.("otp-register")}
          className="w-full rounded-full"
        >
          Create Account
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
          Already have an account?{" "}
          <button
            onClick={() => setCurrentStep?.("login")}
            className="font-semibold cursor-pointer"
          >
            Log In
          </button>
        </p>

        <p className="font-medium text-center text-sm mt-5">
          By creating an account using email, Google or Apple, I agree to the{" "}
          <button className="underline font-normal cursor-pointer">Terms & Conditions</button> and
          acknnowledge the{" "}
          <button className="underline font-normal cursor-pointer">Privacy Policy</button>
        </p>
      </div>
    </div>
  );
};

export default Register;
