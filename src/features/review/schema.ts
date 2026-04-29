import { z } from "zod";

export const reviewSchema = z.object({
    productId: z.string().optional(),
    stars: z.coerce
        .number()
        .min(1, "Please select stars")
        .max(5),

    description: z.string().min(1, "Description is required"),
});

export type ReviewPaylod = z.infer<typeof reviewSchema>;