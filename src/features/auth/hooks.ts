"use client";

import { useApiMutation } from "@/hooks/api/useApiMutation";
import { apiClient } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";


// post | put | patch | delete
export const useLogin = () =>
  useApiMutation<AuthResponse, LoginPayload>({
    endpoint: "/auth/login",
    mutationOptions: {
      onSuccess: (data) => {
        localStorage.setItem("token", data.token);
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
        window.location.href = "/login";
      },
    
    },
  });

  //get queries like below

  export const useMe = () =>
  useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await apiClient.get("/auth/me");
      return res.data;
    },
  });