import { z } from "zod";

export const auctionWatchSchema = z.object({
    auctionDays: z
        .number()
        .min(1, "Auction days is required")
        .max(7, "Auction days must be at most 7"),
    watchBrand: z
        .string()
        .min(2, "Watch brand is required")
        .max(50, "Watch brand must be at most 50 characters"),

    modelReference: z
        .string()
        .min(2, "Model reference is required")
        .max(50, "Model reference must be at most 50 characters")
        .regex(
            /^[a-zA-Z0-9\s-]+$/,
            "Model reference must not contain special characters"
        ),

    referenceId: z
        .string()
        .max(30, "Reference ID must be at most 30 characters")
        .optional(),
    price: z
        .coerce.number()
        .min(5000, "Minimum auction price is $5000")
        .max(10000000, "Maximum auction price is $10,000,000")
        .multipleOf(0.01, {
            message: "Max 2 decimal places allowed",
        }),

    contents: z
        .string()
        .min(2, "Contents is required")
        .max(1000, "Contents must be at most 1000 characters"),
    photos: z
        .array(
            z.object({
                file: z.any().optional(),
                name: z.string(),
                url: z.string(),
            })
        )
        .min(1, "At least 1 photo is required")
        .max(10, "Maximum 10 photos allowed")
        .refine(
            (photos) =>
                photos.every((p) => {
                    if (!p.file) return true;
                    return p.file.size <= 5 * 1024 * 1024; // 5MB
                }),
            "Each image must be 5MB or less"
        ),
    isReserved: z.boolean().default(false),
  reservePrice: z.coerce
  .number()
  .min(5000, "Minimum reserve price is $5000")
  .max(10000000, "Maximum reserve price is $10,000,000")
  .multipleOf(0.01, {
    message: "Max 2 decimal places allowed",
  })
  .optional(),
});

export type AuctionWatchPayload = z.infer<typeof auctionWatchSchema>;
