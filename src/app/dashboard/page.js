"use client";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";

import Nav from "@/components/ui/nav";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import NoSets from "@/components/ui/noSets";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [sets, setSets] = useState([]);
  const [user, setUser] = useState("");
  const router = useRouter();
  const authMutation = useMutation({
    mutationFn: async (token) => {
      return axios.post(
        `http://localhost:5000/dashboard`,
        { sets: true },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    },
    onSuccess: (data) => {
      setSets(data.data.sets);
      setUser(data.data.username);
    },
    onError: () => {
      router.push("/");
      setAuthenticated(false);
    },
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    authMutation.mutate(token);
  }, []);

  useEffect(() => {
    console.log(sets);
  }, [sets]);
  return (
    <div>
      {authMutation.isError && <h1>An error happened</h1>}
      {authMutation.isPending ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <Nav user={user} />
          <Button onClick={() => router.push("/create")}>Create New Set</Button>
          <div className="flex flex-col items-center justify-center gap-4">
            {sets.length > 0 ? (
              sets.map((set) => {
                console.log(set);
                return (
                  <Card likes_count={set.likes_count} set_name={set.set_name} />
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center">
                <NoSets />
                <h1 className="text-center">
                  You dont have any sets created. Create one by clicking the
                  Create New Set button
                </h1>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
