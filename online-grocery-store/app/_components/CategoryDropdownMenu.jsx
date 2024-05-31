import React from "react";
import Link from "next/link";
import Image from "next/image";
import { LayoutGrid } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function CategoryDropdownMenu({ categoryList }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <h2 className="hidden md:flex gap-2 items-center border rounded-full p-2 px-10 bg-slate-200 cursor-pointer">
          <LayoutGrid className="w-5 h-5" /> Category
        </h2>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-base">
          Browse Category
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {categoryList.map((category, index) => {
          const imageUrls = category?.attributes?.icon?.data?.map(
            (image) => image?.attributes?.url
          );
          return (
            <Link
              href={`/products-category/${category?.attributes?.name}`}
              key={index}
            >
              <DropdownMenuItem
                key={category.id}
                className="flex gap-4 items-center cursor-pointer"
              >
                {imageUrls?.map((imageUrl, index) => (
                  <Image
                    key={index}
                    src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${imageUrl}`}
                    unoptimized={true}
                    alt="icon"
                    width={30}
                    height={30}
                  />
                ))}
                <h2 className="md:text-sm xl:text-base">
                  {category?.attributes?.name}
                </h2>
              </DropdownMenuItem>
            </Link>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default CategoryDropdownMenu;
