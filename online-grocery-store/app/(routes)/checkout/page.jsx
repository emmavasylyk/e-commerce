"use client";

import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { ArrowBigRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import CartItemList from "@/app/_components/CartItemList";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Form from "./_components/Form";

const schema = yup
  .object({
    username: yup.string().required().min(1).max(10),
    email: yup.string().email().required(),
    phone: yup.number().positive().integer().required(),
    zip: yup.number().positive().integer().required(),
    address: yup.string().required(),
  })
  .required();

function Checkout() {
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [cardItemList, setCardItemList] = useState([]);
  const [subTotal, setSubTotal] = useState(0);

  // const [username, setUsername] = useState();
  // const [email, setEmail] = useState();
  // const [phone, setPhone] = useState();
  // const [zip, setZip] = useState();
  // const [address, setAddress] = useState();
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

  const createCheckoutSession = async (payload) => {
    const data = {
      email: payload.data.email,
      totalAmount: calculateTotalAmount(),
    };

    const stripeUrl = await axios.post(
      "http://localhost:3000/api/checkout",
      data
    );
    console.log("stripeUrl", stripeUrl);

    window.location.href = stripeUrl.data;
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  function onSubmit(data) {
    const payload = {
      data: {
        totalOrderAmount: calculateTotalAmount(),
        username: String(data.username),
        email: String(data.email),
        phone: String(data.phone),
        zip: String(data.zip),
        address: String(data.address),
        orderItemList: cardItemList,
        userId: user.id,
      },
    };
    console.log("payload", payload);

    GlobalApi.createOrder(payload, jwt)
      .then((resp) => {
        toast("Order places successfully", { type: "success" });

        cardItemList.forEach((item, index) => {
          GlobalApi.deleteCartItem(item.id, jwt).then((resp) => {});
        });
      })
      .finally(() => {
        createCheckoutSession(payload);
      });
  }

  return (
    <div>
      <h2 className="p-3 bg-primary text-xl font-bold text-center text-white">
        Checkout
      </h2>
      <div className="p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 py-8">
        <div className="md:col-span-2 mx-20">
          <h2 className="font-bold text-3xl">Billing Details</h2>
          <Form register={register} errors={errors} />
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
            <Button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={!isValid}
            >
              Payment <ArrowBigRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
