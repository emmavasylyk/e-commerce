import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CircleUserRound } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function AccountDropdown() {
  const router = useRouter();
  const onSignOut = () => {
    sessionStorage.clear();
    router.push("/sign-in");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <CircleUserRound className="w-12 h-12 bg-green-100 text-primary p-2 rounded-full cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/my-order">My Order</Link>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onSignOut()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AccountDropdown;
