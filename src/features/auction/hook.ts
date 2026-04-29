import { useApiMutation } from "@/hooks/api/use-api-mutation";
import { AuctionWatchPayload } from "./schema";
import { showError, showSuccess } from "@/lib/toast";


export const useAddAuctionProduct = () =>
    useApiMutation<any, AuctionWatchPayload>({
        endpoint: "/products",
        method: "POST",
        isMultiPart: true,
        toBody: (data) => {
            const formData = new FormData();
            formData.append("auctionDays", String(data.auctionDays));
            formData.append("brandName", data.watchBrand);
            formData.append("model", data.modelReference);
            formData.append("price", String(data.price));
            formData.append("description", data.contents);
            formData.append("referenceId", String(data.referenceId));
            formData.append("type", 'auction');
            formData.append("status", 'draft');

            data.photos?.forEach((photo) => {
                if (photo.file) {
                    formData.append("images", photo.file);
                }
            });
            return formData;
        },
        invalidateKeys: ["get-profile", "get-my-listing"],
        mutationOptions: {
            onSuccess: (data) => {
                showSuccess(data?.message)
            },
            onError: (err) => {
                showError(err?.message)
            }
        },
    });