"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumbs";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CardBrands from "@/components/icons/CardBrands";
import CardIcon from "@/components/icons/CardIcon";
import Lock from "@/components/icons/Lock";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useAddCard } from "@/features/billing/hook";

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

if (!stripeKey) {
  throw new Error("Missing Stripe key");
}

const stripePromise = loadStripe(stripeKey);

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

const CardForm = () => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const { mutate: addCard } = useAddCard();
  const [name, setName] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!stripe || !elements) return;
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
        router.push("/profile/payments");
      },
      onSettled: () => {
        setLoading(false);
      },
    });
  };

  return (
    <div className="h-screen p-10">
      <div className="flex items-center gap-4 mb-10">
        <Link
          href="/profile/payments"
          className="text-gray-700 hover:text-gray-900"
        >
          <ArrowLeft />
        </Link>

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/profile/payments">Profile</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold">
                Card Details
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-lg border bg-white p-8 shadow-sm">
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
    </div>
  );
};

const CardPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <CardForm />
    </Elements>
  );
};

export default CardPage;
