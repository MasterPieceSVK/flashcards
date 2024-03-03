"use client";
import Nav from "@/components/ui/nav";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserPage({ params }) {
  const [user, setUser] = useState("");
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const authMutation = useMutation({
    mutationFn: async (auth) => {
      const token = localStorage.getItem("token");
      return axios.post(
        `http://localhost:5000/users/${auth}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    },
    onSuccess: (data) => {
      setUser(data.data.username);
      setAuthenticated(true);
    },
    onError: () => {
      setAuthenticated(false);
    },
  });

  useEffect(() => {
    authMutation.mutate(params.user);
  }, []);

  return authMutation.isPending ? (
    <p>loading</p>
  ) : authenticated ? (
    <div>
      <Nav user={user} />
      <p className="text-3xl">{params.user}</p>
    </div>
  ) : (
    <p>No rights to access this account </p>
  );
}
