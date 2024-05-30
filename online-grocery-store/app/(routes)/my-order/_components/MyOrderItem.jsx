import Image from "next/image";
import React from "react";

function MyOrderItem({ orderItem }) {
  return (
    <div className="">
      <div className="flex md:grid gap-4 items-center py-2 xl:py-4">
        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${orderItem?.product?.data?.attributes?.images.data[0]?.attributes?.url}`}
          width={100}
          height={100}
          alt={orderItem?.product?.data?.attributes?.name}
          className="bg-gray-100 p-5 border rounded-md h-[100px]"
        />
        <div className="text-sm grid gap-1 xl:text-base">
          <p className="font-medium">
            {orderItem?.product?.data?.attributes?.name}
          </p>
          <p className="">
            Product Price: ${orderItem?.product?.data?.attributes?.price}
          </p>
          <p className="">Quantity: {orderItem?.quantity}</p>
          <p className="">Price: ${orderItem?.amount}</p>
        </div>
      </div>
    </div>
  );
}

export default MyOrderItem;
