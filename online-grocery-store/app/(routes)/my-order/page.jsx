"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import GlobalApi from "@/app/_utils/GlobalApi";
import MyOrderList from "./_components/MyOrderList";

function MyOrder() {
  const [jwt, setJwt] = useState(null);
  const [user, setUser] = useState(null);
  const [orderList, setOrderList] = useState([]);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const jwt = sessionStorage.getItem("jwt");
      const user = JSON.parse(sessionStorage.getItem("user"));

      if (!jwt) {
        router.replace("/");
      } else {
        setJwt(jwt);
        setUser(user);
        getMyOrder(user.id, jwt);
      }
    }
  }, []);

  const getMyOrder = async (userId, jwt) => {
    const orderList_ = await GlobalApi.getMyOrder(userId, jwt);
    setOrderList(orderList_);
  };

  if (!user || !jwt) {
    return null;
  }

  return (
    <div>
      <h2 className="p-3 bg-primary text-xl font-bold text-center text-white">
        My Order
      </h2>
      <div className="py-5 mx-7 md:mx-10 xl:mx-20">
        <h2 className="text-lg md:text-3xl font-bold text-primary mb-5 md:mb-6">
          Order History
        </h2>
        <MyOrderList orderList={orderList} />
      </div>
    </div>
  );
}

export default MyOrder;
