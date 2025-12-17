"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumbs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ProfileLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <div className="p-10">
      <div className="flex items-center gap-4 mb-10">
        <Link href="/" className="text-gray-700 hover:text-gray-900">
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
              <BreadcrumbPage className="font-semibold">Profile</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <h1 className="text-2xl font-medium mb-8">My Account</h1>
      <div className="flex items-start gap-5">
        <div className="w-60 max-w-full">
          <p className="font-medium mb-6">bidthebezel@gmail.com</p>
          <ul className="mr-2 profile-setting-menu space-y-4">
            <li className={isActive("/profile") ? "bg-[#F7F7F7]" : ""}>
              <Link href={"/profile"}>Profile</Link>
            </li>
            <li
              className={isActive("/profile/my-orders") ? "bg-[#F7F7F7]" : ""}
            >
              <Link href={"/profile/my-orders"}>My Orders</Link>
            </li>
            <li className={isActive("/profile/password") ? "bg-[#F7F7F7]" : ""}>
              <Link href={"/profile/password"}>Password</Link>
            </li>
            <li className={isActive("/profile/payments") ? "bg-[#F7F7F7]" : ""}>
              <Link href={"/profile/payments"}>Payments</Link>
            </li>
          </ul>
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default ProfileLayout;
