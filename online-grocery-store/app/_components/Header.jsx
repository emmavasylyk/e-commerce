"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";

import GlobalApi from "../_utils/GlobalApi";
import { UpdateCardContext } from "../_context/UpdateCardContext";
import CategoryDropdownMenu from "./CategoryDropdownMenu";
import Basket from "./Basket";
import AccountDropdown from "./AccountDropdown";

function Header() {
  const [categoryList, setCategoryList] = useState([]);
  const [totalCartItem, setTotalCartItem] = useState(0);

  const [isLogin, setIsLogin] = useState(false);
  const [jwt, setJwt] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = sessionStorage.getItem("jwt") ? true : false;
      setIsLogin(isLoggedIn);
      const jwtToken = sessionStorage.getItem("jwt");
      setJwt(jwtToken);
      const userInfo = JSON.parse(sessionStorage.getItem("user"));
      setUser(userInfo);
    }
  }, []);

  const { updateCard, setUpdateCard } = useContext(UpdateCardContext);
  const [cardItemList, setCardItemList] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    if (user && jwt) {
      getCardItems();
    }
  }, [updateCard, user, jwt]);

  // Get Category List
  const getCategoryList = () => {
    GlobalApi.getCategory().then((resp) => {
      setCategoryList(resp.data.data);
    });
  };

  // Used to get total cart items
  const getCardItems = async () => {
    if (!user || !jwt) return;
    const cardItemList_ = await GlobalApi.getCardItems(user.id, jwt);
    setTotalCartItem(cardItemList_?.length);
    setCardItemList(cardItemList_);
  };

  const onDeleteItem = (id) => {
    GlobalApi.deleteCartItem(id, jwt).then((resp) => {
      toast("Item deleted successfully", { type: "success" });
      getCardItems();
    });
  };

  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    let total = 0;

    cardItemList.forEach((element) => {
      total = total + element.amount;
    });
    setSubTotal(total.toFixed(2));
  }, [cardItemList]);

  console.log("CATEGORY LIST", categoryList);

  return (
    <div className="p-5 shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link href="/" className="cursor-pointer">
          <Image src="/logo.png" alt="logo" width={100} height={100} />
        </Link>
        <CategoryDropdownMenu categoryList={categoryList} />
        <div className="hidden md:flex gap-3 items-center border rounded-full p-2 px-5">
          <Search />
          <input type="text" placeholder="Search" className="outline-none" />
        </div>
      </div>
      <div className="flex items-center gap-5">
        <Basket
          totalCartItem={totalCartItem}
          cardItemList={cardItemList}
          onDeleteItem={onDeleteItem}
          subTotal={subTotal}
          jwt={jwt}
        />
        {!isLogin ? (
          <Link href="/sign-in">
            <Button>Login</Button>
          </Link>
        ) : (
          <AccountDropdown />
        )}
      </div>
    </div>
  );
}

export default Header;
