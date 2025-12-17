"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumbs";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const ResetPassword = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Directly proceed to success state (no validation)
    // TODO: Call API to reset password if needed.
    setSubmitted(true);
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
                Reset Password
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {submitted ? (
        <div className="h-screen flex items-start">
          <div className="container mx-auto px-6 py-12">
            <div className="w-[520px] max-w-full mx-auto text-center">
              <h2 className="text-xl font-semibold mb-2">Password Changed.</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Your password has been successfully changed.
              </p>

              <div className="max-w-xs mx-auto">
                <Button
                  onClick={() => router.push("/profile")}
                  className="w-full h-12 rounded-full bg-primary"
                >
                  Go To Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-6 py-12">
          <div className="w-[340px] max-w-full mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Reset your password</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-14 rounded-xl border border-gray-200 px-4 placeholder:text-muted-foreground focus:outline-none"
              />

              <input
                type="password"
                placeholder="Re enter password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="h-14 rounded-xl border border-gray-200 px-4 placeholder:text-muted-foreground focus:outline-none"
              />

              <Button
                type="submit"
                className="w-full h-12 rounded-full bg-primary"
              >
                Reset Password
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
