import { useApiMutation } from "@/hooks/api/use-api-mutation";
import { apiClient } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";
import {
  ChangePasswordPayload,
  CheckUsernamePayload,
  CompleteProfilePayload,
  ForgotPasswordPayload,
  LoginPayload,
  OtpPayload,
  ResendOtpPayload,
  updatePasswordPayload,
  UpdateProfilePayload,
} from "./Schema";

import { setToken, removeToken, getToken } from "@/lib/cookies";


/* =========================
   AUTH: LOGIN
========================= */
export const useLogin = () =>
  useApiMutation<AuthResponse, LoginPayload>({
    endpoint: "/auth",
    method: "POST",
    invalidateKeys: ["get-profile"],
    mutationOptions: {
      onSuccess: (data) => {
        const token = data?.data?.token;
        if (token) {
          setToken(token);

        }
        localStorage.setItem("email", data.data.user.email);
      },
    },
  });

/* =========================
   OTP VERIFY
========================= */
export const useOtpVerify = () =>
  useApiMutation<AuthResponse, OtpPayload>({
    endpoint: "/auth/verify-email",
    method: "POST",
  });

/* =========================
   FORGOT OTP VERIFY
========================= */
export const useForgotOtpVerify = () =>
  useApiMutation<AuthResponse, OtpPayload>({
    endpoint: "/auth/verify-otp",
    method: "POST",
  });

/* =========================
   FORGOT PASSWORD
========================= */
export const useForgotPassword = () =>
  useApiMutation<void, ForgotPasswordPayload>({
    endpoint: "/auth/forgot",
    method: "POST",
  });

/* =========================
   UPDATE PASSWORD
========================= */
export const useUpdatePassword = () =>
  useApiMutation<void, updatePasswordPayload>({
    endpoint: "/auth/update-password",
    method: "POST",
  });

/* =========================
   RESEND OTP
========================= */
export const useResendOtp = () =>
  useApiMutation<AuthResponse, ResendOtpPayload>({
    endpoint: "/auth/email-verification-otp",
    method: "POST",
    mutationOptions: {
      onSuccess: (data) => {
        const token = data?.data?.token;

        if (token) {
          setToken(token);
        }
      },
    },
  });

/* =========================
   CHECK USERNAME
========================= */
export const useCheckUsername = () =>
  useApiMutation<CheckUsernameResponse, CheckUsernamePayload>({
    endpoint: "/users/check-username",
    method: "POST",
  });

/* =========================
   COMPLETE PROFILE
========================= */
export const useCompleteProfile = () =>
  useApiMutation<AuthResponse, CompleteProfilePayload>({
    endpoint: "/users/complete-profile",
    method: "POST",
    isMultiPart: true,
    invalidateKeys: ["get-profile"],
    mutationOptions: {
      onSuccess: (data) => {
        const token = data?.data?.token;

        if (token) {
          setToken(token);
        }
      },
    },
  });

/* =========================
   UPDATE PROFILE
========================= */
export const useUpdateProfile = () =>
  useApiMutation<AuthResponse, UpdateProfilePayload>({
    endpoint: "/users",
    method: "PATCH",
    isMultiPart: true,
    invalidateKeys: ["get-profile"],
  });

/* =========================
   LOGOUT
========================= */
export const useLogout = () =>
  useApiMutation<void, void>({
    endpoint: "/auth/logout",
    method: "POST",
    invalidateKeys: ["get-profile"],
    mutationOptions: {
      onSuccess: () => {
        removeToken();
        window.location.href = "/";
      },
    },
  });

export const useDeleteAccount = () =>
  useApiMutation<void, { otp: string }>({
    endpoint: `/auth/delete`,
    method: "POST",
    invalidateKeys: ["get-profile"],
    mutationOptions: {
      onSuccess: () => {
        removeToken();
        window.location.href = "/";
      },
    },
  });

export const useChangePassword = () =>
  useApiMutation<any, ChangePasswordPayload>({
    endpoint: "/auth/change-password",
    method: "POST",
    invalidateKeys: ["get-profile"],

  });
/* =========================
   GET PROFILE (ME)
========================= */
export const useMe = () => {
  return useQuery<MeApiResponse>({
    queryKey: ["get-profile"],
    queryFn: async () => {
      const res = await apiClient.get("/users/me");
      return res.data;
    },
    enabled: getToken() ? true : false,
    staleTime: Infinity,
    gcTime: Infinity,
     retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
};


