"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const Password = () => {
  const router = useRouter();

  const handleChangePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push("/change-password");
  };

  return (
    <div className="card">
      <p className="text-lg font-medium">Password</p>

      <form onSubmit={handleChangePassword}>
        <input
          type="text"
          placeholder="Change your password"
          className="w-full py-3 outline-none border-b border-border"
        />

        <Button className="mt-10">Change Password</Button>
      </form>
    </div>
  );
};

export default Password;
