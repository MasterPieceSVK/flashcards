"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Link from "next/link";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import { LogOutIcon } from "lucide-react";
import { useEffect } from "react";
export default function Nav({ user }) {
  const router = useRouter();
  function handleLogOut() {
    localStorage.setItem("token", "");
    router.push("/");
  }

  return (
    <div className="flex justify-between items-center py-4 px-4 flex-wrap bg-primary mb-8 h-[10vh]">
      <div className="flex-grow text-center">
        <Link href="/dashboard" legacyBehavior passHref>
          <Button variant="secondary">Dashboard</Button>
        </Link>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="secondary" className="h-max" asChild>
              <div>
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-black text-white">
                    {user[0] + user[1]}
                  </AvatarFallback>
                </Avatar>

                <h3 className="ml-4">{user}</h3>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="text-center">
              {user}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button asChild variant="ghost">
                <Link href={`/users/${user}`}>Profile</Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button variant="ghost" onClick={handleLogOut}>
                <LogOutIcon /> Logout
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
