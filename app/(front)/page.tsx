import Brands from "@/app/(front)/_components/brands/Brands";
import Carousels from "@/app/(front)/_components/carousel/Carousels";
import Categories from "@/app/(front)/_components/categories/Categories";
import Product from "./_components/productCard/Product";
import Events from "./_components/Events/Events";

export default function Home() {
  return (
    <div className="">
      <Carousels />
      <Categories />
      <Events />
      <Brands />
      <Product />
    </div>
  );
}
