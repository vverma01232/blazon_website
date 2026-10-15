import React from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { faqs } from "@/data/faq";

export default function FAQSection() {
  const [expandedId, setExpandedId] = React.useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");

  const categories = ["All", ...new Set(faqs.map((faq) => faq.category))];
  const filteredFaqs =
    selectedCategory === "All"
      ? faqs
      : faqs.filter((faq) => faq.category === selectedCategory);

  return (
    <section id="faq" className="py-20 px-6 md:px-12 bg-[#0f1423]">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <HelpCircle className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-500">
              Questions Answered
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked <span className="text-blue-500">Questions</span>
          </h2>
          <p className="text-lg text-white/60">
            Find answers to common questions about our products, ordering, compliance, and support
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                  : "bg-white/5 text-white/70 hover:text-white border border-white/10 hover:border-blue-500/50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className="rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/5 transition-all overflow-hidden"
            >
              <button
                onClick={() =>
                  setExpandedId(expandedId === faq.id ? null : faq.id)
                }
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-white/5 transition-all"
              >
                <div className="text-left flex-1">
                  <p className="text-white font-semibold mb-1 text-lg">
                    {faq.question}
                  </p>
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-medium text-blue-400">
                    {faq.category}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-blue-500 transition-transform duration-300 flex-shrink-0 ml-4 ${
                    expandedId === faq.id ? "rotate-180" : ""
                  }`}
                />
              </button>

              {expandedId === faq.id && (
                <div className="px-6 py-4 border-t border-white/10 bg-white/[0.02]">
                  <p className="text-white/80 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-12 p-8 rounded-xl bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/20">
          <h3 className="text-white font-semibold text-lg mb-2">
            Still have questions?
          </h3>
          <p className="text-white/70 mb-6">
            Our expert team is ready to help. Reach out to us anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:blazonbiotek@gmail.com"
              className="inline-block px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors text-center"
            >
              Email Us
            </a>
            <a
              href="tel:+919837602964"
              className="inline-block px-6 py-3 rounded-full bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors border border-white/20 text-center"
            >
              Call: +91-9837602964
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
