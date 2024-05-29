"use client";
import Stripe from "stripe";
import { loadStripe } from "@stripe/stripe-js";

import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowBigRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY);
// console.log("Strapi key", stripePromise);

function Checkout() {
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [cardItemList, setCardItemList] = useState([]);
  const [subTotal, setSubTotal] = useState(0);

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [zip, setZip] = useState();
  const [address, setAddress] = useState();
  const isLogin = sessionStorage.getItem("jwt") ? true : false;
  const jwt = sessionStorage.getItem("jwt");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const router = useRouter();

  useEffect(() => {
    if (user && jwt) {
      getCartItems();
    }

    if (!jwt) {
      router.push("/sign-in");
    }
  }, [user, jwt]);

  const getCartItems = async () => {
    if (!user || !jwt) return;
    const cardItemList_ = await GlobalApi.getCardItems(user.id, jwt);
    setTotalCartItem(cardItemList_?.length);
    setCardItemList(cardItemList_);
  };

  useEffect(() => {
    let total = 0;

    cardItemList.forEach((element) => {
      total = total + element.amount;
    });
    setSubTotal(total.toFixed(2));
  }, [cardItemList]);

  const calculateTotalAmount = () => {
    const totalAmount = subTotal * 0.9 + 15;
    return totalAmount.toFixed(2);
  };

  const createCheckoutSession = async () => {
    const data = {
      //   cardItemList,
      //   username,
      email,
      //   phone,
      //   zip,
      //   address,
      //   subTotal,
      totalAmount: calculateTotalAmount(),
    };

    const stripeUrl = await axios.post(
      "http://localhost:3000/api/checkout",
      data
    );
    console.log("stripeUrl", stripeUrl);

    window.location.href = stripeUrl.data;
  };

  return (
    <div>
      <h2 className="p-3 bg-primary text-xl font-bold text-center text-white">
        Checkout
      </h2>
      <div className="p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 py-8">
        <div className="md:col-span-2 mx-20">
          <h2 className="font-bold text-3xl">Billing Details</h2>
          <div className="grid md:grid-cols-2 gap-10 mt-3">
            <Input
              placeholder="Name"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-10 mt-3">
            <Input
              placeholder="Phone"
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input placeholder="Zip" onChange={(e) => setZip(e.target.value)} />
          </div>
          <div className="mt-3">
            <Input
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="mx-10 border">
          <h2 className="p-3 bg-gray-200 font-bold text-center">
            Total Cart ({totalCartItem})
          </h2>
          <div className="p-4 flex flex-col gap-4">
            <h2 className="font-bold flex justify-between">
              Subtotal : <span className="">${subTotal}</span>
            </h2>
            <hr />
            <h2 className="flex justify-between">
              Delivery : <span className="">$15.00</span>
            </h2>
            <h2 className="flex justify-between">
              Tax (9%) :{" "}
              <span className="">${(totalCartItem * 0.9).toFixed(2)}</span>
            </h2>
            <hr />
            <h2 className="font-bold flex justify-between">
              Total : <span className="">${calculateTotalAmount()}</span>
            </h2>
            <Button onClick={createCheckoutSession}>
              Payment <ArrowBigRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
