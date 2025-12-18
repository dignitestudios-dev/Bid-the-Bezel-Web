import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";

const CategoriesMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer flex items-center gap-1">
          Categories <ChevronDown size={18} />{" "}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuItem asChild className="py-3">
          <Link
            href={"/collections?category=auction"}
            className="flex justify-between items-center gap-5 font-bold"
          >
            Auction
            <ChevronRight className="font-bold" />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="py-3">
          <Link
            href={"/collections?category=fixed"}
            className="flex justify-between items-center gap-5 font-bold"
          >
            Fixed Price
            <ChevronRight className="font-bold" />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="py-3">
          <Link
            href={"/collections?category=offer"}
            className="flex justify-between items-center gap-5 font-bold"
          >
            Taking Offers
            <ChevronRight className="font-bold" />
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CategoriesMenu;
