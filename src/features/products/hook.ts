import { useApiMutation } from "@/hooks/api/use-api-mutation";
import { WatchDetailPayload } from "./schema";
import { showError, showSuccess } from "@/lib/toast";
import { AuthenticatePayload } from "@/app/(main)/seller/shipping-details-auth/[id]/_components/shipping-form";


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
            formData.append("referenceId", String(data.referenceId));
            formData.append("type", 'fixed_price');
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

export const useUnAuthenticate = () =>
    useApiMutation<any, { id: string }>({
        endpoint: ({ id }) => `/products/${id}/unauthenticate/seller`,
        method: "POST",
        invalidateKeys: ["get-profile", "get-cards", "shipping-result", "get-my-listing"],
        mutationOptions: {
            onError: (err) => {
                showError(err);
            },
        },
    });

export const useUpdateProduct = () =>
    useApiMutation<any, { id: string; brandName: string; description: string; model: string }>({
        endpoint: ({ id }) => `/products/${id}`,
        method: "PATCH",
        isMultiPart: false, // no files → use JSON
        toBody: (data) => ({
            brandName: data.brandName,
            description: data.description,
            model: data.model,

        }),
        invalidateKeys: ["get-profile", "get-my-listing"],
        mutationOptions: {
            onSuccess: (data) => {
                showSuccess(data?.message);
            },
            onError: (err) => {
                showError(err?.message);
            },
        },
    });
export const deleteProduct = () =>
    useApiMutation<any, { id: string }>({
        endpoint: ({ id }) => `/products/${id}`,
        method: "DELETE",
        invalidateKeys: ["get-cards", "get-my-listing", "get-my-active-listing" , "get-my-deleted-listing"],
        mutationOptions: {
            onSuccess: (data) => {
                showSuccess(data?.message);
            },
            onError: (err) => {
                showError(err?.message);
            },
        },
    });

export const useAuthenticate = () =>
    useApiMutation<any, AuthenticatePayload>({
        endpoint: ({ id }) => `/products/${id}/authenticate/seller`,
        method: "POST",
        isMultiPart: true,
        invalidateKeys: ["get-profile", "get-cards"],
        toBody: (variables) => {
            const formData = new FormData();
            formData.append("courier", variables.courier);
            formData.append("trackingNumber", variables.trackingNumber);
            formData.append("trackingLink", variables.trackingLink);
            formData.append("isDraft", String(Boolean(variables.isDraft)));
            const filesArray = Array.from(variables.images || []);
            filesArray.forEach((file: any) => {
                formData.append("images", file);
            });

            return formData;
        },
        mutationOptions: {
            onError: (err) => {
                showError(err);
            },
        },
    });

export const useAuthenticatePayment = () =>
    useApiMutation<any, any>({
        endpoint: ({ id }) => `/products/${id}/authenticate/seller/payment`,
        method: "POST",
        invalidateKeys: ["get-profile", "get-cards"],
        mutationOptions: {
            onError: (err) => {
                showError(err);
            },
        },
    });
