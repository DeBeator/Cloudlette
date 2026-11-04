import { ShieldCheck, Truck, Sparkles, Heart } from "lucide-react";

export function BenefitsStrip() {
  const benefits = [
    {
      title: "Carefully selected",
      description: "Boutique pieces chosen with love & attention to detail",
      icon: Heart,
    },
    {
      title: "Quality finds",
      description: "Fine leathers, supple knits & durable silhouettes",
      icon: Sparkles,
    },
    {
      title: "Secure payments",
      description: "Protected checkouts via trusted encrypted channels",
      icon: ShieldCheck,
    },
    {
      title: "Fast & reliable delivery",
      description: "Same-day Lagos delivery & swift nationwide dispatch",
      icon: Truck,
    },
  ];

  return (
    <section className="w-full bg-brand-butter/30 border-b border-brand-beige/60 py-10 sm:py-12">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex items-start space-x-4 p-4 rounded-2xl bg-brand-ivory/60 border border-brand-beige/40 shadow-2xs hover:bg-brand-ivory transition-colors"
              >
                <div className="w-11 h-11 rounded-2xl bg-brand-butter border border-brand-beige flex items-center justify-center flex-shrink-0 text-brand-black shadow-xs">
                  <Icon className="w-5 h-5 stroke-[1.8]" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-brand-black tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-brand-taupe-dark leading-relaxed font-light">
                    {item.description}
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

