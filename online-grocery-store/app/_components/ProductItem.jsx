import React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

import ProductItemDetail from "./ProductItemDetail";

function ProductItem({ product }) {
  const imageUrl = product?.attributes?.images?.data[0]?.attributes?.url;

  return (
    <div className="p-2 md:p-6 flex flex-col items-center justify-between gap-2 md:gap-3 border rounded-lg hover:scale-105 hover:shadow-lg transition-all ease-in-out cursor-pointer">
      <div className="">
        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${imageUrl}`}
          alt={product?.attributes?.name}
          width={500}
          height={200}
          className="w-[100px] h-[100px] mx-auto md:h-[166px] md:w-[166px] object-contain"
        />
        <h2 className="font-bold text-sm md:text-lg text-center mb-2 md:mb-3">
          {product?.attributes?.name}
        </h2>
        <div className="flex gap-3 justify-center">
          <span className="font-medium text-base md:text-lg">
            ${product?.attributes?.price}
          </span>
          {product?.attributes?.sellingPrice && (
            <s className="font-medium text-base md:text-lg text-gray-500">
              ${product?.attributes?.sellingPrice}
            </s>
          )}
        </div>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="text-primary hover:text-white hover:bg-primary"
          >
            Add to cart
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogDescription asChild>
              <ProductItemDetail product={product} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProductItem;
