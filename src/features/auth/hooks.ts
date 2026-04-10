"use client";

import { useApiMutation } from "@/hooks/api/useApiMutation";
import { apiClient } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";
import { CheckUsernamePayload, CompleteProfilePayload, ForgotPasswordPayload, LoginPayload, OtpPayload, ResendOtpPayload, updatePasswordPayload, UpdateProfilePayload } from "./Schema";
import { login } from "@/lib/slices/authSlice";


// post | put | patch | delete
export const useLogin = () =>
  useApiMutation<AuthResponse, LoginPayload>({
    endpoint: "/auth",
    method: "POST",
    invalidateKeys: ["get-profile"],
    mutationOptions: {
      onSuccess: (data) => {
        localStorage.setItem("email", data?.data?.user?.email);
        localStorage.setItem("token", data?.data?.token);
      },
    },
  });


export const useOtpVerify = () =>
  useApiMutation<AuthResponse, OtpPayload>({
    endpoint: "/auth/verify-email",
    method: "POST",
    mutationOptions: {
      onSuccess: (data) => {
        // Succes
      },
    },
  });

export const useForgotOtpVerify = () =>
  useApiMutation<AuthResponse, OtpPayload>({
    endpoint: "/auth/verify-otp",
    method: "POST",
    mutationOptions: {
      onSuccess: (data) => {
        // Succes
      },
    },
  });

export const useForgotPassword = () =>
  useApiMutation<void, ForgotPasswordPayload>({
    endpoint: "/auth/forgot",
    method: "POST",
    mutationOptions: {
      onSuccess: (data) => {
        // Succes
      },
    },
  });
export const useUpdatePassword = () =>
  useApiMutation<void, updatePasswordPayload>({
    endpoint: "/auth/update-password",
    method: "POST",
    mutationOptions: {
      onSuccess: (data) => {

      },
    },
  });

export const useResendOtp = () =>
  useApiMutation<AuthResponse, ResendOtpPayload>({
    endpoint: "/auth/email-verification-otp",
    method: "POST",
    mutationOptions: {
      onSuccess: (data) => {
        if (data.data?.token) {
          localStorage.setItem("token", data.data.token);
        }
      },
    },
  });

export const useCheckUsername = () =>
  useApiMutation<CheckUsernameResponse, CheckUsernamePayload>({
    endpoint: "/users/check-username",
    method: "POST",
  });

export const useCompleteProfile = () =>
  useApiMutation<AuthResponse, CompleteProfilePayload>({
    endpoint: "/users/complete-profile",
    method: "POST",
    isMultiPart: true,
    invalidateKeys: ["get-profile"],
    mutationOptions: {
      onSuccess: (data) => {
        if (data.data?.token) {
          localStorage.setItem("token", data.data.token);
        }
      },
    },
  });

export const useUpdateProfile = () =>
  useApiMutation<AuthResponse, UpdateProfilePayload>({
    endpoint: "/users",
    method: "PATCH",
    isMultiPart: true,
    invalidateKeys: ["get-profile"],
    mutationOptions: {
      onSuccess: (data) => {
        // Success
      },
    },
  });

export const useLogout = () =>
  useApiMutation<void, void>({
    endpoint: "/auth/logout",
    method: "POST",
    mutationOptions: {
      onSuccess: () => {
        localStorage.removeItem("token");
        // window.location.href = "/login";
      },

    },
  });

//get queries like below

export const useMe = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return useQuery({
    queryKey: ["get-profile"],
    queryFn: async () => {
      const res = await apiClient.get("/users/me");
      return res.data;

    },
    enabled: !!token
  });
};