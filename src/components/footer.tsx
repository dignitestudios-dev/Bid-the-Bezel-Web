"use client";
import { useMe } from "@/features/auth/hooks";
import {
  ArrowRight,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const copyright = `Copyright © ${currentYear} Bidthebezel | All Rights Reserved`;
  const { data: user, isLoading } = useMe();
  return (
    <footer className="bg-(--primary) text-white">
      <div className="max-w-screen-2xl mx-auto p-4 sm:px-8 lg:p-14">
        <div className="text-lg">
          {/* CTA SECTION */}
          <div className="bg-white flex flex-col text-sm gap-6 sm:gap-8 items-center z-50 rounded-3xl relative p-6 sm:p-10 lg:p-20 overflow-hidden">
            <Image
              src={"/images/footer/watch.png"}
              alt="cta-watch"
              width={380}
              height={380}
              className="absolute bottom-0 right-0 sm:right-5 z-20 w-[150px] sm:w-[300px] lg:w-[380px]"
            />
            <Image
              src={"/images/footer/cta-bg.png"}
              alt="cta-watch"
              fill
              className="absolute top-[50%] z-10 object-contain"
            />

            <h1 className="text-[#0D1B2A] text-3xl sm:text-5xl lg:text-6xl font-bold text-center">
              Ready to Sell <br /> your watch?
            </h1>
            {!isLoading && (
              <Link
                href={user ? "/seller/plans" : "?authstep=login"}
                className="cursor-pointer! relative z-50"
              >
                <button className="flex items-center gap-2 bg-[#0D1B2A0D] border border-gray-300 rounded-full px-1 pl-2 py-1 hover:shadow-md transition">
                  <span className="text-gray-700 font-medium">
                    Start Listing
                  </span>
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-r from-gray-100 to-gray-400">
                    <ArrowRight size={10} color="black" />
                  </span>
                </button>
              </Link>
            )}
          </div>

          {/* MAIN FOOTER CONTENT */}
          <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-0 py-10 lg:py-20">
            {/* LEFT */}
            <div className="space-y-4">
              <Image
                src="/images/footer/logo.png"
                alt="Bidthebezel Logo"
                width={50}
                height={50}
                unoptimized
                className="h-12 w-auto"
              />
              <p className="text-base leading-relaxed text-white/80 max-w-xs">
                Bid The Bezel is a modern luxury watch marketplace built for
                collectors, enthusiasts, buyers, and sellers who value trust,
                privacy, and transparency.
              </p>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-10 lg:gap-32">
              {/* NAVIGATION */}
              <div>
                <h3 className="font-semibold mb-4">Navigation</h3>
                <ul className="space-y-3 text-base text-white/80">
                  <li>
                    <Link href="/" className="hover:text-white">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/collections?category=auction"
                      className="hover:text-white"
                    >
                      Auction Watches
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/collections?category=fixed"
                      className="hover:text-white"
                    >
                      Marketplace
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/collections?category=all"
                      className="hover:text-white"
                    >
                      Categories
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-10 lg:gap-32">
                <div>
                  <h3 className="font-semibold mb-4">Company</h3>
                  <ul className="space-y-3 text-base text-white/80">
                    <li>
                      <Link href="/about" className="hover:text-white">
                        About
                      </Link>
                    </li>
                    <li>
                      <Link href="/#faqs" className="hover:text-white">
                        FAQs
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/terms-and-conditions"
                        className="hover:text-white"
                      >
                        Terms of Use
                      </Link>
                    </li>
                    <li>
                      <Link href="/privacy-policy" className="hover:text-white">
                        Privacy Policy
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Contacts us</h3>
                  <ul className="space-y-3 text-base text-white/80">
                    <li className="flex items-center gap-2">
                      <span>
                        <Mail />
                      </span>
                      <a
                        href="mailto:zack@bidthebezel.com"
                        className="hover:text-white"
                      >
                        zack@bidthebezel.com
                      </a>
                    </li>
                    <li className="flex items-center gap-2">
                      <span>
                        <Phone />
                      </span>
                      <a href="tel:+14382381122" className="hover:text-white">
                        448-238-1122
                      </a>
                    </li>
                    <li className="flex items-center gap-2">
                      <span>
                        <MapPin />
                      </span>
                      Inlet Beach, Florida.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM BAR */}
          <div className="mt-12 pt-6 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 text-center md:text-left">
            <p className="text-xs text-white/80">{copyright}</p>

            <div className="flex items-center justify-center md:justify-end gap-5 md:gap-6 text-gray-400 flex-wrap">
              {/* Facebook */}
              <Link
                href="https://www.facebook.com/share/1B9B3FdxeE/?mibextid=wwXIfr"
                target="_blank"
                className="hover:text-white transition"
              >
                <Facebook />
              </Link>

              {/* Instagram */}
              <Link
                href="https://www.instagram.com/bidthebezel?igsh=MW5oMzFrZzRiYnI1Ng%3D%3D&utm_source=qr"
                target="_blank"
                className="hover:text-white transition"
              >
                <Instagram />
              </Link>

              <Link
                href="https://www.tiktok.com/@bidthebezel?_r=1&_t=ZP-96UadonoKJr"
                target="_blank"
                className="hover:text-white transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.68h-3.2v12.85a2.89 2.89 0 1 1-2.89-2.89c.226 0 .446.024.659.069V8.78a6.09 6.09 0 0 0-.659-.035A6.09 6.09 0 1 0 15.82 14.84V8.27a8.003 8.003 0 0 0 4.769 1.579V6.686z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
