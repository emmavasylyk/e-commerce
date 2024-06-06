import Image from "next/image";
import Link from "next/link";
import React from "react";

function TopCategoryList({ categoryList, selectedCategory }) {
  return (
    <div className="flex gap-5 mt-2 overflow-auto mx-7 md:mx-20 justify-center">
      {categoryList.map((category, index) => {
        const imageUrls = category?.attributes?.icon?.data?.map(
          (image) => image?.attributes?.url
        );
        return (
          <Link
            href={`/products-category/${category?.attributes?.name}`}
            key={index}
            className={`flex flex-col items-center w-[150px] min-w-[100px] bg-green-50 gap-2 p-3 rounded-lg cursor-pointer group hover:bg-green-600 ${
              selectedCategory === category?.attributes?.name &&
              "bg-green-600 text-white"
            }`}
          >
            {imageUrls?.map((imageUrl, index) => (
              <Image
                key={index}
                src={imageUrl}
                alt="icon"
                width={50}
                height={50}
                className="group-hover:scale-125 transition-all ease-in-out"
              />
            ))}
            <h2
              className={`text-lg text-green-800 group-hover:text-white ${
                selectedCategory === category?.attributes?.name && "text-white"
              }`}
            >
              {category?.attributes?.name}
            </h2>
          </Link>
        );
      })}
    </div>
  );
}

export default TopCategoryList;
