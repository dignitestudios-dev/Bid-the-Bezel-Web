"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useAddReview } from "@/features/review/hooks";
import { ReviewPaylod, reviewSchema } from "@/features/review/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const LeaveAReviewModal = ({
  open,
  onOpenChange,
  selectedReview
}: {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  selectedReview: any
}) => {




  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      stars: 0,
    },
  });

  const stars = watch("stars") as number;

  const { mutate: addReview, isPending: addReviewPending } = useAddReview()
  const handleSendReview = (data: any) => {
    addReview(
      {
        productId: selectedReview?.product?._id,
        ...data
      },
      {
        onSuccess: () => {
          reset();
          onOpenChange(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[620px] p-0 overflow-hidden">

        <div className="bg-white py-10 px-6">
          {/* Product Card */}
          <div className="rounded-xl border border-gray-200 p-4 flex items-center gap-4 mb-10 shadow-xs">
            <img
              src={selectedReview?.product?.images?.[0]?.location}
              alt="product"
              className="w-14 h-14 rounded-md object-cover"
            />

            <div className="flex-1">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-lg font-semibold">
                    {selectedReview?.product?.brandName}
                  </div>
                  <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                    <img
                      src={selectedReview?.seller?.profilePicture?.location}
                      alt="user"
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span>{selectedReview?.seller?.userName}</span>
                  </div>
                </div>
                <div className="text-lg font-medium ml-auto">${selectedReview?.product?.soldPrice}</div>
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-center text-3xl font-semibold mb-8">
            Leave a Review
          </h2>

          {/* Stars */}
          <form onSubmit={handleSubmit(handleSendReview)}>
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setValue("stars", star, { shouldValidate: true })}
                  >

                    <Star filled={star <= stars} />

                  </button>
                ))}
              </div>
            </div>
            {errors.stars && (
              <p className="text-red-500 text-center text-sm mb-4">
                {errors.stars.message}
              </p>
            )}
            <input type="hidden" {...register("stars")} />


            {/* Textarea */}
            <textarea
              placeholder="Write your review here"
              {...register("description")}
              maxLength={250}
              className="w-full h-40 rounded-lg bg-[#F7F7F7] px-5 py-4 text-gray-700 resize-none mb-8 focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mb-4">{errors.description.message}</p>
            )}

            {/* Button */}
            <Button
              disabled={addReviewPending}

              className="w-full py-6 rounded-xl"
              type="submit"
            >
              {addReviewPending ? "Sending..." : "Send Review"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeaveAReviewModal;