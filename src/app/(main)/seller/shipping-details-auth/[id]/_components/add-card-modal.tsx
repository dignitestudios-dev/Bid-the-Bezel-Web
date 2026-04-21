"use client"
import CardBrands from "@/components/icons/CardBrands";
import CardIcon from "@/components/icons/CardIcon";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAddCard } from "@/features/billing/hook";
import { showError } from "@/lib/toast";
import { CardCvcElement, CardExpiryElement, CardNumberElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";


const ELEMENT_OPTIONS = {
    style: {
        base: {
            fontSize: "14px",
            color: "#0f1724",
            "::placeholder": {
                color: "#94a3b8",
            },
        },
        invalid: {
            color: "#ef4444",
        },
    },
};

const AddOtherCard = ({
    open,
    setOpen,
    onSuccess,
}: {
    open: boolean;
    setOpen: (v: boolean) => void;
    onSuccess?: () => void;
}) => {
    const queryClient = useQueryClient()
    const router = useRouter();
    const stripe = useStripe();
    const elements = useElements();
    const { mutate: addCard } = useAddCard();
    const [name, setName] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        if (!stripe || !elements) return;

        if (!name.trim()) {
            return showError("Name required");
        }

        if (!zipCode.trim()) {
            return showError("Zip code required");
        }
        setLoading(true)

        const cardElement = elements.getElement(CardNumberElement);
        if (!cardElement) return;

        const res = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
            billing_details: {
                name,
                address: { postal_code: zipCode },
            },
        });

        if (res.error) {
            console.log(res.error.message);
            return;
        }

        addCard({ paymentMethodId: res.paymentMethod.id }, {
            onSuccess: () => {
                // queryClient.invalidateQueries({ queryKey: ["get-cards"] })
                setOpen(false)
            },
            onSettled: () => {
                setLoading(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-3xl p-8">

                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto">
                        <div >
                            <h2 className="text-2xl font-semibold mb-6">Card Details</h2>

                            <div className="flex items-center gap-4 mb-6">
                                <CardIcon />
                                <div>
                                    <div className="font-medium">Credit Or Debit Card</div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <CardBrands />
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-lg border mb-6 overflow-hidden">
                                <div className="px-4 py-4 border-b">
                                    <input
                                        placeholder="Cardholder Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-transparent outline-none text-sm placeholder:text-muted-foreground"
                                    />
                                </div>

                                <div className="px-4 py-4 border-b flex items-center justify-between">
                                    <div className="flex-1">
                                        <CardNumberElement options={ELEMENT_OPTIONS} />
                                    </div>
                                    <div className="ml-3 text-sm text-muted-foreground">
                                        <Lock />
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 border-b">
                                    <div className="col-span-2 px-4 py-3 border-r">
                                        <CardExpiryElement options={ELEMENT_OPTIONS} />
                                    </div>
                                    <div className="px-4 py-3">
                                        <CardCvcElement options={ELEMENT_OPTIONS} />
                                    </div>
                                </div>

                                <div className="px-4 py-3">
                                    <input
                                        placeholder="Zip Code"
                                        value={zipCode}
                                        onChange={(e) => setZipCode(e.target.value)}
                                        className="w-full bg-transparent outline-none text-sm placeholder:text-muted-foreground"
                                    />
                                </div>
                            </div>

                            <div className="mt-6">
                                <Button
                                    onClick={handleSave}
                                    disabled={!stripe || loading}
                                    size={"lg"}
                                    className="w-full h-12 flex items-center justify-center gap-2"
                                >
                                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

            </DialogContent>
        </Dialog>

    )
}

export default AddOtherCard

