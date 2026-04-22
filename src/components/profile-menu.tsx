import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import ProfileUser from "./icons/ProfileUser";
import User from "./icons/User";
import Heart from "./icons/Heart";
import Logout from "./icons/Logout";
import { useAppDispatch } from "@/lib/hooks";
import { logout } from "@/lib/slices/authSlice";
import LogoutDialog from "./auth/LogoutDialog";
import Link from "next/link";
import { useLogout } from "@/features/auth/hooks";
import Image from "next/image";

const ProfileMenu = ({ profileData }: { profileData: User }) => {
  const dispatch = useAppDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const { mutate: logout } = useLogout();

  return (
    <>
      <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger asChild>
          <Button className="border-none ring-0 bg-[#F7F7F7] hover:bg-[#ededed] rounded-full h-14 w-14">
            <ProfileUser />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[260px] max-w-full" align="end">
          <div className="w-full flex flex-col items-center space-y-1 my-4">
            <Image
              src={profileData?.profilePicture?.location || ""}
              alt="profile"
              width={56}
              height={56}
              className="rounded-full w-16 h-16"
            />
            <p className="font-semibold">{profileData?.userName}</p>
            <p className="text-gray-400 font-light text-sm">
              {profileData?.email}
            </p>
          </div>
          <div className=" space-y-3">
            <Link href={"/profile"}>
              <DropdownMenuItem className="font-semibold">
                <User />
                Profile
              </DropdownMenuItem>
            </Link>
            <Link href={"/favorites"}>
              <DropdownMenuItem className="font-semibold">
                <Heart /> Favorites
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="font-semibold"
              onPointerDown={() => {
                setMenuOpen(false);
                setTimeout(() => setLogoutOpen(true), 0);
              }}
            >
              <Logout /> Logout
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <LogoutDialog
        open={logoutOpen}
        onOpenChange={setLogoutOpen}
        onConfirm={() => logout()}
      />
    </>
  );
};

export default ProfileMenu;
