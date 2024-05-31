import React from "react";
import CategoryListItem from "./CategoryListItem";

function CategoryList({ categoryList }) {
  return (
    <div className="mb-5 md:mb-8 xl:mb-10">
      <h2 className="text-green-600 font-bold text-xl md:text-2xl mb-5 xl:mb-9">
        Shop by Category
      </h2>
      <div className="grid grid-cols-3 gap-5 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7">
        {categoryList.map((category, index) => {
          const imageUrls = category?.attributes?.icon?.data?.map(
            (image) => image?.attributes?.url
          );
          return (
            <CategoryListItem
              category={category}
              key={index}
              images={imageUrls}
            />
          );
        })}
      </div>
    </div>
  );
}

export default CategoryList;
