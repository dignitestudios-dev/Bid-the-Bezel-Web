export type OrderShippingDetails = {
    country: string;
    state: string;
    city: string;
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    apartment?: string;
    postalCode?: string;
};

export type OrderPayload = {
    product: string;
    buyerShippingDetails: OrderShippingDetails;
    isAuthRequested: boolean;
};