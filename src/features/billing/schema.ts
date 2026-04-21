import { z } from "zod";

export const billingSchema = z.object({
    country: z.string().optional(),
    state: z.string().min(1, "State is required"),
    city: z.string().min(1, "City is required"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    address: z.string().min(1, "Address is required"),
    apartment: z.string().optional(),
    phone: z.string().min(5, "Phone is required"),

    postalCode: z.string().optional(),
});

export type BillingPaylod = z.infer<typeof billingSchema>;


