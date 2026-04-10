import React from "react";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { useLocation } from "wouter";
import { PHONE_1, EMAIL, WHATSAPP } from "@/data/home-constants";

export const HeroSection = React.memo(() => {
  const [, navigate] = useLocation();

  return (
    <section className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 relative overflow-hidden flex flex-col items-center justify-center px-4 py-20">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center mb-20">
        <div className="inline-block mb-6 px-4 py-2 bg-orange-600/10 rounded-full border border-orange-600/30">
          <p className="text-orange-400 text-sm font-medium tracking-wide">
            Advanced Pharmaceutical Solutions
          </p>
        </div>

        <h1 className="text-5xl md:text-7xl font-black mb-6 text-white leading-tight">
          Leading Pharmaceutical
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400">
            Innovation
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Trusted by healthcare professionals worldwide. Delivering cutting-edge
          pharmaceutical solutions for a healthier tomorrow.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={() => navigate("/products")}
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-orange-600/50 transition-all duration-300 transform hover:-translate-y-1"
          >
            Explore Products
          </button>
          <button
            onClick={() =>
              window.open(
                `https://wa.me/${WHATSAPP.replace(/\D/g, "")}?text=Hello%20Blazon%20Biotek%2C%20I%20am%20interested%20in%20your%20products.`,
                "_blank"
              )
            }
            className="px-8 py-4 border-2 border-gray-400 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300"
          >
            Get in Touch
          </button>
        </div>

        {/* Contact Quick Links */}
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <a
            href={`tel:${PHONE_1}`}
            className="flex items-center gap-2 text-gray-300 hover:text-orange-400 transition"
          >
            <Phone size={16} />
            {PHONE_1}
          </a>
          <span className="text-gray-600">•</span>
          <a
            href={`mailto:${EMAIL}`}
            className="flex items-center gap-2 text-gray-300 hover:text-orange-400 transition"
          >
            <Mail size={16} />
            {EMAIL}
          </a>
          <span className="text-gray-600">•</span>
          <a
            href={`https://wa.me/${WHATSAPP.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-300 hover:text-green-400 transition"
          >
            <MessageCircle size={16} />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";
    