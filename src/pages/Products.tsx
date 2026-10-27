import React, { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Star, ArrowLeft, Search } from "lucide-react";
import blazonLogo from "@/assets/logo.png";
import arrow from "@/assets/aerrow.png";
import { allProducts } from "@/data/products";
import FlipCard from "@/components/FlipCard";

const PAGE_SIZE = 12;

const categories = [
  "All",
  ...Array.from(new Set(allProducts.map((p) => p.category))),
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-3 h-3 ${s <= Math.floor(rating) ? "fill-amber-400 text-amber-400" : "text-white/20"}`}
        />
      ))}
      <span className="text-xs text-white/50 ml-1">{rating}</span>
    </div>
  );
}

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const filtered = allProducts.filter((p) => {
    const matchesCat =
      activeCategory === "All" || p.category === activeCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.composition.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeCategory, search]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || visibleCount >= filtered.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setVisibleCount((count) => Math.min(count + PAGE_SIZE, filtered.length));
      },
      { rootMargin: "700px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [filtered.length, visibleCount]);

  const shown = filtered.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#080c14] py-4">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between gap-3">
          <Link href="/" className="flex min-h-11 min-w-0 items-center gap-2">
            <img
              src={blazonLogo}
              alt="Blazon Biotek"
              className="h-9 w-9 shrink-0 object-contain rounded-md sm:h-10 sm:w-auto"
            />
            <div className="min-w-0">
              <div className="truncate text-white font-bold text-sm sm:text-base leading-tight">
                Blazon Biotek
              </div>
              <div className="text-white/35 text-xs">Pvt. Ltd.</div>
            </div>
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-11 shrink-0 items-center gap-1.5 px-2 text-white/60 hover:text-white text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section
        className="pt-16 pb-12 relative"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(192,57,43,0.1) 0%, transparent 70%), #080c14",
        }}
      >
        <div className="container mx-auto px-6 md:px-12 text-center">
          <div className="text-primary text-xs font-bold uppercase tracking-widest mb-3">
            Full Catalogue
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Product{" "}
            <span className="font-serif-italic font-normal">Gallery</span>
          </h1>
          <p className="text-white/45 max-w-xl mx-auto mb-8">
            Our complete range of certified pharmaceutical formulations, sourced
            from trusted manufacturers and delivered with strict quality
            assurance.
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search by name, composition..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-full pl-11 pr-5 py-3 text-base focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Category filter */}
      <div className="sticky top-[77px] z-40 border-b border-white/5 bg-[#080c14] py-3">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`min-h-11 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "bg-white/5 border border-white/10 text-white/50 hover:text-white hover:border-white/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6 md:px-12">
          <p className="text-white/30 text-sm mb-8">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-24 text-white/30">
              No products match your search.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {shown.map((product, index) => (
                <FlipCard
                  key={`${product.name}-${index}`}
                  className="flip-card-catalog"
                  label={`Show details for ${product.name}`}
                >
                  <div className="flip-card-inner">

                    {/* ── FRONT ── */}
                    <div
                      className="flip-card-front flex flex-col border border-white/8"
                      style={{ background: "rgba(255,255,255,0.03)" }}
                    >
                      <div
                        className="flex-1 flex items-center justify-center p-5 relative overflow-hidden"
                        style={{ background: "rgba(255,255,255,0.04)" }}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          decoding="async"
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
                          <img src={arrow} alt="arrow" className="w-8 h-8" />
                        </div>
                        <div className="absolute bottom-2 right-2 text-white/20 text-[9px] uppercase tracking-widest">
                          Details
                        </div>
                      </div>
                      <div className="p-4 border-t border-white/5">
                        <div className="text-white/30 text-[10px] uppercase tracking-widest mb-0.5">{product.category}</div>
                        <h3 className="text-white font-bold text-sm">{product.name}</h3>
                      </div>
                    </div>

                    {/* ── BACK ── */}
                    <div
                      className="flip-card-back flex flex-col justify-between p-5 border border-primary/20 relative"
                      style={{
                        background:
                          "linear-gradient(145deg, rgba(192,57,43,0.12) 0%, rgba(15,20,35,0.98) 40%)",
                      }}
                    >
                      <div className="absolute top-2 left-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-green-500/15 border border-green-500/30 text-green-400 text-[10px] font-semibold">
                          Certified
                        </span>
                      </div>
                      <div className="absolute top-2 right-2">
                        <img src={arrow} alt="arrow" className="w-8 h-8" />
                      </div>
                      {/* Top accent line */}
                      <div className="w-8 h-0.5 bg-primary rounded mb-3 mt-6" />

                      <div className="flex-1 flex flex-col justify-center gap-3">
                        <div>
                          <div className="text-primary text-[10px] font-bold uppercase tracking-widest mb-1">
                            {product.category}
                          </div>
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

                      <div className="flex items-center justify-between mt-3">
                        <StarRating rating={product.rating} />
                        <span className="text-white/20 text-[9px] uppercase tracking-widest">WHO-GMP</span>
                      </div>
                    </div>

                  </div>
                </FlipCard>
              ))}
            </div>
          )}
          {visibleCount < filtered.length && (
            <div ref={sentinelRef} className="h-8" aria-hidden="true" />
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5 mt-12">
        <div className="container mx-auto px-6 md:px-12 text-center text-white/25 text-xs">
          © {new Date().getFullYear()} Blazon Biotek Private Limited · GSTIN:
          09AACCB7427K1ZF
        </div>
      </footer>
    </div>
  );
}
