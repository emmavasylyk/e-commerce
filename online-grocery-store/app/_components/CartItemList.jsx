import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function CartItemList({ cartItemList, onDeleteItem }) {
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    let total = 0;

    cartItemList.forEach((element) => {
      total = total + element.amount;
    });
    setSubTotal(total.toFixed(2));
  }, [cartItemList]);

  return (
    <div>
      <div className="h-[500px] overflow-auto">
        {cartItemList.map((cart, index) => (
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
                <p className="text-lg font-bold">$ {cart?.amount}</p>
              </div>
            </div>
            <TrashIcon
              className="cursor-pointer"
              onClick={() => onDeleteItem(cart?.id)}
            />
          </div>
        ))}
      </div>
      <div className="absolute bottom-6 w-[90%] flex flex-col">
        <h2 className="text-lg font-bold flex justify-between items-center">
          Subtotal <span className="">${subTotal}</span>
        </h2>
        <Button>View Cart</Button>
      </div>
    </div>
  );
}

export default CartItemList;
