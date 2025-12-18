"use client";
import { Button } from "@/components/ui/button";
import { FloatingInput } from "@/components/ui/floating-input";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { logout } from "@/lib/slices/authSlice";
import { useRouter } from "next/navigation";

const Profile = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reason, setReason] = useState("");
  const [understand, setUnderstand] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);

  const handleDeleteAccount = () => {
    // if (email === user?.email && password && understand) {
    dispatch(logout());
    router.push("/");
    // }
  };

  return (
    <div className="card">
      <div className="border-b border-border pb-3">
        <h2 className="text-lg font-medium mb-1">Profile</h2>
        <p className="text-[#0D0C0C99]">Change your email and username</p>
      </div>

      <div className="py-6 border-b border-border">
        <form className="grid grid-cols-2 gap-5">
          <FloatingInput
            id="email"
            label="Email"
            defaultValue={"bidthebezel@gmail.com"}
            className="bg-gray-50!"
          />
          <FloatingInput
            id="username"
            label="Unique Username"
            defaultValue={"guessmyusername123"}
            className="bg-gray-50!"
          />

          <div className="col-span-full flex justify-end">
            <Button size={"lg"}>Save</Button>
          </div>
        </form>
      </div>

      <div className="pt-6">
        <p className="mb-3 text-lg font-medium">Subscription Status</p>

        <p>
          <span className="font-bold text-xl">Basic Package</span>{" "}
          <span className="font-light">
            (3 days of trial left - 1 Watch Left)
          </span>
        </p>

        <hr className="my-6 border-border" />

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-red-700 hover:bg-red-800">
              Delete Account
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[90%] w-[420px]">
            <DialogHeader>
              <DialogTitle className="text-2xl">Delete account</DialogTitle>
              <DialogDescription>
                <p className="text-lg text-gray-700">
                  We’re sorry to see you go.
                </p>
                <p className="text-base">
                  Once you delete your account your profile data will be
                  permanently deleted from bid the bezel. Your past orders
                  details and orders sold data wont be deleted from our site.
                </p>
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <FloatingInput
                id="delete-reason"
                label="Reason for deletion (optional)"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
              <FloatingInput
                id="delete-email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FloatingInput
                id="delete-password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="understand"
                  checked={understand}
                  onChange={(e) => setUnderstand(e.target.checked)}
                  className="accent-green-600 w-8 h-8 rounded-xl"
                />
                <label htmlFor="understand" className="text-sm">
                  I understand that deleted accounts aren't recoverable.
                </label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                className="bg-red-700 hover:bg-red-800"
                onClick={handleDeleteAccount}
                disabled={!email || !password || !understand || !email}
              >
                Delete Account
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Profile;
