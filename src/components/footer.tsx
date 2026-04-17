import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const copyright = `Copyright © ${currentYear} Bidthebezel | All Rights Reserved`;

  return (
    <footer className="bg-(--primary) text-white">
      <div className="max-w-screen-2xl mx-auto p-14 ">
        <div className="text-lg">
          <div className="bg-white flex flex-col text-sm gap-8 items-center z-50 rounded-3xl relative p-20">
            <Image
              src={"/images/footer/watch.png"}
              alt="cta-watch"
              width={380}
              height={380}
              className="absolute bottom-0 z-20 right-5"
            />
            <Image
              src={"/images/footer/cta-bg.png"}
              alt="cta-watch"
              fill
              className="absolute top-[50%] z-10 bg-contain"
            />
            <h1 className="text-[#0D1B2A] text-6xl font-bold text-center">
              Ready to Sell <br /> your watch?
            </h1>
            <Link
              href={"/seller/plans"}
              className="cursor-pointer relative z-50"
            >
              <button className="flex items-center gap-2 bg-[#0D1B2A0D] border border-gray-300 rounded-full px-1 pl-2 py-1 hover:shadow-md transition">
                <span className="text-gray-700 font-medium">Start Selling</span>
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-r from-gray-100 to-gray-400">
                  <ArrowRight size={10} color="black" />
                </span>
              </button>
            </Link>
          </div>

          <div>
            <div className="flex justify-between py-20">
              <div className="space-y-4 ">
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

              <div className="flex gap-32">
                <div>
                  <h3 className="font-semibold mb-4">Navigation</h3>
                  <ul className="space-y-3 text-base text-white/80">
                    <ul className="space-y-3 text-base text-white/80">
                      <li>
                        <Link href="/" className="hover:text-white">Home</Link>
                      </li>
                      <li>
                        <Link href="/collections?category=auction" className="hover:text-white">
                          Auction Watches
                        </Link>
                      </li>
                      <li>
                        <Link href="/collections?category=fixed" className="hover:text-white">
                          Fixed Price
                        </Link>
                      </li>
                      <li>
                        <Link href="/collections?category=all" className="hover:text-white">
                          Categories
                        </Link>
                      </li>
                    </ul>
                  </ul>
                </div>

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

                <div>
                  <h3 className="font-semibold mb-4">Contacts us</h3>
                  <ul className="space-y-3 text-base text-white/80">
                    <li className="flex items-center gap-2">
                      <span>
                        <Mail />
                      </span>
                      support@Bidthebezel.com
                    </li>
                    <li className="flex items-center gap-2">
                      <span>
                        <Phone />
                      </span>
                      +1 (310) 925-3575
                    </li>
                    <li className="flex items-center gap-2">
                      <span>
                        <MapPin />
                      </span>
                      Los Angeles
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className=" mt-12 pt-6 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-xs text-white/80">{copyright}</p>

              <div className="flex items-center gap-6 text-gray-400">
                <Link href="#" className="hover:text-white">
                  <svg width="11" height="19" viewBox="0 0 11 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.31339 18.395V10.1844H10.2081L10.6415 6.98452H7.31331V4.94155C7.31331 4.01512 7.58348 3.38381 8.97893 3.38381L10.7586 3.38301V0.521091C10.4508 0.482165 9.39429 0.39502 8.16531 0.39502C5.59929 0.39502 3.84255 1.88619 3.84255 4.62474V6.98452H0.94043V10.1844H3.84255V18.3949H7.31339V18.395Z" fill="white" />
                  </svg>

                </Link>
                <Link href="#" className="hover:text-white">
                  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.84961 0.39502C13.4447 0.39502 15.2424 0.394824 16.5371 1.25146C17.1153 1.63402 17.6106 2.12936 17.9932 2.70752C18.8498 4.00225 18.8496 5.79995 18.8496 9.39502C18.8496 12.9901 18.8498 14.7878 17.9932 16.0825C17.6106 16.6607 17.1153 17.156 16.5371 17.5386C15.2424 18.3952 13.4447 18.395 9.84961 18.395C6.25454 18.395 4.45684 18.3952 3.16211 17.5386C2.58395 17.156 2.08861 16.6607 1.70605 16.0825C0.849414 14.7878 0.849609 12.9901 0.849609 9.39502C0.849609 5.79995 0.849414 4.00225 1.70605 2.70752C2.08861 2.12936 2.58395 1.63402 3.16211 1.25146C4.45684 0.394824 6.25454 0.39502 9.84961 0.39502ZM9.84961 4.73584C7.27636 4.73584 5.19055 6.8218 5.19043 9.39502C5.19043 11.9683 7.27629 14.0542 9.84961 14.0542C12.4229 14.0541 14.5088 11.9683 14.5088 9.39502C14.5087 6.82186 12.4228 4.73593 9.84961 4.73584ZM9.84961 6.31201C11.5522 6.3121 12.9325 7.69248 12.9326 9.39502C12.9326 11.0977 11.5522 12.4779 9.84961 12.478C8.14691 12.478 6.7666 11.0977 6.7666 9.39502C6.76672 7.69243 8.14699 6.31201 9.84961 6.31201ZM14.6934 3.40674C14.0888 3.40674 13.5978 3.89694 13.5977 4.50146C13.5977 5.10612 14.0887 5.59619 14.6934 5.59619C15.2978 5.59593 15.7881 5.10596 15.7881 4.50146C15.7879 3.8971 15.2977 3.40699 14.6934 3.40674Z" fill="white" />
                  </svg>

                </Link>
                <Link href="#" className="hover:text-white">
                  <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.2882 14.3747L7.22605 14.2988C5.9108 14.2723 4.59228 14.3251 3.30282 14.051C1.34126 13.6415 1.20229 11.6336 1.05688 9.94939C0.856519 7.58155 0.934085 5.17074 1.31219 2.82266C1.52565 1.50514 2.36568 0.718973 3.66476 0.633423C8.05011 0.322948 12.4646 0.359743 16.8403 0.50459C17.3024 0.517869 17.7677 0.590445 18.2234 0.673056C20.4727 1.07597 20.5275 3.35137 20.6733 5.26683C20.8187 7.20205 20.7573 9.14721 20.4794 11.0693C20.2564 12.6607 19.8298 13.9952 18.0294 14.124C15.7737 14.2925 13.5697 14.4281 11.3076 14.3849C11.3077 14.3747 11.2947 14.3747 11.2882 14.3747ZM8.90006 10.3457C10.6 9.34831 12.2674 8.36752 13.9576 7.3768C12.2545 6.37939 10.5902 5.3986 8.90006 4.40788V10.3457Z" fill="white" />
                  </svg>

                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
