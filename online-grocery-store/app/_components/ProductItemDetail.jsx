"use client";

import { Button } from "@/components/ui/button";
import { LoaderCircle, ShoppingBasket } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";
import { toast } from "sonner";
import { UpdateCardContext } from "../_context/UpdateCardContext";

function ProductItemDetail({ product }) {
  const jwt = sessionStorage.getItem("jwt");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const { updateCard, setUpdateCard } = useContext(UpdateCardContext);

  const [productTotalPrice, setProductTotalPrice] = useState(
    product?.attributes?.sellingPrice
      ? product?.attributes?.sellingPrice
      : product?.attributes?.mrp
  );

  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const addToCart = () => {
    setLoading(true);

    if (!jwt) {
      router.push("/sign-in");
      setLoading(false);
      return;
    }
    const data = {
      data: {
        quantity: quantity,
        amount: (quantity * productTotalPrice).toFixed(2),
        products: product?.id,
        users_permissions_users: user?.id,
        userId: user?.id,
      },
    };
    console.log("data", data);

    GlobalApi.addToCard(data, jwt).then(
      (resp) => {
        toast("Product added to cart", { type: "success" });
        setUpdateCard(!updateCard);
        setLoading(false);
      },
      (e) => {
        toast("Error while adding into cart", { type: "error" });
        setLoading(false);
      }
    );
  };

  const imageUrl = product?.attributes?.images?.data[0]?.attributes?.url;

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
    setProductTotalPrice(
      product?.attributes?.sellingPrice
        ? product?.attributes?.sellingPrice * quantity
        : product?.attributes?.mrp * quantity
    );
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setProductTotalPrice(
        product?.attributes?.sellingPrice
          ? product?.attributes?.sellingPrice * quantity
          : product?.attributes?.mrp * quantity
      );
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black">
      <Image
        src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${imageUrl}`}
        alt={product?.attributes?.name}
        width={300}
        height={300}
        className="bg-slate-200 h-[320px] w-[300px] object-contain p-5 rounded-lg"
      />
      <div className="flex gap-3 flex-col">
        <h2 className="font-bold text-2xl">{product?.attributes?.name}</h2>
        <p className="text-sm text-gray-500">
          {product?.attributes?.description}
        </p>
        <div className="flex gap-3 ">
          {product?.attributes?.sellingPrice && (
            <h2 className="font-bold text-3xl">
              ${product?.attributes?.sellingPrice}
            </h2>
          )}
          <h2
            className={`font-bold text-3xl ${
              product?.attributes?.sellingPrice && "line-through text-gray-500"
            } `}
          >
            ${product?.attributes?.mrp}
          </h2>
        </div>
        <h2 className="font-medium text-lg">
          Quantity ({product?.attributes?.itemQuantityType})
        </h2>
        <div className="flex items-baseline flex-col gap-3">
          <div className="flex gap-3 items-center">
            <div className="p-2 border flex items-center gap-10 px-5">
              <button onClick={decrementQuantity}>-</button>
              <h2 className="">{quantity}</h2>
              <button onClick={incrementQuantity}>+</button>
            </div>
            <h2 className="text-2xl font-bold">
              = ${(quantity * productTotalPrice).toFixed(2)}
            </h2>
          </div>
          <Button
            className="flex gap-3"
            onClick={() => addToCart()}
            disabled={loading}
          >
            <ShoppingBasket />
            {loading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Add to card"
            )}
          </Button>
        </div>
        <h2 className="">
          <span className="font-bold">Category:</span>
          {product?.attributes?.categories?.data[0]?.attributes?.name}
        </h2>
      </div>
    </div>
  );
}

export default ProductItemDetail;
