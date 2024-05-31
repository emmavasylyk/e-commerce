import React from "react";
import ProductItem from "./ProductItem";

function ProductList({ productList }) {
  return (
    <div className="mb-5 md:mb-8 xl:mb-10">
      <h2 className="text-green-600 font-bold text-xl md:text-2xl mb-5 xl:mb-9">
        Our Popular Products
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
        {productList.map(
          (product, index) =>
            index < 8 && <ProductItem product={product} key={index} />
        )}
      </div>
    </div>
  );
}

export default ProductList;
