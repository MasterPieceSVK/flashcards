"use client";
import Nav from "@/components/ui/nav";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import info from "../../../../info";

export default function UserPage({ params }) {
  const [user, setUser] = useState("");
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(true);
  const authMutation = useMutation({
    mutationFn: async (auth) => {
      const token = localStorage.getItem("token");
      return axios.post(
        `${info}/users/${auth}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    },
    onSuccess: (data) => {
      console.log(data);
      setUser(data.data.username);
      setAuthenticated(true);
    },
    onError: (e) => {
      console.log(e);

      setAuthenticated(false);
    },
  });

  useEffect(() => {
    authMutation.mutate(params.user);
  }, []);

  return authenticated ? (
    <div>
      <Nav user={user} />
      <p className="text-3xl">{params.user}</p>
    </div>
  ) : (
    <p>No rights to access this account </p>
  );
}
