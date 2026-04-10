import React, { useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  Shield,
  Award,
  Microscope,
  MessageCircle,
} from "lucide-react";
import blazonLogo from "@/assets/logo.png";
import { allProducts } from "@/data/products";
import {
  PHONE_1,
  PHONE_2,
  PHONE_3,
  PHONE_1_TEL,
  PHONE_2_TEL,
  PHONE_3_TEL,
  EMAIL,
  WHATSAPP,
  MAP_URL,
  GOOGLE_MAPS_EMBED,
  certifications,
  team,
  quickLinks,
} from "@/data/home-constants";
import { homeStyles } from "@/styles/home-styles";
import AnimatedDNA from "@/components/AnimatedDNA";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      {/* ─── GLOBAL STYLES ─── */}
      <style>{homeStyles}</style>

      {/* ─── FLOATING CONTACT BUTTONS ─── */}
      <div className="fixed bottom-6 right-5 z-[200] flex flex-col gap-3">
        <a
          href={PHONE_1_TEL}
          title="Call us"
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-110"
          style={{ background: "linear-gradient(135deg,#f97316,#ea580c)" }}
        >
          <Phone className="w-5 h-5 text-white" />
        </a>
        <a
          href={`mailto:${EMAIL}`}
          title="Email us"
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-110"
          style={{ background: "linear-gradient(135deg,#1a3c6e,#2563eb)" }}
        >
          <Mail className="w-5 h-5 text-white" />
        </a>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          title="Chat on WhatsApp"
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-110"
          style={{ background: "linear-gradient(135deg,#128C7E,#25D366)" }}
        >
          <MessageCircle className="w-5 h-5 text-white" />
        </a>
      </div>

      {/* ─── NAVIGATION ─── */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#080c14]/90 backdrop-blur-xl border-b border-white/5 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <a
            href="#"
            className={`flex items-center gap-3 transition-all duration-500 ${
              scrolled
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4 pointer-events-none"
            }`}
          >
            <img
              src={blazonLogo}
              alt="Blazon Biotek"
              className="h-10 object-contain rounded-md"
            />
            <div>
              <div className="text-white font-bold text-base leading-tight">
                Blazon Biotek
              </div>
              <div className="text-white/90 text-[13px]">Pvt. Ltd.</div>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
            {["About", "Products", "Leadership", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-white transition-colors tracking-wide"
              >
                {item}
              </a>
            ))}
            <a
              href="#contact"
              className="ml-2 px-5 py-2 rounded-full bg-orange-600 text-white text-sm font-semibold hover:bg-orange-600/70 transition-colors shadow-lg shadow-primary/25"
            >
              Get in Touch
            </a>
          </nav>

          <button
            className="md:hidden text-white/70 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className="h-px bg-current block" />
              <span className="h-px bg-current block" />
              <span className="h-px bg-current block" />
            </div>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0c1120]/95 backdrop-blur-xl border-t border-white/5 px-6 py-6 flex flex-col gap-4 text-white/70 text-sm">
            {["About", "Products", "Leadership", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-white py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-orange-500 blur-[180px] opacity-40"></div>
        <AnimatedDNA />

        <div className="container mx-auto px-6 md:px-12 relative z-10 pt-24">
          {/* HERO LOGO */}
          <div
            className={`transition-all duration-700 mb-6 ${
              scrolled
                ? "opacity-0 -translate-y-10"
                : "opacity-100 translate-y-0"
            }`}
          >
            <div className="flex items-center gap-4">
              <img
                src={blazonLogo}
                alt="Blazon Biotek"
                className="h-20 md:h-24 object-contain drop-shadow-xl"
              />
              <div>
                <div className="text-white font-semibold text-2xl leading-tight">
                  Blazon Biotek
                </div>
                <div className="text-white/80 text-sm">Pvt. Ltd.</div>
              </div>
            </div>
            <div className="text-xs text-white/50 mb-2 mt-4 tracking-widest uppercase">
              Since 2005 • Trusted Pharma Partner
            </div>
          </div>

          {/* BADGE */}
          <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-white/70 backdrop-blur-md mb-6">
            WHO-GMP Certified Pharmaceutical Company
          </p>

          {/* HEADING */}
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            Healing.
            <br />
            <span className="font-serif-italic text-orange-500 font-semibold">
              Innovating.
            </span>
            <br />
            Caring.
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-6 text-white/70 max-w-xl">
            Blazon Biotek Private Limited – a Delhi-based pharmaceutical company
            specializing in sourcing and distributing safe, effective, and
            affordable medicines since 2005.
          </p>

          {/* BUTTONS */}
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link
              href="/products"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full shadow-lg transition"
            >
              Explore Products →
            </Link>
            <a
              href="#about"
              className="border border-white/20 text-white px-6 py-3 rounded-full hover:bg-white/10 transition"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* ─── CERTIFICATIONS ─── */}
      <section
        className="py-12 border-y border-white/5"
        style={{ background: "rgba(255,255,255,0.02)" }}
      >
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
            {certifications.map(({ icon: IconName, label, sub }, i) => {
              const IconMap: Record<string, React.ComponentType<any>> = {
                "Shield": Shield,
                "Award": Award,
                "Microscope": Microscope,
              };
              const Icon = IconMap[IconName as string] || Shield;
              return (
                <div
                  key={i}
                  className="glow-card cert-card rounded-2xl p-6 border border-white/8 flex flex-col items-center text-center gap-3 w-full max-w-xs"
                  style={{ background: "rgba(255,255,255,0.025)" }}
                >
                  <div className="cert-icon w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>

                  <div>
                    <div className="text-white font-semibold text-sm">
                      {label}
                    </div>
                    <div className="text-white/50 text-xs">{sub}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="py-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center text-center">
            {[
              { value: "2005", label: "Established" },
              { value: "125+", label: "Products" },
              { value: "Delhi", label: "Headquarters" },
              { value: "₹55L", label: "Paid Up Capital" },
            ].map(({ value, label }, i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className="text-4xl md:text-5xl font-bold mb-2 text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg,#fff,rgba(255,255,255,0.5))",
                  }}
                >
                  {value}
                </div>
                <div className="text-white/40 text-sm uppercase tracking-widest">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 70% at 100% 50%, rgba(192,57,43,0.06) 0%, transparent 70%)",
          }}
        />
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-primary text-xs font-bold uppercase tracking-widest mb-4">
                About Us
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
                Scientific Precision. <br />
                <span className="font-serif-italic font-normal text-white/50">
                  Genuine Care.
                </span>
              </h2>
              <p className="text-white/50 text-lg leading-relaxed mb-8">
                Registered at RoC Delhi (CIN: U24233DL2005PTC142837), Blazon
                Biotek Private Limited has dedicated nearly two decades to
                sourcing and supplying high-quality pharmaceuticals, medicinal
                chemicals, and botanical products to healthcare providers across
                India.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Compliance you can trust",
                  "Quality medicines from verified sources",
                  "Making healthcare affordable",
                  "Committed to better health outcomes",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-sm text-white/60"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Corporate Details card */}
            <div
              className="glow-card rounded-2xl p-8 border border-white/8"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <h3 className="text-white font-bold text-lg mb-6">
                Corporate Details
              </h3>
              <dl className="space-y-4">
                {[
                  { label: "Company", value: "BLAZON BIOTEK PRIVATE LIMITED" },
                  { label: "CIN", value: "U24233DL2005PTC142837" },
                  { label: "Registration No.", value: "142837" },
                  { label: "GSTIN", value: "09AACCB7427K1ZF" },
                  { label: "Incorporated", value: "22 Dec 2005" },
                  { label: "Auth. Capital", value: "Rs. 5,500,000.00" },
                  { label: "Paid Up Capital", value: "Rs. 5,500,000.00" },
                  { label: "Last AGM", value: "30 Dec 2023" },
                ].map(({ label, value }, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-start gap-4 pb-4 border-b border-white/5 last:border-0 last:pb-0"
                  >
                    <dt className="text-white/40 text-xs shrink-0">{label}</dt>
                    <dd className="text-white/80 text-xs text-right font-mono">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRODUCTS ─── */}
      <section id="products" className="py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(30,60,100,0.08) 0%, transparent 70%)",
          }}
        />
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="text-primary text-xs font-bold uppercase tracking-widest mb-4">
                Our Range
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                Trusted Formulations.{" "}
                <br />
                <span className="font-serif-italic font-normal text-white/50">
                  Proven Results.
                </span>
              </h2>
            </div>
          </div>

          {/* 4 featured product cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {allProducts.slice(0, 4).map((product) => (
              <div
                key={product.name}
                className="flip-card glow-card"
                style={{ height: "300px" }}
                data-product-card
              >
                <div className="flip-card-inner">
                  {/* FRONT */}
                  <div
                    className="flip-card-front flex flex-col border border-white/8"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                  >
                    <div
                      className="flex-1 flex items-center justify-center p-6 relative overflow-hidden"
                      style={{ background: "rgba(255,255,255,0.04)" }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23111'/%3E%3C/svg%3E";
                        }}
                      />
                      <div className="absolute top-2 left-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-green-500/15 border border-green-500/30 text-green-400 text-[10px] font-semibold">
                          Certified
                        </span>
                      </div>
                      <div className="absolute top-2 right-2">
                        <img src="/src/assets/aerrow.png" alt="arrow" className="w-8 h-8" />
                      </div>
                      <div className="absolute bottom-2 right-2 text-white/20 text-[9px] uppercase tracking-widest">
                        Hover
                      </div>
                    </div>
                    <div className="p-4 border-t border-white/5">
                      <h3 className="text-white font-bold text-sm">{product.name}</h3>
                    </div>
                  </div>

                  {/* BACK */}
                  <div
                    className="flip-card-back flex flex-col justify-between p-5 border border-primary/20 relative"
                    style={{
                      background:
                        "linear-gradient(145deg, rgba(249,115,22,0.12) 0%, rgba(15,20,35,0.98) 40%)",
                    }}
                  >
                    <div className="absolute top-2 left-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-green-500/15 border border-green-500/30 text-green-400 text-[10px] font-semibold">
                        Certified
                      </span>
                    </div>
                    <div className="absolute top-2 right-2">
                      <img src="/src/assets/aerrow.png" alt="arrow" className="w-8 h-8" />
                    </div>
                    <div className="w-8 h-0.5 bg-primary rounded mb-3 mt-6" />
                    <div className="flex-1 flex flex-col justify-center gap-3">
                      <div>
                        <h3 className="text-white font-bold text-base leading-tight mb-2">
                          {product.name}
                        </h3>
                        <p className="text-white/60 text-xs leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                      <div
                        className="rounded-lg p-3 border border-white/8"
                        style={{ background: "rgba(255,255,255,0.04)" }}
                      >
                        <div className="text-white/35 text-[9px] uppercase tracking-wider mb-1">Composition</div>
                        <p className="text-white/70 text-[10px] font-mono leading-relaxed">
                          {product.composition}
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/products"
                      className="mt-3 px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition text-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Browse all link */}
          <div className="flex justify-center">
            <Link
              href="/products"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'auto' });
              }}
              className="px-8 py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition shadow-lg shadow-orange-500/30 flex items-center gap-2"
            >
              Browse All Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── LEADERSHIP ─── */}
      <section id="leadership" className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-primary text-xs font-bold uppercase tracking-widest mb-4 text-center">
            Leadership
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-14 text-center">
            The People Behind <br />
            <span className="font-normal text-white/50">
              Blazon Biotek's Success
            </span>
          </h2>
          <div className="grid gap-8 justify-items-center [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
            {team.map(({ name, role, initials }) => (
              <div
                key={name}
                className="glow-card team-card rounded-2xl p-8 border border-white/8 text-center flex flex-col items-center w-full"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <div className="team-initials w-16 h-16 rounded-2xl bg-primary/15 border border-primary/25 flex items-center justify-center text-primary font-bold text-xl mb-6">
                  {initials}
                </div>
                <h3 className="text-white font-bold text-xl mb-1">{name}</h3>
                <p className="text-white/40 text-sm">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 0% 50%, rgba(192,57,43,0.06) 0%, transparent 70%)",
          }}
        />
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-primary text-xs font-bold uppercase tracking-widest mb-4">
            Contact
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-14">
            Let's Connect. <br />
            <span className="font-serif-italic font-normal text-white/50">
              We're Here For You.
            </span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* VISIT */}
            <div className="glow-card rounded-2xl p-6 border border-white/10 bg-white/[0.02] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-orange-500" />
                  </div>
                  <h3 className="text-white font-semibold">Visit Us</h3>
                </div>

                <p className="text-white/50 text-sm leading-relaxed mb-5">
                  Swasthya Vihar, Opp. Bank of Maharastra <br />
                  Modinagar, Ghaziabad - 201201
                </p>
              </div>

              <a
                href={MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full h-11 rounded-lg bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition"
              >
                <MapPin className="w-4 h-4" /> Open in Maps
              </a>
            </div>

            {/* CALL */}
            <div className="glow-card rounded-2xl p-6 border border-white/10 bg-white/[0.02] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-orange-500" />
                  </div>
                  <h3 className="text-white font-semibold">Call Us</h3>
                </div>

                <p className="text-white/50 text-sm mb-5">
                  Talk directly with our team
                </p>
              </div>

              <div className="flex gap-2">
                <a
                  href={PHONE_1_TEL}
                  className="flex-1 flex items-center justify-center gap-2 h-11 rounded-lg bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition"
                >
                  <Phone className="w-4 h-4" /> Call
                </a>

                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 h-11 rounded-lg bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
              </div>
            </div>

            {/* EMAIL */}
            <div className="glow-card rounded-2xl p-6 border border-white/10 bg-white/[0.02] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-orange-500" />
                  </div>
                  <h3 className="text-white font-semibold">Email Us</h3>
                </div>

                <p className="text-white/50 text-sm mb-5 break-all">{EMAIL}</p>
              </div>

              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center justify-center gap-2 w-full h-11 rounded-lg bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition"
              >
                <Mail className="w-4 h-4" /> Send Email
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer
        className="border-t border-white/8 pt-16 pb-8"
        style={{ background: "rgba(255,255,255,0.015)" }}
      >
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 pb-12 border-b border-white/8">
            {/* Col 1: Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-5">
                <img
                  src={blazonLogo}
                  alt="Blazon Biotek"
                  className="h-12 object-contain rounded-md"
                />
                <div>
                  <div className="text-white font-bold text-sm leading-tight">
                    Blazon Biotek
                  </div>
                  <div className="text-white/90 text-xs">Pvt. Ltd.</div>
                </div>
              </div>
              <p className="text-white/35 text-sm leading-relaxed mb-5">
                Delhi-based pharmaceutical company producing safe, effective,
                and affordable medicines since 2005.
              </p>
              <div className="text-white/25 text-xs space-y-1">
                <div>CIN: U24233DL2005PTC142837</div>
                <div>GSTIN: 09AACCB7427K1ZF</div>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-widest">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-white/45 text-sm hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-primary/60 group-hover:bg-primary transition-colors" />
                      {label}
                    </a>
                  </li>
                ))}
                <li>
                  <Link
                    href="/products"
                    className="text-white/45 text-sm hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/60 group-hover:bg-primary transition-colors" />
                    Product Gallery
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-widest">
                Our Location
              </h4>
              <div className="rounded-lg overflow-hidden border border-white/10 h-48">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen={true}
                  referrerPolicy="no-referrer-when-downgrade"
                  src={GOOGLE_MAPS_EMBED}
                  title="Blazon Biotek Location"
                ></iframe>
              </div>
            </div>

            {/* Col 4: Contact */}
            <div>
              <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-widest">
                Contact Info
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-white/40 text-xs leading-relaxed">
                    RO- 1892 New Hariram Market Bhagirath Palac <br />
                    Delhi, India - 110006 <br />
                    HO- Swasthya Vihar, Opp. Bank of Maharastra <br />
                    Modinagar, Ghaziabad - 201201
                  </span>
                </li>
                <li className="flex flex-col items-start gap-2">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <a
                      href={PHONE_1_TEL}
                      className="text-white/40 text-xs hover:text-white transition-colors"
                    >
                      {PHONE_1}
                    </a>
                  </div>
                  <a
                    href={PHONE_2_TEL}
                    className="text-white/40 text-xs hover:text-white transition-colors pl-7"
                  >
                    {PHONE_2}
                  </a>
                  <a
                    href={PHONE_3_TEL}
                    className="text-white/40 text-xs hover:text-white transition-colors pl-7"
                  >
                    {PHONE_3}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <a
                    href={`mailto:${EMAIL}`}
                    className="text-white/40 text-xs hover:text-white transition-colors break-all"
                  >
                    {EMAIL}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <MessageCircle
                    className="w-4 h-4 shrink-0"
                    style={{ color: "#25d366" }}
                  />
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline"
                  >
                    WhatsApp Us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
            <p className="text-white/25 text-xs">
              © {new Date().getFullYear()} Blazon Biotek Private Limited. All
              rights reserved.
            </p>
            <div className="flex gap-5 text-xs text-white/25">
              <span>WHO-GMP Certified</span>
              <span>·</span>
              <span>FDA Approved</span>
              <span>·</span>
              <span>ISO Certified</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
