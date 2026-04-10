"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumbs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import { showError, showSuccess } from "@/lib/toast";
import { useUpdateBankAccount } from "@/features/billing/hook";

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

if (!stripeKey) {
  throw new Error("Missing Stripe key");
}

const stripePromise = loadStripe(stripeKey);

const BankForm = () => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const { mutate, isPending } = useUpdateBankAccount()

  const handleSave = async () => {
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
        console.log("Stripe Error Full:", result.error);
        showError(result.error.message);
        return;
      }

      if (result?.token) {
        mutate({ token: result?.token?.id }, {
          onSuccess: () => {
            router.push("/profile/payments")
          }
        })
      }

    } catch (err: any) {
      console.error(err);
      showError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
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
                Bank Details
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-lg border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Bank Details</h2>

            {/* <div className="mb-4">
              <label className="block font-medium mb-2">Select Bank</label>
              <Select value={bank} onValueChange={setBank}>
                <SelectTrigger className="w-full h-12!">
                  <SelectValue placeholder="--- Select a Bank ---" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>US Banks</SelectLabel>
                    <SelectItem value="metro">Metro Bank</SelectItem>
                    <SelectItem value="chase">Chase Bank</SelectItem>
                    <SelectItem value="boa">Bank of America</SelectItem>
                    <SelectItem value="wells">Wells Fargo</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div> */}

            <div className="rounded-lg my-4 space-y-4">
              <div>
                <label className="block font-medium mb-2">
                  Account Holder Name
                </label>
                <div className="">
                  <input
                    placeholder="Bid the bezel"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-200 rounded-md px-4 py-3 bg-white outline-none "
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-2">Routing Number</label>
                  <input
                    placeholder="110000000"
                    value={branchCode}
                    onChange={(e) => setBranchCode(e.target.value)}
                    className="w-full border border-gray-200 rounded-md px-4 py-3 bg-white outline-none "
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2">
                    Account Number
                  </label>
                  <input
                    placeholder="121154125412"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="w-full border border-gray-200 rounded-md px-4 py-3 bg-white outline-none "
                  />
                </div>
              </div>
            </div>

            <p className=" text-muted-foreground mb-6 text-sm">
              By Adding this information you agree to our{" "}
              <Link href="#" className="underline text-primary">
                T&Cs
              </Link>{" "}
              regarding topping up your bank account.
            </p>

            <div>
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

const BankPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <BankForm />
    </Elements>
  );
};

export default BankPage;
