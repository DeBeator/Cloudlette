import { Metadata } from "next";
import { getProductBySlug } from "@/lib/mock-data";
import { ProductDetailClient } from "./ProductDetailClient";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(props: ProductPageProps): Promise<Metadata> {
  const params = await props.params;
  const product = getProductBySlug(params.slug);

  if (!product) {
    return {
      title: "Product Not Found | Cloudlette",
      description: "The requested luxury piece could not be located.",
    };
  }

  const title = `${product.name} | Cloudlette Luxury`;
  const description =
    product.shortDescription ||
    product.description ||
    `Shop ${product.name} crafted in luxury materials at Cloudlette.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://cloudlette.com/product/${product.slug}`,
      images: product.images.length > 0 ? [{ url: product.images[0], alt: product.name }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: product.images.length > 0 ? [product.images[0]] : [],
    },
  };
}

export default async function ProductDetailPage(props: ProductPageProps) {
  const params = await props.params;
  return <ProductDetailClient slug={params.slug} />;
}
