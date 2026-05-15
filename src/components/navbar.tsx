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
import { useMe } from "@/features/auth/hooks";
import { PlanSkeleton } from "./skeleton";
import { Skeleton } from "./ui/skeleton";
import PlanSuccessDialog from "./ui/plan-success-dialog";
import { useRouter, useSearchParams } from "next/navigation";
import { useRequireProfileCompletion } from "@/hooks/api/use-require-profile-completion";
import { useFcmNotification } from "@/hooks/api/use-fcm-notification";
import { useEffect, useState } from "react";
import { getToken } from "@/lib/cookies";

const Navbar = () => {
  const { data: user, isLoading, refetch } = useMe();
  const token = getToken()
  const searchParams = useSearchParams();
  const router = useRouter();
  const isPlanParam = searchParams.get("plan") === "success";
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  
  useEffect(() => {
    if (isPlanParam && !isLoading) {
      refetch().then((result) => {
        if (result.data?.data?.isSellerPlanPurchased) {
          setShowSuccessDialog(true);
        } else {
          const url = new URL(window.location.href);
          url.searchParams.delete("plan");
          router.replace(url.pathname + url.search, { scroll: false });
        }
      });
    }
  }, [isPlanParam, isLoading]);
  
  const handleClose = () => {
    setShowSuccessDialog(false);
    const url = new URL(window.location.href);
    url.searchParams.delete("plan");
    router.replace(url.pathname + url.search, { scroll: false });
  };
  useRequireProfileCompletion(user, isLoading);
  useFcmNotification();
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
          {!isLoading && user && (
            <>
              <MessageNotificationMenu />
              <ProfileMenu profileData={user?.data} />
              {/* <Link href={"/seller/plans"}> */}
              <Button
                disabled={!user?.data?.isProfileCompleted}
                onClick={() => router.push("/seller/plans")}
                className="bg-[#415A77] rounded-full flex gap-2 items-center w-[154px] h-[45px] max-w-full"
              >
                <span>Start Selling</span> <ArrowRight size={15} />
              </Button>
              {/* </Link>{" "} */}
            </>
          )}
          {isLoading && (
            <Skeleton className="h-12 bg-gray-200 w-24 rounded-full" />
          )}
          <AuthSidebar hideTrigger={!!user || isLoading} loader={isLoading} />
        </div>
      </div>
      <div className="bg-(--primary) text-white text-center py-3">
        <div className="max-w-screen-2xl mx-auto">
          <b>Disclaimer:</b> Bid the Bezel is not liable for any inaccuracies or
          failures resulting from use.
        </div>
      </div>
      <PlanSuccessDialog open={showSuccessDialog} onOpenChange={handleClose} />
    </div>
  );
};

export default Navbar;
