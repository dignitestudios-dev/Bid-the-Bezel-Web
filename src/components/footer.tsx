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
            <button className="flex items-center gap-2 bg-[#0D1B2A0D] border border-gray-300 rounded-full px-1 pl-2 py-1 hover:shadow-md transition">
              <span className="text-gray-700 font-medium">Start Selling</span>
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-r from-gray-100 to-gray-400">
                <ArrowRight size={10} color="black" />
              </span>
            </button>
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
                    <li>Home</li>
                    <li>Auction Watches</li>
                    <li>Fixed Price</li>
                    <li>Categories</li>
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
                  
                </Link>
                <Link href="#" className="hover:text-white">
                  
                </Link>
                <Link href="#" className="hover:text-white">
                  
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
