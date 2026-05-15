import React from "react";
import { Shield, CheckCircle, Eye, Gavel, MessageSquare, Award } from "lucide-react";

const AboutUs = () => {
  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure escrow protected transactions",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Professional watch authentication",
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Anonymous user profiles for privacy",
    },
    {
      icon: <Gavel className="w-8 h-8" />,
      title: "Live auction experiences",
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Real time bidding and communication",
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Verified and transparent marketplace activity",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#0D1B2A] to-[#1B3A4B] text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">About Us</h1>
          <p className="text-xl text-gray-200">
            A modern luxury watch marketplace built for collectors, enthusiasts, buyers, and sellers
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 text-gray-700 text-lg leading-relaxed">
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About Bid The Bezel</h2>
            <p className="mb-4">
              Bid The Bezel is a modern luxury watch marketplace built for collectors, enthusiasts, buyers, and sellers who value trust, privacy, and transparency.
            </p>
            <p className="mb-4">
              Our platform provides a secure environment where users can buy, sell, and auction luxury timepieces through a streamlined and anonymous experience. Whether you are searching for your next investment piece or listing a rare watch for auction, Bid The Bezel brings together a passionate community of watch enthusiasts in one trusted marketplace.
            </p>
            <p>
              With features such as live auctions, escrow protected payments, watch authentication services, anonymous usernames, and real time bidding, Bid The Bezel is designed to make luxury watch trading safer and more accessible.
            </p>
          </section>

          <section className="pt-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="mb-6">
              We believe that luxury watch transactions should be exciting, secure, and fair for everyone involved. That is why we focus on:
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="text-[#0D1B2A] flex-shrink-0">
                    {feature.icon}
                  </div>
                  <p className="text-gray-800 font-medium">{feature.title}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="pt-8">
            <p className="text-xl text-gray-800 leading-relaxed">
              At Bid The Bezel, every detail is built to create confidence between buyers and sellers while elevating the overall luxury watch trading experience.
            </p>
          </section>

          {/* Call to Action */}
          <section className="pt-12 text-center">
            <div className="bg-gradient-to-r from-[#0D1B2A] to-[#1B3A4B] text-white py-12 px-8 rounded-2xl">
              <h3 className="text-3xl font-bold mb-4">Luxury trading starts here.</h3>
              <p className="text-lg text-gray-200 mb-8">
                Join our community of watch enthusiasts and experience the future of luxury watch trading.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
