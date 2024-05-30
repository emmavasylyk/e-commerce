"use client";

import GlobalApi from "@/app/_utils/GlobalApi";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import moment from "moment";
import MyOrderItem from "./_components/MyOrderItem";

function MyOrder() {
  const jwt = sessionStorage.getItem("jwt");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [orderList, setOrderList] = useState([]);

  const router = useRouter();

  useEffect(() => {
    if (!jwt) {
      router.replace("/");
    }

    getMyOrder();
  }, []);

  const getMyOrder = async () => {
    const orderList_ = await GlobalApi.getMyOrder(user.id, jwt);
    console.log("orderList", orderList_);
    setOrderList(orderList_);
  };

  return (
    <div>
      <h2 className="p-3 bg-primary text-xl font-bold text-center text-white">
        My Order
      </h2>
      <div className="py-8 mx-7 md:mx-20">
        <h2 className="text-3xl font-bold text-primary">Order History</h2>
        <div className="">
          {orderList.map((item, index) => (
            <Collapsible key={index}>
              <CollapsibleTrigger>
                <div className="border p-2 bg-slate-100 flex justify-evenly gap-24">
                  <h2 className="">
                    <span className="font-bold mr-2">Order Data:</span>
                    {moment(item?.createdAt).format("DD/MMM/YYYY")}
                  </h2>
                  <h2 className="">
                    <span className="font-bold mr-2">Total Amount:</span>$
                    {item?.totalOrderAmount}
                  </h2>
                  <h2 className="">
                    <span className="font-bold mr-2">Status:</span>{" "}
                    {item?.status}
                  </h2>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {item?.orderItemList?.map((order, idx) => (
                  <MyOrderItem orderItem={order} key={idx} />
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyOrder;
