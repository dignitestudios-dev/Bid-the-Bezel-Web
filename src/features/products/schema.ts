import { z } from "zod";

export const watchDetailSchema = z.object({
    watchBrand: z
        .string()
        .min(2, "Watch brand is required")
        .max(50, "Watch brand must be at most 50 characters"),

    modelReference: z
        .string()
        .min(2, "Model reference is required")
        .max(50, "Model reference must be at most 50 characters"),

    referenceId: z
        .string()
        .max(30, "Reference ID must be at most 30 characters")
        .optional(),

    price: z
       .coerce.number()
        .min(1, "Price is required")
        .max(1000000, "Price must be at most 1,000,000")
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
});

export type WatchDetailPayload = z.infer<typeof watchDetailSchema>;



export const shippingSchema = z.object({
    courier: z.string().min(1, "Courier is required"),
    trackingNumber: z.string().min(1, "Reference ID is required"),
    trackingLink: z
        .string()
        .url("Enter a valid URL")
        .refine((val) => val.trim() !== "", "Tracking link is required"),
    images: z.any().optional(),
});

export type ShippingPayload = z.infer<typeof shippingSchema>;
