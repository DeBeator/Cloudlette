export type ProductVariant = {
  id: string;
  size: string | null; // null for bags
  color: string;
  colorHex?: string;
  stockQty: number;
  stock_qty?: number;
  sku: string;
};

export type Product = {
  id: string;
  name: string;
  category: "bag" | "shoe" | "top";
  description: string;
  price: number;
  images: string[];
  tags: ("fast-selling" | "new-arrival")[];
  variants: ProductVariant[];
};

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
    name: "Aurelia Structured Leather Tote",
    category: "bag",
    description:
      "Sturdy leather tote with room for your laptop, makeup bag, and daily essentials. Built to hold up.",
    price: 68000,
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80",
    ],
    tags: ["fast-selling", "new-arrival"],
    variants: [
      { id: "var-1-1", size: null, color: "Tan Brown", colorHex: "#8B5A2B", stockQty: 5, sku: "CLD-AUR-TAN" },
      { id: "var-1-2", size: null, color: "Midnight Black", colorHex: "#1C1C1C", stockQty: 3, sku: "CLD-AUR-BLK" },
      { id: "var-1-3", size: null, color: "Ivory Cream", colorHex: "#F9F6EE", stockQty: 0, sku: "CLD-AUR-CRM" },
    ],
  },
  {
    id: "prod-2",
    name: "Sienna Silk Draped Blouse",
    category: "top",
    description:
      "Soft silk blouse with a cowl neck. Wear it to work or out for dinner — looks good either way.",
    price: 32000,
    images: [
      "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=800&q=80",
    ],
    tags: ["new-arrival"],
    variants: [
      { id: "var-2-1", size: "S", color: "Blush Pink", colorHex: "#E8C5C8", stockQty: 4, sku: "CLD-SIE-PNK-S" },
      { id: "var-2-2", size: "M", color: "Blush Pink", colorHex: "#E8C5C8", stockQty: 6, sku: "CLD-SIE-PNK-M" },
      { id: "var-2-3", size: "L", color: "Blush Pink", colorHex: "#E8C5C8", stockQty: 0, sku: "CLD-SIE-PNK-L" },
      { id: "var-2-4", size: "M", color: "Champagne Gold", colorHex: "#D4AF37", stockQty: 2, sku: "CLD-SIE-GLD-M" },
    ],
  },
  {
    id: "prod-3",
    name: "Lagos Statement Block Heels",
    category: "shoe",
    description:
      "Suede heels with a comfy 3-inch block. Easy to walk in all day without hurting your feet.",
    price: 45000,
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560343776-97e7d202ff0e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=800&q=80",
    ],
    tags: ["fast-selling"],
    variants: [
      { id: "var-3-1", size: "38", color: "Emerald Green", colorHex: "#046307", stockQty: 3, sku: "CLD-LGS-EMR-38" },
      { id: "var-3-2", size: "39", color: "Emerald Green", colorHex: "#046307", stockQty: 4, sku: "CLD-LGS-EMR-39" },
      { id: "var-3-3", size: "40", color: "Emerald Green", colorHex: "#046307", stockQty: 0, sku: "CLD-LGS-EMR-40" },
      { id: "var-3-4", size: "39", color: "Rich Nude", colorHex: "#D2B48C", stockQty: 2, sku: "CLD-LGS-NUD-39" },
    ],
  },
  {
    id: "prod-4",
    name: "Celeste Woven Shoulder Bag",
    category: "bag",
    description:
      "Woven shoulder bag with a secure magnet flap. Fits your phone, lip gloss, and power bank easily.",
    price: 52000,
    images: [
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
    ],
    tags: ["new-arrival"],
    variants: [
      { id: "var-4-1", size: null, color: "Honey Beige", colorHex: "#E3C9A6", stockQty: 6, sku: "CLD-CEL-BEI" },
      { id: "var-4-2", size: null, color: "Olive Green", colorHex: "#556B2F", stockQty: 2, sku: "CLD-CEL-OLV" },
    ],
  },
  {
    id: "prod-5",
    name: "Zaria Satin Wrap Top",
    category: "top",
    description:
      "Smooth satin wrap top with puffy sleeves. Tie it how you like for a fit that works for you.",
    price: 28500,
    images: [
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
    ],
    tags: ["fast-selling"],
    variants: [
      { id: "var-5-1", size: "S", color: "Royal Burgundy", colorHex: "#6B1D2F", stockQty: 2, sku: "CLD-ZAR-BUR-S" },
      { id: "var-5-2", size: "M", color: "Royal Burgundy", colorHex: "#6B1D2F", stockQty: 5, sku: "CLD-ZAR-BUR-M" },
      { id: "var-5-3", size: "L", color: "Royal Burgundy", colorHex: "#6B1D2F", stockQty: 1, sku: "CLD-ZAR-BUR-L" },
    ],
  },
  {
    id: "prod-6",
    name: "Valentina Pointed Leather Mules",
    category: "shoe",
    description:
      "Clean leather mules with a small gold buckle. Soft footbed so you can slip them on and go.",
    price: 39000,
    images: [
      "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?auto=format&fit=crop&w=800&q=80",
    ],
    tags: ["fast-selling", "new-arrival"],
    variants: [
      { id: "var-6-1", size: "37", color: "Cognac Leather", colorHex: "#9E471D", stockQty: 3, sku: "CLD-VAL-COG-37" },
      { id: "var-6-2", size: "38", color: "Cognac Leather", colorHex: "#9E471D", stockQty: 0, sku: "CLD-VAL-COG-38" },
      { id: "var-6-3", size: "39", color: "Cognac Leather", colorHex: "#9E471D", stockQty: 4, sku: "CLD-VAL-COG-39" },
    ],
  },
  {
    id: "prod-7",
    name: "Noor Mini Crystal Clutch",
    category: "bag",
    description:
      "Sparkly mini clutch for weddings and events. Comes with a gold chain strap when you want to go hands-free.",
    price: 42000,
    images: [
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    ],
    tags: ["new-arrival"],
    variants: [
      { id: "var-7-1", size: null, color: "Silver Metallic", colorHex: "#C0C0C0", stockQty: 4, sku: "CLD-NOR-SLV" },
      { id: "var-7-2", size: null, color: "Rose Gold", colorHex: "#B76E79", stockQty: 3, sku: "CLD-NOR-RGLD" },
    ],
  },
  {
    id: "prod-8",
    name: "Kano Linen Cut-Out Top",
    category: "top",
    description:
      "Breezy linen top for hot days. Cool shoulder cut-outs and shell buttons.",
    price: 24000,
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=800&q=80",
    ],
    tags: [],
    variants: [
      { id: "var-8-1", size: "S", color: "Oatmeal Natural", colorHex: "#E3DAC9", stockQty: 3, sku: "CLD-KAN-OAT-S" },
      { id: "var-8-2", size: "M", color: "Oatmeal Natural", colorHex: "#E3DAC9", stockQty: 2, sku: "CLD-KAN-OAT-M" },
      { id: "var-8-3", size: "L", color: "Oatmeal Natural", colorHex: "#E3DAC9", stockQty: 0, sku: "CLD-KAN-OAT-L" },
    ],
  },
  {
    id: "prod-9",
    name: "Amina Strappy Ankle Heels",
    category: "shoe",
    description:
      "Sleek 4-inch heels with thin ankle straps. Makes any dress pop for night outs.",
    price: 48000,
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?auto=format&fit=crop&w=800&q=80",
    ],
    tags: ["fast-selling"],
    variants: [
      { id: "var-9-1", size: "38", color: "Gold Metallic", colorHex: "#D8A63E", stockQty: 2, sku: "CLD-AMN-GLD-38" },
      { id: "var-9-2", size: "39", color: "Gold Metallic", colorHex: "#D8A63E", stockQty: 0, sku: "CLD-AMN-GLD-39" },
      { id: "var-9-3", size: "40", color: "Black Patent", colorHex: "#0D0D0D", stockQty: 5, sku: "CLD-AMN-BLK-40" },
    ],
  },
  {
    id: "prod-10",
    name: "Tari Bucket Crossbody Bag",
    category: "bag",
    description:
      "Compact bucket bag that holds shape. Drawstring top to keep your things safe.",
    price: 36000,
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    ],
    tags: ["new-arrival"],
    variants: [
      { id: "var-10-1", size: null, color: "Terracotta", colorHex: "#C86446", stockQty: 5, sku: "CLD-TAR-TER" },
      { id: "var-10-2", size: null, color: "Deep Forest", colorHex: "#1C3B2B", stockQty: 1, sku: "CLD-TAR-FOR" },
    ],
  },
  {
    id: "prod-11",
    name: "Enugu Ribbed Knit Crop Top",
    category: "top",
    description:
      "Stretch cotton ribbed crop top. Hugs right, square neck, easy to layer.",
    price: 19500,
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    ],
    tags: ["fast-selling"],
    variants: [
      { id: "var-11-1", size: "XS", color: "Cream White", colorHex: "#FFFDD0", stockQty: 4, sku: "CLD-ENG-CRM-XS" },
      { id: "var-11-2", size: "S", color: "Cream White", colorHex: "#FFFDD0", stockQty: 7, sku: "CLD-ENG-CRM-S" },
      { id: "var-11-3", size: "M", color: "Cream White", colorHex: "#FFFDD0", stockQty: 0, sku: "CLD-ENG-CRM-M" },
    ],
  },
  {
    id: "prod-12",
    name: "Ibadan Woven Platform Slides",
    category: "shoe",
    description:
      "Comfy platform slides with braided raffia. Great for casual weekend moves.",
    price: 34000,
    images: [
      "https://images.unsplash.com/photo-1560343776-97e7d202ff0e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
    ],
    tags: [],
    variants: [
      { id: "var-12-1", size: "38", color: "Natural Straw", colorHex: "#E8D8B0", stockQty: 0, sku: "CLD-IBD-STR-38" },
      { id: "var-12-2", size: "39", color: "Natural Straw", colorHex: "#E8D8B0", stockQty: 0, sku: "CLD-IBD-STR-39" },
    ],
  },
];

export function getProducts(): Product[] {
  return MOCK_PRODUCTS;
}

export function getProductById(id: string): Product | undefined {
  return MOCK_PRODUCTS.find((p) => p.id === id);
}

export function formatPrice(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}
