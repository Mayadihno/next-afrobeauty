import Brands from "@/app/(front)/_components/brands/Brands";
import Carousels from "@/app/(front)/_components/carousel/Carousels";
import Categories from "@/app/(front)/_components/categories/Categories";
import Product from "./_components/productCard/Product";

export default function Home() {
  return (
    <div className="">
      <Carousels />
      <Categories />
      <Brands />
      <Product />
    </div>
  );
}
