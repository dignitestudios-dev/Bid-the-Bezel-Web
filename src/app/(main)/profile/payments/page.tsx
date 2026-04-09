"use client";

import Bank from "@/components/icons/Bank";
import Wallet from "@/components/icons/Wallet";
import React, { useState } from "react";
import PaymentDetailsDialog from "./_components/PaymentDetailsDialog";
import Badge from "./_components/Badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChangeSubscriptionModal } from "./_components/ChangeSubscriptionModal";
import { useSubscription } from "@/features/subscription/hook";
import { useMe } from "@/features/auth/hooks";
import { PlanSkeleton } from "@/components/skeleton";
import { CancelSubscriptionModal } from "./_components/CancelSubscriptionModal";
import { SubscriptionCancelledModal } from "./_components/SubscriptionCancelledModal";

const Payments = () => {
  const [open, setOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [cancelSubscriptionModal, setCancelSubscriptionModal] = useState(false);
  const [subCancelledModal, setSubCancelledModal] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");
  const [currentPlan, setCurrentPlan] = useState(null)
  const { data, isLoading } = useSubscription()
  const { data: userData, isLoading: userLoading } = useMe()

  function openInvoice() {
    setOpen(true);
  }

  function closeInvoice() {
    setOpen(false);
  }

  function closeCancelS() {
    setCancelOpen(false);
  }

  const handleCancelSubscription = (planId: string) => {
    setSelectedPlanId(planId);
    setCancelSubscriptionModal(true)
    setCancelOpen(false)
  }

  const handleCancelSuccess = () => {
    setCancelSubscriptionModal(false);
    setSubCancelledModal(true);
  }

  return (
    <div className="min-h-[70vh] py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto flex flex-col gap-6">
          {userData?.data?.subscriptions.length === 0 ? (
            <div className="rounded-lg border bg-white p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="text-base font-semibold capitalize">No Active Subscription</div>
                <div className=" text-muted-foreground capitalize">You have currently no plan</div>
              </div>
            </div>
          ) : userData?.data?.subscriptions?.map((item: any, index: any) => {
            return (
              <div key={index} className="rounded-lg border bg-white p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="text-base font-semibold capitalize">{item?.plan?.name}</div>
                  <div className=" text-muted-foreground capitalize">{item?.plan?.interval}</div>
                  <div className=" text-black mt-2 capitalize">
                    3 Days Of Trial Left{" "}
                    <span className="text-muted-foreground ">|</span> {item?.planType === "buyer" ? "Unlimited Purchases " : item?.isUnlimitedQuota ? "Unlimited Watches " : item?.sellQuota + " Watches Left"}
                  </div>
                </div>

                <div className="ml-auto">
                  <button
                    onClick={() => {
                      setCurrentPlan(item);

                      const planName = item?.plan?.name?.toLowerCase();

                      if (planName === "basic") {
                        setSelectedPlanId(item?._id);
                        setCancelSubscriptionModal(true);
                      } else if (item?.planType === "buyer") {
                        setSelectedPlanId(item?._id);
                        setCancelSubscriptionModal(true);
                      } else {
                        setCancelOpen(true);
                      }
                    }}
                    className=" cursor-pointer px-4 py-2 rounded-md bg-slate-500 text-white ">
                    {item?.planType === "buyer" ? "Cancel Plan" : "Change Or Cancel Plan"}
                  </button>
                </div>
              </div>
            )
          })
          }

          <div className="space-y-6">

            <div className="rounded-lg border bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold">Payment</h3>
                <Link href={"/card"}>
                  <Button
                    variant={"outline"}
                    size={"lg"}
                    className="border border-border rounded-md"
                  >
                    Update
                  </Button>
                </Link>{" "}
              </div>

              <div className="flex items-center justify-between py-2 border-b mb-4">
                <div className="flex items-center gap-3">
                  <div>
                    <Wallet />
                  </div>
                  <div>
                    <div className=" font-medium">Visa ● ● ● ● 5488</div>
                  </div>
                </div>
              </div>

              <div>
                <div className=" font-medium mb-3">Invoices</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left  border-collapse">
                    <thead>
                      <tr className="text-xs text-muted-foreground">
                        <th className="py-2">Date</th>
                        <th className="py-2">Total</th>
                        <th className="py-2">Status</th>
                        <th className="py-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="py-3">Oct 20 2025</td>
                        <td className="py-3">$18</td>
                        <td className="py-3">
                          <Badge color="bg-yellow-100 text-yellow-800">
                            On Hold
                          </Badge>
                        </td>
                        <td className="py-3">
                          <button
                            onClick={openInvoice}
                            className="px-3 py-1 border rounded-md "
                          >
                            View
                          </button>
                        </td>
                      </tr>

                      <tr className="border-t">
                        <td className="py-3">Oct 20 2025</td>
                        <td className="py-3">$200</td>
                        <td className="py-3">
                          <Badge color="bg-emerald-100 text-emerald-800">
                            Paid
                          </Badge>
                        </td>
                        <td className="py-3">
                          <button
                            onClick={openInvoice}
                            className="px-3 py-1 border rounded-md "
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Bank Account Card */}
            <div className="rounded-lg border bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold">Bank Account</h3>
                <Link href={"/bank"}>
                  <Button
                    variant={"outline"}
                    size={"lg"}
                    className="border border-border rounded-md"
                  >
                    Update
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div>
                  <Bank />
                </div>
                <div>
                  <div className="font-medium">Bid the bezel</div>
                  <div className="">● ● ● ● 5488</div>
                </div>
              </div>

              <div>
                <div className=" font-medium mb-3">Payment History</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left  border-collapse">
                    <thead>
                      <tr className="text-xs text-muted-foreground">
                        <th className="py-2">Date</th>
                        <th className="py-2">Total</th>
                        <th className="py-2">Status</th>
                        <th className="py-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="py-3">Oct 20 2025</td>
                        <td className="py-3">$1600</td>
                        <td className="py-3">
                          <Badge color="bg-yellow-100 text-yellow-800">
                            On Hold
                          </Badge>
                        </td>
                        <td className="py-3">
                          <button
                            onClick={openInvoice}
                            className="px-3 py-1 border rounded-md "
                          >
                            View
                          </button>
                        </td>
                      </tr>

                      <tr className="border-t">
                        <td className="py-3">Oct 20 2025</td>
                        <td className="py-3">$3200</td>
                        <td className="py-3">
                          <Badge color="bg-emerald-100 text-emerald-800">
                            Released
                          </Badge>
                        </td>
                        <td className="py-3">
                          <button
                            onClick={openInvoice}
                            className="px-3 py-1 border rounded-md "
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PaymentDetailsDialog open={open} onClose={closeInvoice} />
      {isLoading ? (
        <PlanSkeleton />
      ) : (
        <ChangeSubscriptionModal onCancelSubscription={handleCancelSubscription} currentPlan={currentPlan} plans={data?.data} open={cancelOpen} onClose={closeCancelS} />
      )}
      <CancelSubscriptionModal planId={selectedPlanId} onSuccessAction={handleCancelSuccess} onBack={() => { setCancelOpen(true); setCancelSubscriptionModal(false); }} open={cancelSubscriptionModal} onClose={() => setCancelSubscriptionModal(false)} />
      <SubscriptionCancelledModal open={subCancelledModal} onClose={() => setSubCancelledModal(false)} />
    </div>
  );
};

export default Payments;
