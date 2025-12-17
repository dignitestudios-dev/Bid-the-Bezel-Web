"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumbs";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const ChangePassword = () => {
  const router = useRouter();
  const [values, setValues] = useState<string[]>(["", "", "", ""]);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const focusInput = (idx: number) => {
    const el = inputsRef.current[idx];
    el?.focus();
    el?.select();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    if (!val) {
      updateValueAtIndex("", idx);
      return;
    }

    // take only first char
    const char = val.charAt(0);
    updateValueAtIndex(char, idx);

    // move to next
    if (idx < 3) focusInput(idx + 1);

    // if last and all filled, verify
    const newVals = [...values];
    newVals[idx] = char;
    if (newVals.every((v) => v !== "")) {
      handleVerify(newVals.join(""));
    }
  };

  const updateValueAtIndex = (val: string, idx: number) => {
    setValues((prev) => {
      const next = [...prev];
      next[idx] = val;
      return next;
    });
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    const key = e.key;
    if (key === "Backspace") {
      if (values[idx] === "") {
        if (idx > 0) focusInput(idx - 1);
      } else {
        updateValueAtIndex("", idx);
      }
    } else if (key === "ArrowLeft") {
      if (idx > 0) focusInput(idx - 1);
    } else if (key === "ArrowRight") {
      if (idx < 3) focusInput(idx + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4);
    if (!paste) return;
    const chars = paste.split("");
    const next = ["", "", "", ""];
    for (let i = 0; i < chars.length; i++) next[i] = chars[i];
    setValues(next);
    const lastFilled = Math.min(chars.length - 1, 3);
    focusInput(Math.min(chars.length, 3));
    if (next.every((v) => v !== "")) handleVerify(next.join(""));
  };

  const handleVerify = (code?: string) => {
    // In a real app you'd verify the code with the server here.
    // After successful verification navigate to reset-password page.
    router.push("/reset-password");
  };

  return (
    <div className="h-screen p-10">
      <div className="flex items-center gap-4 mb-10">
        <Link href="/profile" className="text-gray-700 hover:text-gray-900">
          <ArrowLeft />
        </Link>

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/profile">Profile</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold">
                Change Password
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto text-center py-12">
          <h1 className="text-2xl font-semibold mb-2">
            Enter the 4 digit code
          </h1>
          <p className="text-sm text-muted-foreground mb-1">
            A 4 digit code have been send to your email
          </p>
          <p className="font-semibold mb-6">“bidthebezel@gmail.com”.</p>

          <div className="flex items-center justify-center gap-4 mt-8">
            {[0, 1, 2, 3].map((i) => (
              <input
                key={i}
                ref={(el) => {
                  inputsRef.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="w-16 h-16 rounded-lg bg-[#F7F7F7] text-center text-lg font-medium outline-none focus:ring-2 focus:ring-offset-0 focus:ring-[#415A77]"
                value={values[i]}
                onChange={(e) => handleChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                onPaste={handlePaste}
                aria-label={`Digit ${i + 1}`}
              />
            ))}
          </div>

          <div className="mt-6">
            <p className="text-sm text-muted-foreground">
              Didn’t get code?{" "}
              <button className="font-semibold underline">Resend</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
