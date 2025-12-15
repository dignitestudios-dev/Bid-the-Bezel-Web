import React, { useRef, useState } from "react";
import { Button } from "../ui/button";

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

const OtpRegister = ({
  setCurrentStep,
}: {
  setCurrentStep?: React.Dispatch<React.SetStateAction<Step>>;
}) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleOtpChange = (index: number, value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");

    if (numericValue.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = numericValue;
    setOtp(newOtp);

    if (numericValue && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  return (
    <div className="w-[420px] max-w-full text-center">
      <h2 className="text-2xl font-semibold">Verify your email</h2>
      <p className="text-sm text-gray-600 mt-3">
        A 4 digit code have been send to your email
      </p>

      <div className="flex justify-center gap-3 mt-8">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              if (el) inputRefs.current[index] = el;
            }}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleOtpChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-16 h-16 rounded-md bg-gray-50 text-center text-xl font-bold border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
          />
        ))}
      </div>

      <Button
        onClick={() => setCurrentStep?.("username")}
        className="mt-8 w-full rounded-full"
      >
        Next
      </Button>

      <p className="mt-4">
        Didn't get code?{" "}
        <button className="font-semibold cursor-pointer">Resend</button>
      </p>
    </div>
  );
};

export default OtpRegister;
