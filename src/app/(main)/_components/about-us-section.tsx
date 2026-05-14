import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const AboutUsSection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            About Bid The Bezel
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Bid The Bezel is a modern luxury watch marketplace built for collectors, enthusiasts, buyers, and sellers who value trust, privacy, and transparency.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Our platform provides a secure environment where users can buy, sell, and auction luxury timepieces through a streamlined and anonymous experience. Whether you are searching for your next investment piece or listing a rare watch for auction, Bid The Bezel brings together a passionate community of watch enthusiasts in one trusted marketplace.
          </p>
          
          <Link href="/about">
            <button className="inline-flex items-center gap-2 bg-[#0D1B2A] text-white px-6 py-3 rounded-full hover:bg-[#1B3A4B] transition-colors font-medium">
              Learn More About Us
              <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
