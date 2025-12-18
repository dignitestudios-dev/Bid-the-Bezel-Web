"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const Star = ({ filled }: { filled?: boolean }) => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 24 24"
    fill={filled ? "#F6C453" : "none"}
    stroke={filled ? "#F6C453" : "#E6E6E6"}
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="inline-block"
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const LeaveAReview = () => {
  const router = useRouter();

  const handleSendReview = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white py-16 px-4">
      <div className="w-full max-w-[620px]">
        <div className="rounded-xl border border-gray-200 p-4 flex items-center gap-4 mb-12 shadow-xs">
          <img
            src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=120&h=120&fit=crop"
            alt="product"
            className="w-14 h-14 rounded-md object-cover"
          />

          <div className="flex-1">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-lg font-semibold">
                  Audemars Piguet Royal Oak
                </div>
                <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=24&h=24&fit=crop"
                    alt="user"
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span>Arandomuser</span>
                </div>
              </div>
              <div className="text-lg font-medium ml-auto">$765.76</div>
            </div>
          </div>
        </div>

        <h2 className="text-center text-3xl font-semibold mb-8">
          Leave a Review
        </h2>

        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-6">
            <Star filled />
            <Star />
            <Star />
            <Star />
            <Star />
          </div>
        </div>

        <textarea
          placeholder="Write your review here"
          className="w-full h-40 rounded-lg bg-[#F7F7F7] px-5 py-4 text-gray-700 resize-none mb-8 focus:outline-none focus:ring-2 focus:ring-gray-600"
        />

        <div className="w-full">
          <Button className="w-full py-6 rounded-xl" onClick={handleSendReview}>
            Send Review
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeaveAReview;
