"use client";
import Nav from "@/components/ui/nav";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Create() {
  const [user, setUser] = useState("");
  const router = useRouter();
  const authMutation = useMutation({
    mutationFn: async (token) => {
      return axios.post(
        `http://localhost:5000/dashboard`,
        { sets: false },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    },
    onSuccess: (data) => {
      setUser(data.data.username);
    },
    onError: (e) => {
      console.log(e);
      router.push("/");
    },
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    authMutation.mutate(token);
  }, []);

  return <Nav user={user} />;
}
