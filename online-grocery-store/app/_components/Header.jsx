"use client";

import { Button } from "@/components/ui/button";
import { CircleUserRound, LayoutGrid, Search, ShoppingBag } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GlobalApi from "../_utils/GlobalApi";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Header() {
  const [categoryList, setCategoryList] = useState([]);
  const router = useRouter();
  const isLogin = sessionStorage.getItem("jwt") ? true : false;

  useEffect(() => {
    getCategoryList();
  }, []);

  // Get Category List
  const getCategoryList = () => {
    GlobalApi.getCategory().then((resp) => {
      setCategoryList(resp.data.data);
    });
  };

  const onSignOut = () => {
    sessionStorage.clear();
    router.push("/sign-in");
  };

  return (
    <div className="p-5 shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Image src="/logo.png" alt="logo" width={100} height={100} />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <h2 className="hidden md:flex gap-2 items-center border rounded-full p-2 px-10 bg-slate-200 cursor-pointer">
              <LayoutGrid className="w-5 h-5" /> Category
            </h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categoryList.map((category, index) => {
              const imageUrls = category?.attributes?.icon?.data?.map(
                (image) => image?.attributes?.url
              );
              return (
                <Link
                  href={`/products-category/${category?.attributes?.name}`}
                  key={index}
                >
                  <DropdownMenuItem
                    key={category.id}
                    className="flex gap-4 items-center cursor-pointer"
                  >
                    {imageUrls?.map((imageUrl, index) => (
                      <Image
                        key={index}
                        src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${imageUrl}`}
                        unoptimized={true}
                        alt="icon"
                        width={30}
                        height={30}
                      />
                    ))}
                    <h2 className="text-lg">{category?.attributes?.name}</h2>
                  </DropdownMenuItem>
                </Link>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="hidden md:flex gap-3 items-center border rounded-full p-2 px-5">
          <Search />
          <input type="text" placeholder="Search" className="outline-none" />
        </div>
      </div>
      <div className="flex items-center gap-5">
        <h2 className="flex gap-2 items-center text-lg">
          <ShoppingBag /> 0
        </h2>
        {!isLogin ? (
          <Link href="/sign-in">
            <Button>Login</Button>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <CircleUserRound className="w-12 h-12 bg-green-100 text-primary p-2 rounded-full cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>My Order</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSignOut()}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}

export default Header;
