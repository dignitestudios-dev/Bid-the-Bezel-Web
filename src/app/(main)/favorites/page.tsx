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
import { ArrowLeft } from "lucide-react";

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
  const [items, setItems] = useState<Fav[]>(initial);

  const remove = (id: string) => setItems((s) => s.filter((i) => i.id !== id));

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((it) => (
          <div
            key={it.id}
            className="flex items-center justify-between p-3 rounded-xl border border-gray-200 bg-white"
          >
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                <Image
                  src={it.image}
                  alt={it.title}
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{it.title}</h3>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-[#2881E8] text-white text-xs flex items-center justify-center">
                    <Image
                      src="/images/user.jpg"
                      alt="User"
                      width={24}
                      height={24}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span className="text-sm text-gray-800 font-semibold">
                    {it.user}
                  </span>
                </div>

                <p className="text-2xl font-bold">{it.price}</p>
              </div>
            </div>

            <button
              onClick={() => remove(it.id)}
              className="text-red-600 font-medium"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
