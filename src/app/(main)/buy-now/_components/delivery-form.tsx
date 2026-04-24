import { Button } from '@/components/ui/button';
import { FloatingInput } from '@/components/ui/floating-input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usCitiesStates } from '@/constant/country-data'
import { useCreateOrder } from '@/features/order/hooks';
import { orderSchema } from '@/features/order/schema';
import { showError, showSuccess } from '@/lib/toast';
import { OrderShippingDetails } from '@/types/order';
import { zodResolver } from '@hookform/resolvers/zod';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

if (!stripeKey) {
    throw new Error("Missing Stripe key");
}

const stripePromise = loadStripe(stripeKey);

const DeliveryForm = ({ authenticate, productId,
    basePrice,
    total, }: { authenticate: boolean, productId: string, basePrice: number, total: number }) => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const { mutate, isPending } = useCreateOrder();
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<OrderShippingDetails>({
        resolver: zodResolver(orderSchema),
        defaultValues: {
            country: "US",
            state: "",
            city: "",
            firstName: "",
            lastName: "",
            address: "",
            apartment: "",
            phone: "",
            postalCode: "",
        },
    });

    const state = watch("state");
    const city = watch("city");

    const stateOptions = Array.from(
        new Set(usCitiesStates.map((i) => i.state)),
    ).map((state) => ({
        value: state,
        label: state,
    }));
    const cityOptions = state
        ? usCitiesStates
            .filter((i) => i.state === state)
            .map((i) => ({
                value: i.city,
                label: i.city,
            }))
        : [];

    const onSubmit = (data: OrderShippingDetails) => {
        mutate(
            {
                product: productId,
                buyerShippingDetails: data,
                isAuthRequested: authenticate,
            },
            {
                onSuccess: async (response: any) => {
                    showSuccess('Order placed successfully')
                    const status = response?.data?.status;
                    const clientSecret = response?.data?.clientSecret;
                    const paymentMethodId = response?.data?.paymentMethodId;

                    if (!clientSecret

                    ) return;

                    const stripe = await loadStripe(
                        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
                    );

                    if (!stripe) return;

                    if (status === "requires_action") {
                        const result = await stripe.confirmCardPayment(clientSecret, {
                            payment_method: paymentMethodId,
                        });

                        if (result.error) {
                            showError(result.error.message || "Payment failed");
                            return;
                        }

                        if (result.paymentIntent?.status === "succeeded") {
                            router.push(
                                `/seller/order-completed-buyer?price=${basePrice}&auth=${authenticate ? 250 : 0}&total=${total}`
                            );

                        }
                    } else {
                        router.push(
                            `/seller/order-completed-buyer?price=${basePrice}&auth=${authenticate ? 250 : 0}&total=${total}`
                        );
                    }
                },
            }
        );
    };
    return (
        <div>
            <Elements stripe={stripePromise}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <h2 className="text-xl font-semibold mb-3">Delivery</h2>
                    <div className="mb-4">
                        <Select value="US" disabled>
                            <SelectTrigger className="w-full">
                                <SelectValue>United States</SelectValue>
                            </SelectTrigger>
                        </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <FloatingInput
                            {...register("firstName")}
                            label="First Name"
                            id="firstName"
                            maxLength={50}
                            error={errors.firstName?.message}
                        />
                        <FloatingInput
                            {...register("lastName")}
                            label="Last Name"
                            id="lastName"
                            maxLength={50}
                            error={errors.lastName?.message}
                        />
                    </div>
                    <FloatingInput
                        {...register("address")}
                        label="Address"
                        id="address"
                        maxLength={250}
                        error={errors.address?.message}
                    />
                    <FloatingInput
                        {...register("apartment")}
                        label="Apartment, Suite, etc. (optional)"
                        id="apartment"
                        maxLength={100}
                    />
                    <div className="grid grid-cols-2 mt-4 gap-4 ">
                        <div>
                            <Select
                                value={state}
                                onValueChange={(val) => {
                                    setValue("state", val, { shouldValidate: true });
                                    setValue("city", "", { shouldValidate: true });
                                }}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select State" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectGroup>
                                        {stateOptions.map((s) => (
                                            <SelectItem key={s.value} value={s.value}>
                                                {s.label}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {errors.state && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.state?.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Select
                                value={city}
                                onValueChange={(val) => {
                                    setValue("city", val, { shouldValidate: true });
                                }}
                                disabled={!state}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select City" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectGroup>
                                        {cityOptions.map((c) => (
                                            <SelectItem key={c.value} value={c.value}>
                                                {c.label}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {errors.city && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.city?.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <FloatingInput
                        {...register("postalCode")}
                        label="Postal  code (optional)"
                        id="postalCode"
                        maxLength={5}
                    />
                    <div className="mb-6 flex gap-2">
                        <div className="flex items-center px-3 border rounded-md text-sm bg-gray-50">
                            🇺🇸 +1
                        </div>

                        <div className="w-full">
                            <FloatingInput
                                id="phoneNumber"
                                label="Phone Number"
                                {...register("phone")}
                                maxLength={10}
                                error={errors.phone?.message}
                            />
                        </div>
                    </div>
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-slate-900 mt-4 text-white rounded-lg py-3 font-medium hover:bg-slate-800 transition-colors"
                    >
                        {isPending ? "Paying" : "Pay Now"}
                    </Button>
                </form>
            </Elements>
        </div>
    )
}

export default DeliveryForm