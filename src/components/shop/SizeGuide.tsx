"use client";

import { useState } from "react";
import { X, Ruler } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SizeGuideProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "top" | "shoe" | "clothing" | "shoes";
}

export function SizeGuide({ isOpen, onClose, defaultTab = "top" }: SizeGuideProps) {
  const initialCategory = defaultTab === "shoe" || defaultTab === "shoes" ? "shoes" : "clothing";
  const [activeTab, setActiveTab] = useState<"clothing" | "shoes">(initialCategory);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-dark/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="relative w-full max-w-2xl bg-cream-light rounded-2xl border border-blush/60 shadow-2xl p-6 sm:p-8 z-10 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-5 border-b border-blush/40">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-gold border border-gold/20 shadow-xs">
                  <Ruler className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-xl sm:text-2xl font-semibold text-dark">
                    Size & Fit Guide
                  </h3>
                  <p className="text-xs text-dark/60">
                    Find your perfect Cloudlette measurements
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-cream hover:bg-blush/30 border border-blush/40 text-dark/70 hover:text-dark flex items-center justify-center transition-colors"
                aria-label="Close size guide"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tab switchers */}
            <div className="flex space-x-2 mt-5 p-1 bg-cream rounded-xl border border-blush/30">
              <button
                type="button"
                onClick={() => setActiveTab("clothing")}
                className={`flex-1 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-lg transition-all ${
                  activeTab === "clothing"
                    ? "bg-dark text-cream shadow-sm"
                    : "text-dark/70 hover:text-dark hover:bg-blush/20"
                }`}
              >
                Clothing (Tops & Apparel)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("shoes")}
                className={`flex-1 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-lg transition-all ${
                  activeTab === "shoes"
                    ? "bg-dark text-cream shadow-sm"
                    : "text-dark/70 hover:text-dark hover:bg-blush/20"
                }`}
              >
                Footwear (Heels, Mules & Slides)
              </button>
            </div>

            {/* Tables Container */}
            <div className="mt-6">
              {activeTab === "clothing" ? (
                <div>
                  <div className="overflow-x-auto rounded-xl border border-blush/40 bg-white/70">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead>
                        <tr className="bg-cream/80 border-b border-blush/40 text-dark font-heading font-semibold">
                          <th className="py-3 px-4">Size</th>
                          <th className="py-3 px-4">Bust (cm)</th>
                          <th className="py-3 px-4">Waist (cm)</th>
                          <th className="py-3 px-4">Hip (cm)</th>
                          <th className="py-3 px-4">UK / US Approx</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-blush/30 text-dark/80">
                        <tr className="hover:bg-cream/30">
                          <td className="py-3 px-4 font-bold text-dark">XS</td>
                          <td className="py-3 px-4">80 – 84</td>
                          <td className="py-3 px-4">62 – 66</td>
                          <td className="py-3 px-4">88 – 92</td>
                          <td className="py-3 px-4">UK 6 / US 2</td>
                        </tr>
                        <tr className="hover:bg-cream/30">
                          <td className="py-3 px-4 font-bold text-dark">S</td>
                          <td className="py-3 px-4">84 – 88</td>
                          <td className="py-3 px-4">66 – 70</td>
                          <td className="py-3 px-4">92 – 96</td>
                          <td className="py-3 px-4">UK 8 / US 4</td>
                        </tr>
                        <tr className="hover:bg-cream/30">
                          <td className="py-3 px-4 font-bold text-dark">M</td>
                          <td className="py-3 px-4">88 – 92</td>
                          <td className="py-3 px-4">70 – 74</td>
                          <td className="py-3 px-4">96 – 100</td>
                          <td className="py-3 px-4">UK 10 / US 6</td>
                        </tr>
                        <tr className="hover:bg-cream/30">
                          <td className="py-3 px-4 font-bold text-dark">L</td>
                          <td className="py-3 px-4">92 – 96</td>
                          <td className="py-3 px-4">74 – 78</td>
                          <td className="py-3 px-4">100 – 104</td>
                          <td className="py-3 px-4">UK 12 / US 8</td>
                        </tr>
                        <tr className="hover:bg-cream/30">
                          <td className="py-3 px-4 font-bold text-dark">XL</td>
                          <td className="py-3 px-4">96 – 102</td>
                          <td className="py-3 px-4">78 – 84</td>
                          <td className="py-3 px-4">104 – 110</td>
                          <td className="py-3 px-4">UK 14 / US 10</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="mt-3 text-[11px] text-dark/60 italic">
                    * Fits true to size. For a more relaxed silhouette or looser drape, consider sizing up one size.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="overflow-x-auto rounded-xl border border-blush/40 bg-white/70">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead>
                        <tr className="bg-cream/80 border-b border-blush/40 text-dark font-heading font-semibold">
                          <th className="py-3 px-4">EU Size</th>
                          <th className="py-3 px-4">UK Size</th>
                          <th className="py-3 px-4">US Size</th>
                          <th className="py-3 px-4">Foot Length (cm)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-blush/30 text-dark/80">
                        <tr className="hover:bg-cream/30">
                          <td className="py-3 px-4 font-bold text-dark">36</td>
                          <td className="py-3 px-4">3.5</td>
                          <td className="py-3 px-4">5.5</td>
                          <td className="py-3 px-4">22.5 cm</td>
                        </tr>
                        <tr className="hover:bg-cream/30">
                          <td className="py-3 px-4 font-bold text-dark">37</td>
                          <td className="py-3 px-4">4</td>
                          <td className="py-3 px-4">6.5</td>
                          <td className="py-3 px-4">23.0 cm</td>
                        </tr>
                        <tr className="hover:bg-cream/30">
                          <td className="py-3 px-4 font-bold text-dark">38</td>
                          <td className="py-3 px-4">5</td>
                          <td className="py-3 px-4">7.5</td>
                          <td className="py-3 px-4">24.0 cm</td>
                        </tr>
                        <tr className="hover:bg-cream/30">
                          <td className="py-3 px-4 font-bold text-dark">39</td>
                          <td className="py-3 px-4">6</td>
                          <td className="py-3 px-4">8.5</td>
                          <td className="py-3 px-4">24.5 cm</td>
                        </tr>
                        <tr className="hover:bg-cream/30">
                          <td className="py-3 px-4 font-bold text-dark">40</td>
                          <td className="py-3 px-4">6.5</td>
                          <td className="py-3 px-4">9.0</td>
                          <td className="py-3 px-4">25.5 cm</td>
                        </tr>
                        <tr className="hover:bg-cream/30">
                          <td className="py-3 px-4 font-bold text-dark">41</td>
                          <td className="py-3 px-4">7.5</td>
                          <td className="py-3 px-4">10.0</td>
                          <td className="py-3 px-4">26.0 cm</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="mt-3 text-[11px] text-dark/60 italic">
                    * For half sizes or wider feet in pointed-toe mules and heels, we advise choosing one EU size up.
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-dark text-cream text-xs font-semibold uppercase tracking-wider hover:bg-gold hover:text-dark transition-colors"
              >
                Close Guide
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
