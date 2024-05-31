import React from "react";
import Image from "next/image";
import Link from "next/link";

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
            <Link
              href={`/products-category/${category?.attributes?.name}`}
              key={index}
              className="flex flex-col items-center bg-green-50 gap-2 p-3 rounded-lg cursor-pointer group hover:bg-green-600"
            >
              {imageUrls?.map((imageUrl, index) => (
                <Image
                  key={index}
                  src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${imageUrl}`}
                  alt="icon"
                  width={50}
                  height={50}
                  className="group-hover:scale-125 transition-all ease-in-out"
                />
              ))}
              <h2 className="md:text-lg text-green-800 group-hover:text-white text-base">
                {category?.attributes?.name}
              </h2>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryList;
