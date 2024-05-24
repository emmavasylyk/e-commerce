// import { Button } from "@/components/ui/button";
// import Image from "next/image";

import CategoryList from "./_components/CategoryList";
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";

export default async function Home() {
  const sliderList = await GlobalApi.getSliders();

  const categoryList = await GlobalApi.getCategoryList();

  return (
    <div className="p-5 md:p-10 px-16">
      {/* Slider */}
      <Slider sliderList={sliderList} />
      {/* Category list */}
      <CategoryList categoryList={categoryList} />
    </div>
  );
}
