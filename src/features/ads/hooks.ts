import { apiClient } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";

export const useGetAdvertisements = () => {
  return useQuery<AdvertisementsResponse>({
    queryKey: ["get-advertisements"],
    queryFn: async () => {
      const res = await apiClient.get(
        `/advertisements?is_active=true`,
      );
      return res.data;
    },
  });
};