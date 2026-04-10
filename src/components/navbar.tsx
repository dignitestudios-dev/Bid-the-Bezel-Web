"use client";
import Logo from "./logo";
import Link from "next/link";
import AuthSidebar from "./auth-sidebar";
import { useAppSelector } from "@/lib/hooks";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import ProfileMenu from "./profile-menu";
import MessageNotificationMenu from "./message-notification-menu";
import CategoriesMenu from "./CategoriesMenu";

const Navbar = () => {
  const user = useAppSelector((state) => state.auth);

  return (
    <div>
      <div className="flex justify-between w-[90%] py-4 max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-8">
          <Logo />
          <div className="flex gap-6 capitalize  font-semibold text-[#0D1B2A]">
            <Link href={"/collections"}>collection</Link>

            <CategoriesMenu />
          </div>
        </div>
        <div className="flex items-center gap-2">
          {user.isLoggedIn && (
            <>
              <MessageNotificationMenu />
              <ProfileMenu profileData={user?.user} />
              <Link href={"/seller/plans"}>
                <Button className="bg-[#415A77] rounded-full flex gap-2 items-center w-[154px] h-[45px] max-w-full">
                  <span>Start Selling</span> <ArrowRight size={15} />
                </Button>
              </Link>{" "}
            </>
          )}
          <AuthSidebar hideTrigger={user.isLoggedIn} />
        </div>
      </div>
      <div className="bg-(--primary) text-white text-center py-3">
        <div className="max-w-screen-2xl mx-auto">
          <b>Disclaimer:</b> Nebula Time is not liable for any inaccuracies or
          failures resulting from use.
        </div>
      </div>
    </div>
  );
};

export default Navbar;
