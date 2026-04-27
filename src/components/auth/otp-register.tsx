import React, { useRef, useState, useEffect } from "react";
import { Button } from "../ui/button";
import { useOtpVerify, useResendOtp } from "@/features/auth/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { OtpPayload, otpSchema } from "@/features/auth/Schema";
import { showError, showSuccess } from "@/lib/toast";
import { useForm } from "react-hook-form";
import { setToken } from "@/lib/cookies";

const OtpRegister = ({
  setStep,
  onSuccess,
}: {
  setStep?: (step: AuthStep) => void;
  onSuccess?: () => void;
}) => {
  const { mutate, isPending } = useOtpVerify();
  const { mutate: resendOtp, isPending: isResending } = useResendOtp();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [email, setEmail] = React.useState<string | null>(null);

  useEffect(() => {
    setEmail(localStorage.getItem("email"));
  }, []);
  const [timer, setTimer] = useState(120);

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
    e: React.KeyboardEvent<HTMLInputElement>,
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
    console.log(data);
    mutate(data, {
      onSuccess: (response) => {
        if (response.data?.user) {
          setToken(response?.data?.token);
          setStep?.("username");
        }
      },
      onError: (err: any) => {
        console.error(err);
        showError(err);
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
            showSuccess("OTP sent successfully!");
          },
          onError: (err: any) => {
            showError(err);
          },
        },
      );
    }
  };

  return (
    <div className="w-[420px] max-w-full text-center md:px-0 px-4">
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
            className={`w-14 h-14 rounded-xl text-center text-xl font-bold border-2 focus:outline-none transition-all ${
              errors.otp
                ? "border-red-500"
                : "border-gray-200 focus:border-gray-700"
            }`}
          />
        ))}
      </div>
      {errors.otp && (
        <p className="text-red-500 text-xs mt-2">{errors.otp.message}</p>
      )}

      <Button
        type="submit"
        disabled={false}
        onClick={handleSubmit(onSubmit)}
        className="mt-8 w-full rounded-full"
      >
        {isPending ? "Verifying..." : "Next"}
      </Button>

      <p className="mt-4 text-sm text-gray-600">
        Didn't get code?{" "}
        <button
          onClick={handleResend}
          disabled={isResending || timer > 0}
          className="font-semibold text-black cursor-pointer hover:underline disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {isResending
            ? "Resending..."
            : timer > 0
              ? `Resend in ${formatTime(timer)}`
              : "Resend"}
        </button>
      </p>
      <button
        onClick={() => setStep?.("login")}
        className="mt-4 cursor-pointer hover:underline text-sm text-gray-600"
      >
        Change Email
      </button>
    </div>
  );
};

export default OtpRegister;
