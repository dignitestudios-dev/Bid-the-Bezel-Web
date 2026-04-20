import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required").max(255, "Email must be at most 255 characters")
        .email("Invalid email address"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(12, "Password must be at most 12 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
            "Password must include uppercase, lowercase, number, and special character"
        ),
    method: z.literal("email"),
});

export type LoginPayload = z.infer<typeof loginSchema>;

export const otpSchema = z.object({
    email: z.string().email("Invalid email address"),
    otp: z.string().length(5, "OTP is required"),
});

export type OtpPayload = z.infer<typeof otpSchema>;

export const resendOtpSchema = z.object({
    email: z.string().email("Invalid email address"),
});

export type ResendOtpPayload = z.infer<typeof resendOtpSchema>;

export const completeProfileSchema = z.object({
    userName: z
        .string({ message: "Username is required" })
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must be at most 20 characters")
        .trim()
        .regex(/^\S+$/, "Username must not contain spaces"),
    profilePicture: z
        .any()
        .refine((file) => file instanceof File && file.size > 0, "Profile picture is required"),
});

export type CompleteProfilePayload = z.infer<typeof completeProfileSchema>;

export const checkUsernameSchema = z.object({
    userName: z.string().min(3, "Username must be at least 3 characters"),
});

export type CheckUsernamePayload = z.infer<typeof checkUsernameSchema>;

export const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
});

export type ForgotPasswordPayload = z.infer<typeof forgotPasswordSchema>;

export const updatePasswordSchema = z
    .object({
        password: z.string()
            .min(6, "Password must be at least 6 characters")
            .max(12, "Password must be at most 12 characters")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                "Password must include uppercase, lowercase, number, and special character"
            ),
        confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters"),
        resetToken: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export type updatePasswordPayload = z.infer<typeof updatePasswordSchema>;

export const updateProfileSchema = z.object({
    userName: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must be at most 20 characters")
        .optional(),
    profilePicture: z.any().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
});

export type UpdateProfilePayload = z.infer<typeof updateProfileSchema>;


export const personalDetailSchema = z.object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(8, "Phone number is required"),
});

export type PersonalDetailPayload = z.infer<typeof personalDetailSchema>;


export const deleteAccountOtpSchema = z.object({
    otp: z
        .string()
        .length(5, "OTP must be exactly 5 digits")
        .regex(/^\d+$/, "OTP must contain only numbers"),
});

export type DeleteAccountOtpPayload = z.infer<typeof deleteAccountOtpSchema>;


export const changePasswordSchema = z.object({
    password: z.string().min(6, "Current Password must be at least 6 characters"),
    newPassword: z.string().min(6, "New Password must be at least 6 characters"),
});

export type ChangePasswordPayload = z.infer<typeof changePasswordSchema>;
