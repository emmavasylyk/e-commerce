import React from "react";
import moment from "moment";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import MyOrderItem from "./MyOrderItem";

function MyOrderList({ orderList }) {
  return (
    <div className="">
      {orderList.map((item, index) => (
        <Collapsible key={index}>
          <CollapsibleTrigger className="min-w-full">
            <div className="border p-2 md:p-4 xl:p-5 w-full bg-slate-100 grid grid-cols-3 md:items-center justify-between gap-6 xl:gap-24 md:gap-6">
              <p className="text-xs md:text-base xl:text-xl flex flex-col gap-1 xl:flex-row">
                <span className="font-bold">Order Data:</span>
                {moment(item?.createdAt).format("l")}
              </p>
              <p className="text-xs md:text-base xl:text-xl flex flex-col gap-1 xl:flex-row">
                <span className="font-bold">Total Amount:</span>$
                {item?.totalOrderAmount}
              </p>
              <p className="text-xs md:text-base xl:text-xl flex flex-col gap-1 xl:flex-row">
                <span className="font-bold">Status:</span> {item?.status}
              </p>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="grid md:grid-cols-4 xl:grid-cols-6 md:gap-x-8 md:gap-y-6">
            {item?.orderItemList?.map((order, idx) => (
              <MyOrderItem orderItem={order} key={idx} />
            ))}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
}

export default MyOrderList;
