import React from "react";
import {
  FileText,
  Award,
  BookOpen,
  BarChart3,
  Shield,
  Package,
  Briefcase,
  Leaf,
  Download,
} from "lucide-react";
import { resources, resourceCategories } from "@/data/resources";

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  FileText,
  Award,
  BookOpen,
  BarChart3,
  Shield,
  Package,
  Briefcase,
  Leaf,
};

export default function ResourcesSection() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>(
    "All Resources"
  );

  const filteredResources =
    selectedCategory === "All Resources"
      ? resources
      : resources.filter((res) => res.category === selectedCategory);

  return (
    <section id="resources" className="py-20 px-6 md:px-12 bg-[#0a0e18]">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
            <Download className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium text-green-500">
              Free Downloads
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Downloadable <span className="text-green-500">Resources</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Access product documentation, certifications, clinical guidelines, and professional resources
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {resourceCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition-all text-sm ${
                selectedCategory === category
                  ? "bg-green-600 text-white shadow-lg shadow-green-600/25"
                  : "bg-white/5 text-white/70 hover:text-white border border-white/10 hover:border-green-500/50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {filteredResources.map((resource) => {
            const Icon = iconMap[resource.icon] || FileText;
            return (
              <a
                key={resource.id}
                href={resource.url}
                className="group p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 hover:border-green-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-green-500/10 cursor-pointer"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 group-hover:bg-green-500/20 transition-colors">
                    <Icon className="w-6 h-6 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold group-hover:text-green-400 transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-xs text-white/60 mt-1">
                      {resource.category}
                    </p>
                  </div>
                </div>

                <p className="text-white/70 text-sm mb-4 leading-relaxed">
                  {resource.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-xs text-white/60">{resource.size}</span>
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors">
                    <Download className="w-3.5 h-3.5" />
                    <span className="text-xs font-medium">{resource.type}</span>
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/60 mb-4">No resources found in this category.</p>
            <button
              onClick={() => setSelectedCategory("All Resources")}
              className="inline-block px-6 py-2 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
            >
              View All Resources
            </button>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="p-8 rounded-xl bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-500/20">
          <h3 className="text-white font-semibold text-lg mb-2">Need a specific resource?</h3>
          <p className="text-white/70 mb-6">
            If you can't find what you're looking for, our team can provide customized documentation and resources tailored to your needs.
          </p>
          <a
            href="mailto:blazonbiotek@gmail.com?subject=Resource Request"
            className="inline-block px-6 py-3 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
          >
            Request a Resource
          </a>
        </div>
      </div>
    </section>
  );
}
