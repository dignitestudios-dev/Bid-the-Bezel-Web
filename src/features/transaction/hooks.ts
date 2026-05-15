import { apiClient } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";

export const useGetTransactionsDebit = (page: number = 1) => {
    return useQuery({
        queryKey: ["get-transactions-debit", page],
        queryFn: async () => {
            const res = await apiClient.get("/billing/transactions", {
                params: { type: "debit", page, limit: 10 }
            });
            return res.data;
        },
    });
};

export const useGetTransactionsCredit = (page: number = 1) => {
    return useQuery({
        queryKey: ["get-transactions-credit", page],
        queryFn: async () => {
            const res = await apiClient.get("/billing/transactions", {
                params: { type: "credit", page, limit: 10 }
            });
            return res.data;
        },
    });
};
