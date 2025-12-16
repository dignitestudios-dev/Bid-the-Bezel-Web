import Link from "next/link";
import React from "react";

const ProfileLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-medium mb-8">My Account</h1>

      <div className="flex items-start gap-5">
        <div className="w-60 max-w-full">
          <p className="font-medium mb-6">bidthebezel@gmail.com</p>
          <ul className="mr-2 profile-setting-menu space-y-4">
            <li className="bg-[#F7F7F7]">
              <Link href={"/profile"}>Profile</Link>
            </li>
            <li>
              <Link href={"/profile/my-orders"}>My Orders</Link>
            </li>
            <li>
              <Link href={"/profile/password"}>Password</Link>
            </li>
            <li>
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
