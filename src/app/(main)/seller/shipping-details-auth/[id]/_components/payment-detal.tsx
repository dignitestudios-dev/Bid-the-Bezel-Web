"use client";
import { Button } from "@/components/ui/button";
import { useAuthenticatePayment } from "@/features/products/hook";
import { useParams, useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { showError } from "@/lib/toast";
import { useGetCard, useSetDefaultCard } from "@/features/billing/hook";
import { useState } from "react";
import AddOtherCard from "./add-card-modal";
import { Elements } from "@stripe/react-stripe-js";
import { useQueryClient } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { BillingPaylod, billingSchema } from "@/features/billing/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FloatingInput } from "@/components/ui/floating-input";
import { usCitiesStates } from "@/constant/country-data";
import { cn } from "@/lib/utils";

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

if (!stripeKey) {
  throw new Error("Missing Stripe key");
}

const stripePromise = loadStripe(stripeKey);

const PaymentDetail = () => {
  const queryClient = useQueryClient();
  const [billingAddressType, setBillingAddressType] = useState(false);
  const [addOtherCardModal, setOtherCardModal] = useState(false);
  const { mutate: setDefaultCard, isPending: isSettingDefaultPending } =
    useSetDefaultCard("");
  const { id } = useParams();
  const router = useRouter();

  const { mutate, isPending } = useAuthenticatePayment();
  const { data, isLoading } = useGetCard();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BillingPaylod>({
    resolver: zodResolver(billingSchema),
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

  const handlePayment = async (shippingDetail: BillingPaylod) => {
    mutate(
      {
        id: id as string,
        shippingDetail,
      },
      {
        onSuccess: async (response) => {
          const status = response?.data?.status;
          const clientSecret = response?.data?.clientSecret;
          const paymentMethodId = response?.data?.paymentMethodId;
          if (!clientSecret) return;

          const stripe = await loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
          );
          if (!stripe) return;
          if (status === "requires_action") {
            const result = await stripe.confirmCardPayment(clientSecret, {
              payment_method: paymentMethodId,
            });

            if (result.error) {
              showError(result.error.message);
              return;
            }

            if (result.paymentIntent?.status === "succeeded") {
              router.push(`/seller/watch-listed?id=${id}`);
              queryClient.invalidateQueries({
                queryKey: ["get-listing-detail", id],
              });
            }
          } else {
            router.push(`/seller/watch-listed?id=${id}`);
          }
        },
      },
    );
  };

  const onSubmit = (data: BillingPaylod) => {
    handlePayment(data);
  };

  return (
    <Elements stripe={stripePromise}>
      <div className="min-h-screen rounded-sm p-4  md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 shadow-sm ">
            <div className="space-y-6">
              <div className="rounded-lg p-6  ">
                <h2 className="text-    lg font-semibold mb-4">Payment</h2>
                {isLoading ? (
                  <div>Loading....</div>
                ) : data?.data?.cards?.length === 0 ? (
                  <div>No Card Added</div>
                ) : (
                  <div className="border rounded-lg ">
                    {data?.data?.cards?.map((card: any, index: number) => (
                      <button
                        onClick={() => {setDefaultCard({ cardId: card._id })}}
                        key={index}
                        className={cn("border-b block w-full text-left" , isSettingDefaultPending && "pointer-events-none opacity-50" , data.data.cards.length - 1 === index && "border-b-0")}
                      >
                        <label className="flex items-center justify-between p-3  cursor-pointer">
                          <div className="flex-1">
                            <div className="font-medium">{card?.brand}</div>
                            <div className="text-sm text-gray-500">
                              •••• •••• •••• {card?.last4}
                            </div>
                          </div>
                          <input
                            type="radio"
                            name="payment"
                            value="visa"
                            checked={card?.default}
                            className="w-5 h-5 checked:bg-white appearance-none border-gray-300 rounded-full border-4 checked:border-emerald-500"
                          />
                        </label>
                      </button>
                    ))}
                  </div>
                )}
                <button
                  onClick={() => setOtherCardModal(true)}
                  className="cursor-pointer text-sm my-4 font-medium"
                >
                  + Add other
                </button>

                <div className=" ">
                  <h2 className="text-lg font-semibold mb-4">
                    Billing Address
                  </h2>
                  <div className="flex flex-col gap-4  border rounded-2xl p-4">
                    {/* <label className="flex items-center gap-3 cursor-pointer">
                                            <div className="relative">
                                                <input
                                                    type="radio"
                                                    name="billingAddress"
                                                    // checked={billingAddressType === "same"}
                                                    // onChange={() => setBillingAddressType("same")}
                                                    className="w-5 h-5 checked:bg-white appearance-none border-gray-300 rounded-full border-4 checked:border-emerald-500"
                                                />
                                            </div>
                                            <span className="text-sm font-medium">
                                                Same as shipping address
                                            </span>
                                        </label> */}
                    {/* <hr /> */}
                    {/* <label className="flex items-center gap-3 cursor-pointer">
                                            <div className="relative">
                                                <input
                                                    type="radio"
                                                    name="billingAddress"
                                                    checked={billingAddressType}
                                                    onClick={() => setBillingAddressType(prev => !prev)}
                                                    className="w-4 h-4 checked:bg-white appearance-none border-gray-300 rounded-full border-4 checked:border-emerald-500"
                                                />
                                            </div>
                                            <span className="text-sm mb-1 font-medium">
                                                Use a different billing address
                                            </span>
                                        </label> */}
                    {/* {billingAddressType && ( */}
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
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
                          error={errors.firstName?.message}
                        />
                        <FloatingInput
                          {...register("lastName")}
                          label="Last Name"
                          id="lastName"
                          error={errors.lastName?.message}
                        />
                      </div>
                      <FloatingInput
                        {...register("address")}
                        label="Address"
                        id="address"
                        error={errors.address?.message}
                      />
                      <FloatingInput
                        {...register("apartment")}
                        label="Apartment, Suite, etc. (optional)"
                        id="apartment"
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
                        disabled={isPending || isSettingDefaultPending}
                        className="w-full bg-slate-900 mt-4 text-white rounded-lg py-3 font-medium hover:bg-slate-800 transition-colors"
                      >
                        {isPending ? "Paying" : "Pay Now"}
                      </Button>
                    </form>

                    {/* )} */}
                  </div>
                  {/* <Link href={"auth-payment-done"} className="w-full mt-6"> */}
                  {/* </Link> */}
                </div>
              </div>
            </div>

            <div className="bg-[#E3E3E3]">
              <div className=" rounded-lg p-6  sticky top-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#14A752] text-white text-sm rounded-lg flex items-center justify-center flex-shrink-0">
                    $250
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">Authentication Fee</div>
                  </div>
                  <div className="text-2xl font-bold mt-1">$250.00</div>
                </div>

                <div className="space-y-3 py-4 border-t border-b">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Fees</span>
                    <span className="font-medium">$250.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Other Fees</span>
                    <span className="font-medium">$0.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">$0.00</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4 pt-2">
                  <span className="font-semibold">TOTAL</span>
                  <span className="text-xl font-bold">USD $250</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddOtherCard
        open={addOtherCardModal}
        setOpen={setOtherCardModal}
        onSuccess={() => {}}
      />
    </Elements>
  );
};
export default PaymentDetail;
