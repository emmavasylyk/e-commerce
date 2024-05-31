import React from "react";
import Image from "next/image";
import Link from "next/link";

function CategoryListItem({ category, images, index }) {
  return (
    <Link
      href={`/products-category/${category?.attributes?.name}`}
      key={index}
      className="flex flex-col items-center bg-green-50 gap-2 p-3 rounded-lg cursor-pointer group hover:bg-green-600"
    >
      {images?.map((image, index) => (
        <Image
          key={index}
          src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${image}`}
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
}

export default CategoryListItem;
