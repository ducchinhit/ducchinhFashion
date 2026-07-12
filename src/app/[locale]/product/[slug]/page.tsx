import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ProductDetail } from "@/components/product-detail";
import { getCategory } from "@/data/categories";
import { getProduct, getRelatedProducts, products } from "@/data/products";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    products.map((p) => ({ locale, slug: p.slug }))
  );
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  if (!category) notFound();

  const related = getRelatedProducts(product);

  return <ProductDetail product={product} category={category} related={related} />;
}
