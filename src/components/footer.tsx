"use client";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const copyright = `Copyright © ${currentYear} Bidthebezel | All Rights Reserved`;

  return (
    <footer className="bg-(--primary) text-white">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:p-14">
        <div className="text-lg">
          
          {/* CTA SECTION */}
          <div className="bg-white flex flex-col text-sm gap-6 sm:gap-8 items-center z-50 rounded-3xl relative p-6 sm:p-10 lg:p-20 overflow-hidden">
            <Image
              src={"/images/footer/watch.png"}
              alt="cta-watch"
              width={380}
              height={380}
              className="absolute bottom-0 right-0 sm:right-5 z-20 w-[220px] sm:w-[300px] lg:w-[380px]"
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

            <Link href={"/seller/plans"} className="cursor-pointer relative z-50">
              <button className="flex items-center gap-2 bg-[#0D1B2A0D] border border-gray-300 rounded-full px-1 pl-2 py-1 hover:shadow-md transition">
                <span className="text-gray-700 font-medium">
                  Start Selling
                </span>
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-r from-gray-100 to-gray-400">
                  <ArrowRight size={10} color="black" />
                </span>
              </button>
            </Link>
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
                className="h-12 w-auto"
              />
              <p className="text-base leading-relaxed text-white/80 max-w-xs">
                Condimentum dolor ac tincidunt fermentum massa hac. Quis
                vehicula nec odio amet vel. Lacinia in nec at nisi ut tortor
                dui sed.
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

              {/* COMPANY */}
              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-3 text-base text-white/80">
                  <li>About</li>
                  <li>FAQs</li>
                  <li>Contact us</li>
                  <li>Terms of Use</li>
                  <li>Privacy Policy</li>
                </ul>
              </div>

              {/* CONTACT */}
              <div>
                <h3 className="font-semibold mb-4">Contacts us</h3>
                <ul className="space-y-3 text-base text-white/80">
                  <li className="flex items-center gap-2">
                    <Mail />
                    support@Bidthebezel.com
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone />
                    +1 (310) 925-3575
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin />
                    Los Angeles
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* BOTTOM BAR */}
          <div className="mt-12 pt-6 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 text-center md:text-left">
            <p className="text-xs text-white/80">{copyright}</p>

            <div className="flex items-center justify-center md:justify-end gap-5 md:gap-6 text-gray-400 flex-wrap">
              <Link href="#" className="hover:text-white">
                {/* Facebook */}
                <svg width="11" height="19" viewBox="0 0 11 19" fill="none">
                  <path
                    d="M7.31339 18.395V10.1844H10.2081L10.6415 6.98452H7.31331V4.94155C7.31331 4.01512 7.58348 3.38381 8.97893 3.38381L10.7586 3.38301V0.521091C10.4508 0.482165 9.39429 0.39502 8.16531 0.39502C5.59929 0.39502 3.84255 1.88619 3.84255 4.62474V6.98452H0.94043V10.1844H3.84255V18.3949H7.31339V18.395Z"
                    fill="white"
                  />
                </svg>
              </Link>

              <Link href="#" className="hover:text-white">
                {/* Instagram */}
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
                  <path
                    d="M9.84961 0.39502C13.4447 0.39502 15.2424 0.394824 16.5371 1.25146C17.1153 1.63402 17.6106 2.12936 17.9932 2.70752C18.8498 4.00225 18.8496 5.79995 18.8496 9.39502C18.8496 12.9901 18.8498 14.7878 17.9932 16.0825C17.6106 16.6607 17.1153 17.156 16.5371 17.5386C15.2424 18.3952 13.4447 18.395 9.84961 18.395C6.25454 18.395 4.45684 18.3952 3.16211 17.5386C2.58395 17.156 2.08861 16.6607 1.70605 16.0825C0.849414 14.7878 0.849609 12.9901 0.849609 9.39502C0.849609 5.79995 0.849414 4.00225 1.70605 2.70752C2.08861 2.12936 2.58395 1.63402 3.16211 1.25146C4.45684 0.394824 6.25454 0.39502 9.84961 0.39502Z"
                    fill="white"
                  />
                </svg>
              </Link>

              <Link href="#" className="hover:text-white">
                {/* YouTube */}
                <svg width="21" height="15" viewBox="0 0 21 15" fill="none">
                  <path
                    d="M11.2882 14.3747L7.22605 14.2988C5.9108 14.2723 4.59228 14.3251 3.30282 14.051C1.34126 13.6415 1.20229 11.6336 1.05688 9.94939C0.856519 7.58155 0.934085 5.17074 1.31219 2.82266C1.52565 1.50514 2.36568 0.718973 3.66476 0.633423C8.05011 0.322948 12.4646 0.359743 16.8403 0.50459C17.3024 0.517869 17.7677 0.590445 18.2234 0.673056C20.4727 1.07597 20.5275 3.35137 20.6733 5.26683C20.8187 7.20205 20.7573 9.14721 20.4794 11.0693C20.2564 12.6607 19.8298 13.9952 18.0294 14.124C15.7737 14.2925 13.5697 14.4281 11.3076 14.3849C11.3077 14.3747 11.2947 14.3747 11.2882 14.3747Z"
                    fill="white"
                  />
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