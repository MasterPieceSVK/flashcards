"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import Login from "@/components/ui/login";
import SignUp from "@/components/ui/signup";
import Link from "next/link";
import { Button } from "./button";

export default function InitNav() {
  return (
    <div className="flex justify-center items-center my-7 flex-col gap-5">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink>
              <SignUp />
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink>
              <Login />
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <h1 className="font-inknut text-red-900 font-bold uppercase text-center">
        To access everything please create an account or log in
      </h1>
    </div>
  );
}
