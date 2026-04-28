"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumbs";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useAddProductToFavorite, useGetFavoriteProducts } from "@/features/fav-product/hook";
import { showSuccess } from "@/lib/toast";
import { FavSkeleton } from "@/components/skeleton";

type Fav = {
  id: string;
  title: string;
  user: string;
  price: string;
  image: string;
};

const initial: Fav[] = [
  {
    id: "1",
    title: "Audemars Piguet Royal Oak",
    user: "Arandomuser",
    price: "$765.76",
    image: "/images/fav.jpg",
  },
  {
    id: "2",
    title: "Audemars Piguet Royal Oak",
    user: "Arandomuser",
    price: "$765.76",
    image: "/images/fav.jpg",
  },
];

const Favorites = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const { data, isLoading } = useGetFavoriteProducts();
  const { mutate: addProductToFavorite, isPending } = useAddProductToFavorite(selectedId);

  const handleRemove = (id: string) => {
    setSelectedId(id);
    setLoadingId(id);
    addProductToFavorite(undefined, {
      onSuccess: () => {
        showSuccess("Product removed from favorites");
        setLoadingId(null);
      },
      onError: () => {
        setLoadingId(null);
      }
    });
  };



  return (
    <div className="w-[90%] max-w-screen-2xl mx-auto py-10">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/" className="text-gray-700 hover:text-gray-900">
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
              <BreadcrumbPage className="font-semibold">
                Favorites
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <h1 className="text-3xl font-semibold mb-8">Favorites</h1>
      {data?.data?.length === 0 ? (
        <div className="text-center text-muted-foreground mt-5 font-semibold">No Favorites</div>
      ) : isLoading ? (
        <FavSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {data?.data?.map((it: any) => (
            <div
              key={it.productId}
              className="flex items-center justify-between p-3 rounded-xl border border-gray-200 bg-white"
            >
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                  <Image
                    src={it.images?.[0]?.location}
                    alt={it.title}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">{it?.title}</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full overflow-hidden bg-[#2881E8] text-white text-xs flex items-center justify-center">
                      <Image
                        src={it?.seller?.profilePicture?.location}
                        alt="User"
                        width={24}
                        height={24}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <span className="text-sm text-gray-800 font-semibold">
                      {it?.seller?.userName}
                    </span>
                  </div>

                  <p className="text-2xl font-bold">{it?.price}</p>
                </div>
              </div>

              <button
                disabled={loadingId === it?.productId}
                onClick={() => handleRemove(it?.productId)}
                className="text-red-600 cursor-pointer font-medium"
              >
                {loadingId === it?.productId ? "Removing..." : "Remove"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
