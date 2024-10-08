import Image from "next/image";

import CategoryList from "./_components/CategoryList";
import ProductList from "./_components/ProductList";
import Slider from "./_components/Slider";
import Footer from "./_components/Footer";
import GlobalApi from "./_utils/GlobalApi";

export default async function Home() {
  const sliderList = await GlobalApi.getSliders();

  const categoryList = await GlobalApi.getCategoryList();

  const productList = await GlobalApi.getAllProducts();

  return (
    <div className="p-5 px-5 md:p-10 xl:px-16">
      {/* Slider */}
      <Slider sliderList={sliderList} />
      {/* Category list */}
      <CategoryList categoryList={categoryList} />
      {/* Product List */}
      <ProductList productList={productList} />
      {/* Banner */}
      <Image
        src="/banner.png"
        width={1320}
        height={300}
        alt="banner"
        className="w-full xl:h-[400px] xl:object-contain"
      />
      {/* Footer */}
      <Footer />
    </div>
  );
}
