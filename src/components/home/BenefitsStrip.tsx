import { ShieldCheck, Truck, Sparkles, Heart } from "lucide-react";

export function BenefitsStrip() {
  const benefits = [
    {
      title: "Carefully selected",
      subtitle: "Boutique curated pieces",
      icon: Heart,
    },
    {
      title: "Quality finds",
      subtitle: "Inspected fabrics & leather",
      icon: Sparkles,
    },
    {
      title: "Secure payments",
      subtitle: "Encrypted checkout",
      icon: ShieldCheck,
    },
    {
      title: "Fast & reliable delivery",
      subtitle: "Lagos & nationwide dispatch",
      icon: Truck,
    },
  ];

  return (
    <section className="w-full bg-brand-butter/30 border-b border-brand-beige/60 py-5 sm:py-6">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Mobile: Compact 2-column grid | Desktop: 4 horizontal columns with subtle dividers */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-0 lg:divide-x lg:divide-brand-beige/70">
          {benefits.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex items-center space-x-2.5 sm:space-x-3.5 p-2 sm:p-3 lg:px-6 lg:py-1 rounded-xl lg:rounded-none bg-brand-ivory/50 lg:bg-transparent border lg:border-none border-brand-beige/40 transition-colors"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-butter border border-brand-beige/80 flex items-center justify-center flex-shrink-0 text-brand-black shadow-xs">
                  <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2]" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-sm font-bold text-brand-black tracking-tight leading-tight truncate">
                    {item.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-brand-taupe-dark font-normal leading-tight truncate hidden sm:block">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
