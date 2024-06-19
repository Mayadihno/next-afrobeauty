import { product } from "@/utils/config/products";

import ProductById from "../../_components/productCard/ProductById";
import RelatedProduct from "../../_components/relatedProduct/RelatedProduct";

export async function generateMetadata({ params }: { params: { id: number } }) {
  const item = product.find((item) => item.id === Number(params.id));
  if (!item) {
    return { title: "Product not found" };
  }

  return {
    title: item.title,
  };
}

const ProductPage = ({ params }: { params: { id: number } }) => {
  return (
    <div className="">
      <ProductById params={params} />
      <RelatedProduct params={params} />
    </div>
  );
};

export default ProductPage;
