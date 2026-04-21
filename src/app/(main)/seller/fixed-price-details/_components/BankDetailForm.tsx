"use client";

import { Button } from "@/components/ui/button";
import { FloatingInput } from "@/components/ui/floating-input";
import { useUpdateBankAccount } from "@/features/billing/hook";
import { showError, showSuccess } from "@/lib/toast";
import { useStripe } from "@stripe/react-stripe-js";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

type Props = {
    onSubmit: () => void;
    cardData: any;
    setBankEditMode: (val: boolean) => void;
    bankEditModa: boolean;
};

const BankDetailForm = ({
    onSubmit,
    cardData,
    bankEditModa,
    setBankEditMode,
}: Props) => {
    const { mutate, isPending } = useUpdateBankAccount();
    const queryClient = useQueryClient()
    const stripe = useStripe();
    const card = cardData?.data?.banks?.[0];
    const [name, setName] = useState(card?.accountHolderName || "");
    const [branchCode, setBranchCode] = useState(card?.routingNumber || "");
    const [accountNumber, setAccountNumber] = useState(card?.accountNumber || "");
    const [loading, setLoading] = useState(false)

    const handleStripeSubmit = async () => {
        if (!stripe) return;

        if (!name || !branchCode || !accountNumber) {
            showError("Please fill in all bank details");
            return;
        }

        if (branchCode.trim().length !== 9) {
            showError("Routing number must have exactly 9 digits");
            return;
        }

        setLoading(true);

        try {
            const result = await stripe.createToken("bank_account", {
                country: "US",
                currency: "usd",
                routing_number: branchCode,
                account_number: accountNumber,
                account_holder_name: name,
                account_holder_type: "individual",
            });

            if (result.error) {
                showError(result.error.message);
                return;
            }

            if (result.token) {
                mutate(
                    { token: result.token.id },
                    {
                        onSuccess: () => {
                            queryClient.invalidateQueries({
                                queryKey: ["get-card"],
                            });
                            showSuccess("Bank updated successfully");
                            setBankEditMode(false);
                        },
                    }
                );
            }
        } catch (err: any) {
            showError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white border max-w-4xl mx-auto rounded-xl p-8 shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-2xl">Bank Details</h3>

                <Button
                    variant="outline"
                    onClick={() => setBankEditMode(!bankEditModa)}
                >
                    {bankEditModa ? "Cancel" : "Edit"}
                </Button>
            </div>

            {/* Bank Data */}
            {cardData?.data?.banks?.map((card: any, index: number) => (
                <div key={index} className="space-y-4 mt-6">
                    <FloatingInput
                        label="Account Holder Name"
                        id="accountHolderName"
                        value={name}
                        disabled={!bankEditModa}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <FloatingInput
                            label="Routing Number"
                            id="routingNumber"
                            value={branchCode}
                            disabled={!bankEditModa}
                            onChange={(e) => setBranchCode(e.target.value)}
                        />

                        <FloatingInput
                            label="Account Number"
                            id="accountNumber"
                            value={accountNumber}
                            disabled={!bankEditModa}
                            onChange={(e) => setAccountNumber(e.target.value)}
                        />
                    </div>
                </div>
            ))}

            {/* Buttons */}
            <Button
                className="w-full mt-6"
                onClick={bankEditModa ? handleStripeSubmit : onSubmit}
                disabled={loading || isPending}
            >
                {bankEditModa ? "Update" : "Next"}
            </Button>
        </div>
    );
};

export default BankDetailForm;