import { formatPrice } from "./format";
import type { Product, ProductVariant } from "@/types";

export { formatPrice };
export type { Product, ProductVariant };

export const COLOR_HEX_MAP: Record<string, string> = {
  "Tan Brown": "#8B5A2B",
  "Midnight Black": "#1C1C1C",
  "Ivory Cream": "#F9F6EE",
  "Blush Pink": "#E8C5C8",
  "Champagne Gold": "#D4AF37",
  "Emerald Green": "#046307",
  "Rich Nude": "#D2B48C",
  "Honey Beige": "#E3C9A6",
  "Olive Green": "#556B2F",
  "Royal Burgundy": "#6B1D2F",
  "Cognac Leather": "#9E471D",
  "Silver Metallic": "#C0C0C0",
  "Rose Gold": "#B76E79",
  "Oatmeal Natural": "#E3DAC9",
  "Gold Metallic": "#D8A63E",
  "Black Patent": "#0D0D0D",
  Terracotta: "#C86446",
  "Deep Forest": "#1C3B2B",
  "Cream White": "#FFFDD0",
  "Natural Straw": "#E8D8B0",
};

export function getColorHex(colorName: string): string {
  return COLOR_HEX_MAP[colorName] || "#D8A63E";
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    slug: "aurelia-structured-leather-tote",
    name: "Aurelia Structured Leather Tote",
    category: "bag",
    description:
      "Sturdy leather tote with room for your laptop, makeup bag, and daily essentials. Built to hold up.",
    shortDescription: "Structured full-grain calfskin leather tote for daily essentials and tech.",
    price: 68000,
    compareAtPrice: 85000,
    material: "100% Genuine Full-Grain Calfskin Leather",
    careInstructions: "Wipe clean with a soft, dry cloth. Store in the provided dust bag away from direct sunlight.",
    isFeatured: true,
    isBestSeller: true,
    isNew: true,
    sku: "CLD-AUR-001",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80",
    ],
    tags: ["fast-selling", "new-arrival"],
    variants: [
      { id: "var-1-1", productId: "prod-1", size: null, color: "Tan Brown", colorHex: "#8B5A2B", price: 68000, stockQty: 12, sku: "CLD-AUR-TAN", isActive: true },
      { id: "var-1-2", productId: "prod-1", size: null, color: "Midnight Black", colorHex: "#1C1C1C", price: 68000, stockQty: 8, sku: "CLD-AUR-BLK", isActive: true },
      { id: "var-1-3", productId: "prod-1", size: null, color: "Ivory Cream", colorHex: "#F9F6EE", price: 68000, stockQty: 0, sku: "CLD-AUR-CRM", isActive: true },
    ],
  },
  {
    id: "prod-2",
    slug: "sienna-silk-draped-blouse",
    name: "Sienna Silk Draped Blouse",
    category: "top",
    description:
      "Soft silk blouse with a cowl neck. Wear it to work or out for dinner — looks good either way.",
    shortDescription: "Draped mulberry silk cowl blouse with flattering feminine cut.",
    price: 32000,
    material: "100% Pure Mulberry Silk",
    fit: "Regular fit, draped cowl neck. True to size.",
    careInstructions: "Dry clean only or gentle hand wash in cold water with silk detergent. Do not wring.",
    isFeatured: true,
    isBestSeller: false,
    isNew: true,
    sku: "CLD-SIE-002",
    images: [
      "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=800&q=80",
    ],
    tags: ["new-arrival"],
    variants: [
      { id: "var-2-1", productId: "prod-2", size: "S", color: "Blush Pink", colorHex: "#E8C5C8", price: 32000, stockQty: 14, sku: "CLD-SIE-PNK-S", isActive: true },
      { id: "var-2-2", productId: "prod-2", size: "M", color: "Blush Pink", colorHex: "#E8C5C8", price: 32000, stockQty: 10, sku: "CLD-SIE-PNK-M", isActive: true },
      { id: "var-2-3", productId: "prod-2", size: "L", color: "Blush Pink", colorHex: "#E8C5C8", price: 32000, stockQty: 6, sku: "CLD-SIE-PNK-L", isActive: true },
      { id: "var-2-4", productId: "prod-2", size: "M", color: "Champagne Gold", colorHex: "#D4AF37", price: 32000, stockQty: 2, sku: "CLD-SIE-GLD-M", isActive: true },
    ],
  },
  {
    id: "prod-3",
    slug: "lagos-statement-block-heels",
    name: "Lagos Statement Block Heels",
    category: "shoe",
    description:
      "Suede heels with a comfy 3-inch block. Easy to walk in all day without hurting your feet.",
    shortDescription: "Hand-finished Italian suede block heels engineered for all-day comfort.",
    price: 45000,
    compareAtPrice: 55000,
    material: "Hand-treated Italian Suede Upper, Cushioned Leather Insole",
    careInstructions: "Use a suede brush to gently remove surface dirt. Avoid contact with water and liquids.",
    isFeatured: true,
    isBestSeller: true,
    isNew: false,
    sku: "CLD-LGS-003",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560343776-97e7d202ff0e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=800&q=80",
    ],
    tags: ["fast-selling"],
    variants: [
      { id: "var-3-1", productId: "prod-3", size: "38", color: "Emerald Green", colorHex: "#046307", price: 45000, stockQty: 13, sku: "CLD-LGS-EMR-38", isActive: true },
      { id: "var-3-2", productId: "prod-3", size: "39", color: "Emerald Green", colorHex: "#046307", price: 45000, stockQty: 14, sku: "CLD-LGS-EMR-39", isActive: true },
      { id: "var-3-3", productId: "prod-3", size: "40", color: "Emerald Green", colorHex: "#046307", price: 45000, stockQty: 9, sku: "CLD-LGS-EMR-40", isActive: true },
      { id: "var-3-4", productId: "prod-3", size: "39", color: "Rich Nude", colorHex: "#D2B48C", price: 45000, stockQty: 3, sku: "CLD-LGS-NUD-39", isActive: true },
    ],
  },
  {
    id: "prod-4",
    slug: "celeste-woven-shoulder-bag",
    name: "Celeste Woven Shoulder Bag",
    category: "bag",
    description:
      "Woven shoulder bag with a secure magnet flap. Fits your phone, lip gloss, and power bank easily.",
    shortDescription: "Artisanal handwoven shoulder bag with magnetic flap closure.",
    price: 52000,
    material: "Handwoven Vegan Leather with Gold-Tone Hardware",
    careInstructions: "Spot clean with a damp microfiber cloth. Allow to air dry.",
    isFeatured: false,
    isBestSeller: false,
    isNew: true,
    sku: "CLD-CEL-004",
    images: [
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
    ],
    tags: ["new-arrival"],
    variants: [
      { id: "var-4-1", productId: "prod-4", size: null, color: "Honey Beige", colorHex: "#E3C9A6", price: 52000, stockQty: 16, sku: "CLD-CEL-BEI", isActive: true },
      { id: "var-4-2", productId: "prod-4", size: null, color: "Olive Green", colorHex: "#556B2F", price: 52000, stockQty: 1, sku: "CLD-CEL-OLV", isActive: true },
    ],
  },
  {
    id: "prod-5",
    slug: "zaria-satin-wrap-top",
    name: "Zaria Satin Wrap Top",
    category: "top",
    description:
      "Smooth satin wrap top with puffy sleeves. Tie it how you like for a fit that works for you.",
    shortDescription: "Lustrous satin wrap blouse with billowing sleeve accents.",
    price: 28500,
    compareAtPrice: 35000,
    material: "95% Poly-Satin, 5% Elastane for subtle stretch",
    fit: "Adjustable wrap fit with self-tie sash. True to size.",
    careInstructions: "Machine wash delicate cycle cold inside out or hand wash. Cool iron on reverse.",
    isFeatured: false,
    isBestSeller: true,
    isNew: false,
    sku: "CLD-ZAR-005",
    images: [
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
    ],
    tags: ["fast-selling"],
    variants: [
      { id: "var-5-1", productId: "prod-5", size: "S", color: "Royal Burgundy", colorHex: "#6B1D2F", price: 28500, stockQty: 12, sku: "CLD-ZAR-BUR-S", isActive: true },
      { id: "var-5-2", productId: "prod-5", size: "M", color: "Royal Burgundy", colorHex: "#6B1D2F", price: 28500, stockQty: 15, sku: "CLD-ZAR-BUR-M", isActive: true },
      { id: "var-5-3", productId: "prod-5", size: "L", color: "Royal Burgundy", colorHex: "#6B1D2F", price: 28500, stockQty: 11, sku: "CLD-ZAR-BUR-L", isActive: true },
    ],
  },
  {
    id: "prod-6",
    slug: "valentina-pointed-leather-mules",
    name: "Valentina Pointed Leather Mules",
    category: "shoe",
    description:
      "Clean leather mules with a small gold buckle. Soft footbed so you can slip them on and go.",
    shortDescription: "Pointed leather slide-on mules with brushed gold buckle detailing.",
    price: 39000,
    material: "100% Top-Grain Leather, Padded Leather Insole, Wood Stack Heel",
    careInstructions: "Condition with neutral leather balm periodically. Wipe clean with soft cloth.",
    isFeatured: true,
    isBestSeller: false,
    isNew: true,
    sku: "CLD-VAL-006",
    images: [
      "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?auto=format&fit=crop&w=800&q=80",
    ],
    tags: ["fast-selling", "new-arrival"],
    variants: [
      { id: "var-6-1", productId: "prod-6", size: "37", color: "Cognac Leather", colorHex: "#9E471D", price: 39000, stockQty: 13, sku: "CLD-VAL-COG-37", isActive: true },
      { id: "var-6-2", productId: "prod-6", size: "38", color: "Cognac Leather", colorHex: "#9E471D", price: 39000, stockQty: 8, sku: "CLD-VAL-COG-38", isActive: true },
      { id: "var-6-3", productId: "prod-6", size: "39", color: "Cognac Leather", colorHex: "#9E471D", price: 39000, stockQty: 14, sku: "CLD-VAL-COG-39", isActive: true },
    ],
  },
  {
    id: "prod-7",
    slug: "noor-mini-crystal-clutch",
    name: "Noor Mini Crystal Clutch",
    category: "bag",
    description:
      "Sparkly mini clutch for weddings and events. Comes with a gold chain strap when you want to go hands-free.",
    shortDescription: "Gleaming crystal evening clutch with detachable brass curb chain.",
    price: 42000,
    material: "Faceted Crystal Mesh, Satin Interior Lining, Detachable Brass Chain",
    careInstructions: "Handle with care to protect crystal setting. Store in velvet dust pouch.",
    isFeatured: false,
    isBestSeller: false,
    isNew: true,
    sku: "CLD-NOR-007",
    images: [
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    ],
    tags: ["new-arrival"],
    variants: [
      { id: "var-7-1", productId: "prod-7", size: null, color: "Silver Metallic", colorHex: "#C0C0C0", price: 42000, stockQty: 14, sku: "CLD-NOR-SLV", isActive: true },
      { id: "var-7-2", productId: "prod-7", size: null, color: "Rose Gold", colorHex: "#B76E79", price: 42000, stockQty: 13, sku: "CLD-NOR-RGLD", isActive: true },
    ],
  },
  {
    id: "prod-8",
    slug: "kano-linen-cut-out-top",
    name: "Kano Linen Cut-Out Top",
    category: "top",
    description:
      "Breezy linen top for hot days. Cool shoulder cut-outs and shell buttons.",
    shortDescription: "Airy pure linen sleeveless top with shoulder cutouts and shell buttons.",
    price: 24000,
    material: "100% Pure Organic Linen, Natural Mother-of-Pearl Shell Buttons",
    fit: "Relaxed, breezy silhouette. True to size.",
    careInstructions: "Machine wash cold on gentle. Warm steam iron while slightly damp for crisp finish.",
    isFeatured: false,
    isBestSeller: false,
    isNew: false,
    sku: "CLD-KAN-008",
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=800&q=80",
    ],
    tags: [],
    variants: [
      { id: "var-8-1", productId: "prod-8", size: "S", color: "Oatmeal Natural", colorHex: "#E3DAC9", price: 24000, stockQty: 13, sku: "CLD-KAN-OAT-S", isActive: true },
      { id: "var-8-2", productId: "prod-8", size: "M", color: "Oatmeal Natural", colorHex: "#E3DAC9", price: 24000, stockQty: 12, sku: "CLD-KAN-OAT-M", isActive: true },
      { id: "var-8-3", productId: "prod-8", size: "L", color: "Oatmeal Natural", colorHex: "#E3DAC9", price: 24000, stockQty: 7, sku: "CLD-KAN-OAT-L", isActive: true },
    ],
  },
  {
    id: "prod-9",
    slug: "amina-strappy-ankle-heels",
    name: "Amina Strappy Ankle Heels",
    category: "shoe",
    description:
      "Sleek 4-inch heels with thin ankle straps. Makes any dress pop for night outs.",
    shortDescription: "High-shine stiletto heels with delicate wrap-around ankle straps.",
    price: 48000,
    compareAtPrice: 60000,
    material: "Metallic Mirror Finish Faux Leather, Padded Latex Insole",
    careInstructions: "Wipe with a damp cloth and buff with a dry microfibre towel.",
    isFeatured: false,
    isBestSeller: true,
    isNew: false,
    sku: "CLD-AMN-009",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?auto=format&fit=crop&w=800&q=80",
    ],
    tags: ["fast-selling"],
    variants: [
      { id: "var-9-1", productId: "prod-9", size: "38", color: "Gold Metallic", colorHex: "#D8A63E", price: 48000, stockQty: 12, sku: "CLD-AMN-GLD-38", isActive: true },
      { id: "var-9-2", productId: "prod-9", size: "39", color: "Gold Metallic", colorHex: "#D8A63E", price: 48000, stockQty: 8, sku: "CLD-AMN-GLD-39", isActive: true },
      { id: "var-9-3", productId: "prod-9", size: "40", color: "Black Patent", colorHex: "#0D0D0D", price: 48000, stockQty: 15, sku: "CLD-AMN-BLK-40", isActive: true },
    ],
  },
  {
    id: "prod-10",
    slug: "tari-bucket-crossbody-bag",
    name: "Tari Bucket Crossbody Bag",
    category: "bag",
    description:
      "Compact bucket bag that holds shape. Drawstring top to keep your things safe.",
    shortDescription: "Structured cylindrical bucket bag with secure leather cinch cord.",
    price: 36000,
    material: "Textured Pebble Grain Leather, Durable Cotton Canvas Lining",
    careInstructions: "Protect from excessive moisture. Wipe clean with a soft dry cloth.",
    isFeatured: false,
    isBestSeller: false,
    isNew: true,
    sku: "CLD-TAR-010",
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    ],
    tags: ["new-arrival"],
    variants: [
      { id: "var-10-1", productId: "prod-10", size: null, color: "Terracotta", colorHex: "#C86446", price: 36000, stockQty: 15, sku: "CLD-TAR-TER", isActive: true },
      { id: "var-10-2", productId: "prod-10", size: null, color: "Deep Forest", colorHex: "#1C3B2B", price: 36000, stockQty: 9, sku: "CLD-TAR-FOR", isActive: true },
    ],
  },
  {
    id: "prod-11",
    slug: "enugu-ribbed-knit-crop-top",
    name: "Enugu Ribbed Knit Crop Top",
    category: "top",
    description:
      "Stretch cotton ribbed crop top. Hugs right, square neck, easy to layer.",
    shortDescription: "Contoured square-neck cropped knit crafted in stretch organic cotton rib.",
    price: 19500,
    material: "92% Combed Ribbed Cotton, 8% Spandex",
    fit: "Form-fitting contoured cut, square neckline. Stretches comfortably.",
    careInstructions: "Machine wash cold with like colors. Lay flat to dry to preserve rib elasticity.",
    isFeatured: false,
    isBestSeller: true,
    isNew: false,
    sku: "CLD-ENG-011",
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    ],
    tags: ["fast-selling"],
    variants: [
      { id: "var-11-1", productId: "prod-11", size: "XS", color: "Cream White", colorHex: "#FFFDD0", price: 19500, stockQty: 14, sku: "CLD-ENG-CRM-XS", isActive: true },
      { id: "var-11-2", productId: "prod-11", size: "S", color: "Cream White", colorHex: "#FFFDD0", price: 19500, stockQty: 17, sku: "CLD-ENG-CRM-S", isActive: true },
      { id: "var-11-3", productId: "prod-11", size: "M", color: "Cream White", colorHex: "#FFFDD0", price: 19500, stockQty: 8, sku: "CLD-ENG-CRM-M", isActive: true },
    ],
  },
  {
    id: "prod-12",
    slug: "ibadan-woven-platform-slides",
    name: "Ibadan Woven Platform Slides",
    category: "shoe",
    description:
      "Comfy platform slides with braided raffia. Great for casual weekend moves.",
    shortDescription: "Braided natural raffia platform slides with cushioned footbed.",
    price: 34000,
    material: "Natural Braided Raffia, Molded Ergonomic Footbed, Anti-Slip Rubber Outsole",
    careInstructions: "Brush off dust with a soft bristle brush. Keep away from prolonged water exposure.",
    isFeatured: false,
    isBestSeller: false,
    isNew: false,
    sku: "CLD-IBD-012",
    images: [
      "https://images.unsplash.com/photo-1560343776-97e7d202ff0e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
    ],
    tags: [],
    variants: [
      { id: "var-12-1", productId: "prod-12", size: "38", color: "Natural Straw", colorHex: "#E8D8B0", price: 34000, stockQty: 10, sku: "CLD-IBD-STR-38", isActive: true },
      { id: "var-12-2", productId: "prod-12", size: "39", color: "Natural Straw", colorHex: "#E8D8B0", price: 34000, stockQty: 16, sku: "CLD-IBD-STR-39", isActive: true },
    ],
  },
];

export function getProducts(): Product[] {
  return MOCK_PRODUCTS;
}

export function getProductById(idOrSlug: string): Product | undefined {
  return MOCK_PRODUCTS.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return MOCK_PRODUCTS.find((p) => p.slug === slug || p.id === slug);
}
