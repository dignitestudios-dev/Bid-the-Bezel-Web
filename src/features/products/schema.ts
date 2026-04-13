import { z } from "zod";

export const watchDetailSchema = z.object({
    watchBrand: z.string().min(2, "Watch brand is required"),
    modelReference: z.string().min(2, "Model reference is required"),
    price: z
        .string()
        .min(1, "Price is required")
        .regex(/^\d+$/, "Only numbers are allowed")
        .refine((val) => Number(val) <= 5000, "Price cannot be more than 5000"),
    contents: z.string().min(2, "Contents is required"),
    photos: z
        .array(
            z.object({
                file: z.any().optional(),
                name: z.string(),
                url: z.string(),
            })
        )
        .min(1, "At least 1 photo is required")
        .max(10, "Maximum 10 photos allowed"),
});

export type WatchDetailPayload = z.infer<typeof watchDetailSchema>;
