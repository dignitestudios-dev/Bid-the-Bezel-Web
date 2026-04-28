import { useGetCard, useSetDefaultCard } from "@/features/billing/hook";
import { cn } from "@/lib/utils";
import AddOtherCard from "../../seller/shipping-details-auth/[id]/_components/add-card-modal";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

if (!stripeKey) {
    throw new Error("Missing Stripe key");
}

const stripePromise = loadStripe(stripeKey);
const CardsList = () => {
    const [addOtherCardModal, setOtherCardModal] = useState(false);
    const { data, isLoading } = useGetCard();
    const { mutate: setDefaultCard, isPending: isSettingDefaultPending } =
        useSetDefaultCard("");

    return (
        <>
            <Elements stripe={stripePromise}>
                <h2 className="text-xl font-semibold mb-4">Payment</h2>
                {isLoading ? (
                    <div>Loading....</div>
                ) : data?.data?.cards?.length === 0 ? (
                    <div>No Card Added</div>
                ) : (
                    <div className="border rounded-lg max-h-64 overflow-y-auto">
                        {data?.data?.cards?.map((card: any, index: number) => (
                            <button
                                onClick={() => { setDefaultCard({ cardId: card._id }) }}
                                key={index}
                                disabled={data.data.cards.length === 1}
                                className={cn("border-b block w-full text-left", isSettingDefaultPending && "pointer-events-none opacity-50", data.data.cards.length - 1 === index && "border-b-0")}
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
                <AddOtherCard
                    open={addOtherCardModal}
                    setOpen={setOtherCardModal}
                    onSuccess={() => { }}
                />
            </Elements>
        </>
    )
}

export default CardsList