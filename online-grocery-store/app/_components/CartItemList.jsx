import { TrashIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

function CartItemList({ cartItemList, onDeleteItem }) {
  return (
    <div>
      <div className="h-[500px] overflow-auto">
        {cartItemList.map((cart, index) => {
          const totalPrice = Number(cart.quantity) * Number(cart.actualPrice);
          return (
            <div
              key={index}
              className="flex justify-between items-center gap-5 p-2"
            >
              <div className="flex gap-6 items-center">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${cart?.image}`}
                  alt={cart?.name}
                  width={70}
                  height={70}
                  className="border p-2"
                />
                <div className="">
                  <h2 className="font-bold">{cart?.name}</h2>
                  <p className="">Quantity {cart?.quantity}</p>
                  <p className="text-lg font-bold">$ {totalPrice}</p>
                </div>
              </div>
              <TrashIcon
                className="cursor-pointer"
                onClick={() => onDeleteItem(cart?.id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CartItemList;
