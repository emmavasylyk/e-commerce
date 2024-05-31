import React from "react";
import { useRouter } from "next/navigation";
import { ShoppingBasket } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import CartItemList from "./CartItemList";

function Basket({ cardItemList, onDeleteItem, subTotal, totalCartItem, jwt }) {
  const router = useRouter();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <h2 className="flex gap-2 items-center text-lg">
          <ShoppingBasket className="w-7 h-7" />{" "}
          <span className="bg-primary text-white px-2 rounded-full">
            {totalCartItem}
          </span>
        </h2>
      </SheetTrigger>
      <SheetContent className="pt-10 px-1">
        <SheetHeader>
          <SheetTitle className="bg-primary text-white text-center font-bold text-lg p-2">
            My Cart
          </SheetTitle>
          <SheetDescription asChild>
            <CartItemList
              cartItemList={cardItemList}
              onDeleteItem={onDeleteItem}
            />
          </SheetDescription>
        </SheetHeader>
        <SheetClose asChild>
          <div className="absolute bottom-6 w-[90%] flex flex-col gap-4">
            <h2 className="text-lg font-bold flex justify-between items-center">
              Subtotal <span className="">${subTotal}</span>
            </h2>
            <Button
              className="outline-primary"
              onClick={() => router.push(jwt ? "/checkout" : "/sign-in")}
            >
              Checkout
            </Button>
          </div>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}

export default Basket;
