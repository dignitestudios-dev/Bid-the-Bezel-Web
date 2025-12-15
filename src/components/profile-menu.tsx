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

const ProfileMenu = () => {
  const dispatch = useAppDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

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
            <div className="w-16 h-16 bg-[#2881E8] rounded-xl text-white font-semibold flex justify-center items-center">
              BT
            </div>
            <p className="font-semibold">Bid the Bezel</p>
            <p className="text-gray-400 font-light text-sm">
              bidthebezel@gmail.com
            </p>
          </div>
          <div className=" space-y-3">
            <DropdownMenuItem className="font-semibold">
              <User />
              Profile
            </DropdownMenuItem>
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
        onConfirm={() => dispatch(logout())}
      />
    </>
  );
};

export default ProfileMenu;
