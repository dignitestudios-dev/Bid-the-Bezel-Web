"use client"
import { Button } from "@/components/ui/button"
import { useAuthenticatePayment } from "@/features/products/hook"
import { useParams, useRouter } from "next/navigation"
import { loadStripe } from "@stripe/stripe-js";
import { showError } from "@/lib/toast";



const PaymentDetail = () => {
    const { id } = useParams()
    const router = useRouter()
    const { mutate, isPending } = useAuthenticatePayment()
    const handlePayment = async () => {
        mutate(
            { id: id as string },
            {
                onSuccess: async (response) => {
                    const status = response?.data?.status;
                    const clientSecret = response?.data?.clientSecret;
                    const paymentMethodId = response?.data?.paymentMethodId;
                    if (!clientSecret) return;

                    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
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
                            router.push("/seller/watch-listed");
                        }
                    } else {
                        router.push("/seller/watch-listed");
                    }
                },
            }
        );
    };
    return (
        <div className="min-h-screen rounded-sm p-4  md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 shadow-sm ">
                    <div className="space-y-6">
                        <div className="rounded-lg p-6  md:h-[70vh]">
                            <h2 className="text-    lg font-semibold mb-4">Payment</h2>
                            <div className="border rounded-lg">
                                <label className="flex items-center justify-between p-3  cursor-pointer">
                                    <div className="flex-1">
                                        <div className="font-medium">Visa</div>
                                        <div className="text-sm text-gray-500">
                                            •••• •••• •••• 5488
                                        </div>
                                    </div>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="visa"
                                        // checked={selectedCard === "visa"}
                                        // onChange={() => setSelectedCard("visa")}
                                        className="w-5 h-5 checked:bg-white appearance-none border-gray-300 rounded-full border-4 checked:border-emerald-500"
                                    />
                                </label>
                                <label className="flex items-center justify-between p-3  cursor-pointer">
                                    <div className="flex-1">
                                        <div className="font-medium">MasterCard</div>
                                        <div className="text-sm text-gray-500">
                                            •••• •••• •••• 1234
                                        </div>
                                    </div>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="mastercard"
                                        // checked={selectedCard === "mastercard"}
                                        // onChange={() => setSelectedCard("mastercard")}
                                        className="w-5 h-5 checked:bg-white appearance-none border-gray-300 rounded-full border-4 checked:border-emerald-500"
                                    />
                                </label>
                            </div>
                            <button className=" text-sm my-4 font-medium">
                                + Add other
                            </button>

                            <div className=" ">
                                <h2 className="text-lg font-semibold mb-4">
                                    Billing Address
                                </h2>
                                <div className="flex flex-col gap-4  border rounded-2xl p-4">
                                    <label className="flex items-center gap-3 cursor-pointer">
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
                                    </label>
                                    <hr />
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <div className="relative">
                                            <input
                                                type="radio"
                                                name="billingAddress"
                                                // checked={billingAddressType === "different"}
                                                // onChange={() =>
                                                //     setBillingAddressType("different")
                                                // }
                                                className="w-5 h-5 checked:bg-white appearance-none border-gray-300 rounded-full border-4 checked:border-emerald-500"
                                            />
                                        </div>
                                        <span className="text-sm font-medium">
                                            Use a different billing address
                                        </span>
                                    </label>
                                </div>
                                {/* <Link href={"auth-payment-done"} className="w-full mt-6"> */}
                                <Button
                                    onClick={handlePayment}
                                    disabled={isPending}
                                    className="w-full bg-slate-900 text-white rounded-lg py-3 font-medium hover:bg-slate-800 transition-colors"
                                >
                                    {isPending ? "Paying" : "Pay Now"}
                                </Button>
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
    )
}
export default PaymentDetail