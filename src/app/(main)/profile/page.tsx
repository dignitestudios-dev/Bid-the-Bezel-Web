import { Button } from "@/components/ui/button";
import { FloatingInput } from "@/components/ui/floating-input";
import React from "react";

const Profile = () => {
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
      </div>
    </div>
  );
};

export default Profile;
