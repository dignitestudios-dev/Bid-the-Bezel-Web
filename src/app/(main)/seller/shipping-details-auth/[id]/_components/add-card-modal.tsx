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
    const [cardError, setCardError] = useState("");
    const [expiryError, setExpiryError] = useState("");
    const [cvcError, setCvcError] = useState("");

    const handleSave = async () => {
        if (!stripe || !elements) return;

        if (!name.trim()) {
            return showError("Cardholder name is required");
        }

        if (name.trim().length < 3) {
            return showError("Cardholder name must be at least 3 characters");
        }

        if (!zipCode.trim()) {
            return showError("Zip code is required");
        }

        if (zipCode.trim().length < 5 || zipCode.trim().length > 10) {
            return showError("Zip code must be between 5 and 10 digits");
        }

        if (cardError || expiryError || cvcError) {
            return showError("Please fix card details errors");
        }

        setLoading(true)

        const cardElement = elements.getElement(CardNumberElement);
        if (!cardElement) {
            setLoading(false);
            return;
        }

        const res = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
            billing_details: {
                name,
                address: { postal_code: zipCode },
            },
        });

        if (res.error) {
            showError(res.error.message || "Card validation failed");
            setLoading(false);
            return;
        }

        addCard({ paymentMethodId: res.paymentMethod.id }, {
            onSuccess: () => {
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
                                        maxLength={100}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-transparent outline-none text-sm placeholder:text-muted-foreground"
                                    />
                                </div>

                                <div className="px-4 py-4 border-b flex items-center justify-between">
                                    <div className="flex-1">
                                        <CardNumberElement 
                                            options={ELEMENT_OPTIONS}
                                            onChange={(e) => setCardError(e.error?.message || "")}
                                        />
                                    </div>
                                    <div className="ml-3 text-sm text-muted-foreground">
                                        <Lock />
                                    </div>
                                </div>
                                {cardError && (
                                    <div className="px-4 py-2 text-xs text-red-500">
                                        {cardError}
                                    </div>
                                )}

                                <div className="grid grid-cols-3 border-b">
                                    <div className="col-span-2 px-4 py-3 border-r">
                                        <CardExpiryElement 
                                            options={ELEMENT_OPTIONS}
                                            onChange={(e) => setExpiryError(e.error?.message || "")}
                                        />
                                    </div>
                                    <div className="px-4 py-3">
                                        <CardCvcElement 
                                            options={ELEMENT_OPTIONS}
                                            onChange={(e) => setCvcError(e.error?.message || "")}
                                        />
                                    </div>
                                </div>
                                {(expiryError || cvcError) && (
                                    <div className="px-4 py-2 text-xs text-red-500">
                                        {expiryError || cvcError}
                                    </div>
                                )}

                                <div className="px-4 py-3">
                                    <input
                                        placeholder="Zip Code"
                                        value={zipCode}
                                        maxLength={10}
                                        type="number"
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (value.length <= 10) {
                                                setZipCode(value);
                                            }
                                        }}
                                        className="w-full bg-transparent outline-none text-sm placeholder:text-muted-foreground"
                                    />
                                </div>
                            </div>

                            <div className="mt-6">
                                <Button
                                    onClick={handleSave}
                                    disabled={!stripe || loading || !!cardError || !!expiryError || !!cvcError || !name.trim() || !zipCode.trim()}
                                    size={"lg"}
                                    className="w-full h-12 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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

