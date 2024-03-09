"use client";
import Login from "@/components/ui/login";
import SignUp from "@/components/ui/signup";
import Nav from "@/components/ui/nav";
import InitNav from "@/components/ui/initnav";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import info from "../../info";
import { useEffect, useState } from "react";

export default function Home() {
  // const [loggedIn, setLoggedIn] = useState(true);
  const router = useRouter();
  // const authMutation = useMutation({
  //   mutationFn: async (token) => {
  //     return axios.post(
  //       `${info}/dashboard`,
  //       { sets: false },
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  //   },
  //   mutationKey: ["test"],
  //   onSuccess: (data) => {
  //     setLoggedIn(true);
  //     console.log(data.data.username);
  //     router.push(`/users/${data.data.username}`);
  //   },
  //   onError: (e) => {
  //     setLoggedIn(false);
  //     console.log(e);
  //   },
  // });
  // useEffect(() => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     authMutation.mutate(token);
  //   } catch {}
  // }, []);
  // return !loggedIn && <InitNav />;
  useEffect(() => {
    router.push("/browse");
  }, []);
}
