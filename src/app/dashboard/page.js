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
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [sets, setSets] = useState([]);

  const authMutation = useMutation({
    mutationFn: async (token) => {
      return axios.post(
        `http://localhost:5000/dashboard`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    },
    onSuccess: (data) => {
      setSets(data.data);
    },
    onError: () => {
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
      {authMutation.isPending ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <Nav />
          <Button>Create New Set</Button>
          <div className="flex flex-col items-center justify-center gap-4">
            {sets &&
              sets.map((set) => {
                console.log(set);
                return (
                  <Card likes_count={set.likes_count} set_name={set.set_name} />
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
