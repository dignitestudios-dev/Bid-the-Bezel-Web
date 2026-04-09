import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { OtpPayload, otpSchema } from "@/features/auth/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForgotOtpVerify, useForgotPassword, useOtpVerify, useResendOtp } from "@/features/auth/hooks";

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

const Otp = ({
  setCurrentStep,
}: {
  setCurrentStep?: React.Dispatch<React.SetStateAction<Step>>;
}) => {
  const { mutate, isPending } = useForgotOtpVerify();
  const { mutate: resendOtp, isPending: isResending } = useForgotPassword();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const email = localStorage.getItem('email')
  const [timer, setTimer] = useState(0);


  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);


  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };


  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OtpPayload>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      email: email || "",
      otp: "",
    },
  });


  useEffect(() => {
    setValue("otp", otp.join(""));
  }, [otp, setValue]);

  useEffect(() => {
    if (email) {
      setValue("email", email);
    }
  }, [email, setValue]);

  const handleOtpChange = (index: number, value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");

    if (numericValue.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = numericValue;
    setOtp(newOtp);

    if (numericValue && index < 4) {
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

  const onSubmit = (data: OtpPayload) => {
    mutate(data, {
      onSuccess: (response) => {
        if (response?.data?.token) {
          localStorage.setItem("token", response?.data?.token);
          setCurrentStep?.("reset-password");
        }
      },
      onError: (err) => {
        console.error(err);
      },
    });
  };

  const handleResend = () => {
    if (email && timer === 0) {
      resendOtp(
        { email },
        {
          onSuccess: () => {
            setTimer(120);
          },
        }
      );
    }
  };

  return (
    <div className="">
      <div className="w-[420px] max-w-full text-center">
        <h2 className="text-2xl font-semibold">Verify your email</h2>
        <p className="text-sm text-gray-600 mt-3">
          A 5 digit code has been sent to your email {email}
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
              className={`w-14 h-14 rounded-xl text-center text-xl font-bold border-2 focus:outline-none transition-all ${errors.otp ? "border-red-500" : "border-gray-200 focus:border-gray-700"
                }`}
            />
          ))}
        </div>
        {errors.otp && <p className="text-red-500 text-xs mt-2">{errors.otp.message}</p>}

        <Button
          type="submit"
          disabled={isPending}
          onClick={handleSubmit(onSubmit)}
          className="mt-8 w-full rounded-full"
        >
          {isPending ? "Verifying..." : "Next"}
        </Button>

        <p className="mt-4 text-sm text-gray-600">
          Didn&apos;t get code?{" "}
          <button
            onClick={handleResend}
            disabled={isResending || timer > 0}
            className="font-semibold text-black cursor-pointer hover:underline disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {isResending ? "Resending..." : timer > 0 ? `Resend in ${formatTime(timer)}` : "Resend"}
          </button>

        </p>
      </div>
    </div>
  );
};

export default Otp;
