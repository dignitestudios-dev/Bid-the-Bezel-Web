import z from "zod";

export const orderSchema = z.object({
    country: z.string(),
    state: z.string().min(1, "State is required"),
    city: z.string().min(1, "City is required"),
    firstName: z
        .string()
        .min(1, "First name is required")
        .regex(/^[A-Za-z\s]+$/, "First name must contain only letters"),

    lastName: z
        .string()
        .min(1, "Last name is required")
        .regex(/^[A-Za-z\s]+$/, "Last name must contain only letters"),
    address: z.string().min(1, "Address is required"),
    apartment: z.string().optional(),
    phone: z
        .string()
        .regex(/^[0-9]+$/, "Phone number must contain only digits")
        .length(10, "Phone number must be exactly 10 digits"),


    postalCode: z
        .string()
        .regex(/^[0-9]{5,6}$/, "Postal code must be 5 or 6 digits")
        .optional()
        .or(z.literal("")), 
});

export type OrderShippingDetails = z.infer<typeof orderSchema>;