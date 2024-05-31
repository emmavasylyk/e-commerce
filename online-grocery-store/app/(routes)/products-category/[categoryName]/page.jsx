import React from "react";
import GlobalApi from "@/app/_utils/GlobalApi";
import ProductList from "@/app/_components/ProductList";
import TopCategoryList from "../_components/TopCategoryList";

async function ProductCategory({ params }) {
  const productList = await GlobalApi.getProductsByCategory(
    params.categoryName
  );
  const categoryList = await GlobalApi.getCategoryList();

  return (
    <div>
      <h2 className="p-4 bg-primary text-white font-bold text-3xl text-center">
        {params.categoryName}
      </h2>
      <TopCategoryList
        categoryList={categoryList}
        selectedCategory={params.categoryName}
      />
      <div className="p-5 md:p-10">
        <ProductList productList={productList} />
      </div>
    </div>
  );
}

export default ProductCategory;
