import { useApiMutation } from "@/hooks/api/useApiMutation";
import { WatchDetailPayload } from "./schema";
import { showError, showSuccess } from "@/lib/toast";

export const useAddProduct = () =>
    useApiMutation<any, WatchDetailPayload>({
        endpoint: "/products",
        method: "POST",
        isMultiPart: true,
        toBody: (data) => {
            const formData = new FormData();
            formData.append("brandName", data.watchBrand);
            formData.append("model", data.modelReference);
            formData.append("price", String(data.price));
            formData.append("description", data.contents);
            formData.append("referenceId", 'PD-12345');
            formData.append("type", 'fixed_price');
            formData.append("status", 'draft');

            data.photos?.forEach((photo) => {
                if (photo.file) {
                    formData.append("images", photo.file);
                }
            });
            return formData;
        },
        invalidateKeys: ["get-profile"],
        mutationOptions: {
            onSuccess: (data) => {
                showSuccess(data?.message)


            },
            onError: (err) => {
                showError(err?.message)
            }
        },
    });

export const useUnAuthenticate = () =>
    useApiMutation<any, { id: string }>({
        endpoint: ({ id }) => `/products/${id}/unauthenticate/seller`,
        method: "POST",
        invalidateKeys: ["get-profile", "get-cards"],
        mutationOptions: {
            onError: (err) => {
                showError(err);
            },
        },
    });