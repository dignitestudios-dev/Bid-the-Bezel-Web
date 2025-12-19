"use client";
import React, { useState } from "react";
import { Check, ShieldCheck } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import Card from "@/components/icons/Card";
import CardBrands from "@/components/icons/CardBrands";
import Wallet from "@/components/icons/Wallet";
import { useRouter } from "next/navigation";

const BuyNow = ({ watch }: { watch: any }) => {
  const router = useRouter();
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [saveInfo, setSaveInfo] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"saved" | "new">("saved");
  const [authenticate, setAuthenticate] = useState(false);

  const basePrice = 7765.76;
  const authFee = 200;
  const shipping = 120.50;
  const total = basePrice + (authenticate ? authFee : 0) + shipping;

  const handleBuy = () => {
    router.push("/seller/order-completed-buyer");
  };

  console.log("watch: ", watch);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-full lg:w-[55%] p-8 lg:p-12 bg-white">
        <div className="max-w-xl mx-auto">
          {!watch.isAuthenticated && (
            <div className="flex justify-between items-center">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <ShieldCheck fill="#14A752" stroke="white" size={50} />
                </div>
                <div>
                  <p className="text-lg font-medium ">
                    Authenticate this watch
                  </p>
                  <p className="text-xs  mt-1">
                    An additional of $200 will be charged to authenticate this
                    watch
                  </p>
                </div>
              </div>
              <Switch checked={authenticate} onCheckedChange={setAuthenticate} />
            </div>
          )}

          {/* Contact Section */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Contact</h2>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Delivery Section */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Delivery</h2>
            <div className="mb-4">
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                <option>Country/Region</option>
                <option>United States</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="First Name"
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <input
              type="text"
              placeholder="Address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Apartment, Suite, etc. (optional)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="grid grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                placeholder="City"
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="State"
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Postal code (optional)"
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <input
              type="tel"
              placeholder="Phone No."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={saveInfo}
                onChange={(e) => setSaveInfo(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className=" text-gray-700">
                Save this information for next time
              </span>
            </label>
          </div>

          {/* Payment Section */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Payment</h2>
            <div
              className="flex items-center gap-2rounded-lg mb-4 cursor-pointer"
              onClick={() => {
                setPaymentMethod("saved");
                setShowAddCard(false);
              }}
            >
              <div className="flex items-center gap-2">
                <Wallet />
                <div>
                  <div className="font-medium">Visa</div>
                  <div className="text-sm text-gray-500">****2345</div>
                </div>
              </div>

              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "saved"}
                onChange={() => {
                  setPaymentMethod("saved");
                  setShowAddCard(false);
                }}
                className="w-5 h-5 checked:bg-white appearance-none border-gray-300 rounded-full border-4 checked:border-[#14A752] ml-auto"
              />
            </div>

            <div
              className="flex items-center gap-2 rounded-lg mb-3 cursor-pointer"
              onClick={() => {
                setShowAddCard(true);
                setPaymentMethod("new");
              }}
            >
              <div className="text-sm font-medium">+ Add other</div>
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "new"}
                readOnly
                className="w-5 h-5 checked:bg-white appearance-none border-gray-300 rounded-full border-4 checked:border-[#14A752] ml-auto"
              />
            </div>

            {/* Add Card Form (shown when user selects Add other) */}
            {showAddCard && (
              <div className="mt-4">
                <div className="flex items-start gap-3 mb-6">
                  <Card />
                  <div>
                    <p className="font-medium">Credit Or Debit Card</p>
                    <CardBrands />
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <input
                    type="text"
                    placeholder="Name on Card"
                    className="w-full px-4 py-3 border-b border-gray-200 focus:outline-none"
                  />
                  <div className="w-full px-4 py-3 border-b border-gray-200 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Card Number"
                      className="flex-1 focus:outline-none"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-gray-400"
                    >
                      <path
                        d="M12 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                  <div className="grid grid-cols-2 gap-0">
                    <input
                      type="text"
                      placeholder="Expiration"
                      className="px-4 py-3 border-r border-gray-200 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      className="px-4 py-3 focus:outline-none"
                    />
                  </div>
                </div>

                <button className="mt-4 w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                  Add Card
                </button>
              </div>
            )}
          </div>

          {/* Billing Address Section */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Billing Address</h2>
            <label className="flex items-center gap-2 p-4 border border-gray-300 rounded-lg cursor-pointer">
              <input
                type="radio"
                name="billing"
                checked={sameAsShipping}
                onChange={() => setSameAsShipping(true)}
                className="w-5 h-5 checked:bg-white appearance-none border-gray-300 rounded-full border-4 checked:border-[#14A752]"
              />
              <span className="">Same as shipping address</span>
            </label>
            <label className="flex items-center gap-2 p-4 border border-gray-300 rounded-lg cursor-pointer mt-3">
              <input
                type="radio"
                name="billing"
                checked={!sameAsShipping}
                onChange={() => setSameAsShipping(false)}
                className="w-5 h-5 checked:bg-white appearance-none border-gray-300 rounded-full border-4 checked:border-[#14A752]"
              />
              <span className="">Use a different billing address</span>
            </label>

            {/* Show billing address form when user chooses different billing address */}
            {!sameAsShipping && (
              <div className="mt-4 p-4 border border-gray-200 rounded-lg">
                <div className="mb-4">
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    <option>Country/Region</option>
                    <option>United States</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Apartment, Suite, etc. (optional)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="City"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Postal code (optional)"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Phone No."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>

          {/* Pay Button */}
          <button
            className="w-full bg-gray-900 text-white py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            onClick={handleBuy}
          >
            Pay Now
          </button>
        </div>
      </div>

      <div className="hidden lg:block w-[45%]  bg-gray-50 p-12">
        <div className="">
          <div className="mb-6 flex justify-between bg-white px-2 py-4 border border-border rounded-xl">
            <h3 className=" font-semibold text-lg">Watch reference ID</h3>
            <p className="text-gray-600">#76622</p>
          </div>

          {/* Product */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=200&h=200&fit=crop"
                alt="Watch"
                className="w-20 h-20 rounded-lg object-cover"
              />
            </div>
            <p className="flex-1 font-medium text-lg">
              Audemars Piguet Royal Oak
            </p>
            <div className=" font-medium">$7765.76</div>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between ">
              <span className="text-gray-600">Total Amount</span>
              <span className="font-medium">$7765.76</span>
            </div>
            {authenticate && (
              <div className="flex justify-between ">
                <span className="text-gray-600">Authentication Fee</span>
                <span className="font-medium">$200</span>
              </div>
            )}
            <div className="flex justify-between ">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">$120.50</span>
            </div>
            <div className="flex justify-between text-lg font-semibold pt-3 border-t border-gray-200">
              <span>TOTAL</span>
              <span>
                {" "}
                <span className="font-light">USD</span> ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyNow;
