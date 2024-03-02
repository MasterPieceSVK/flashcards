"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

export default function UserPage({ params }) {
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
    onSuccess: () => {
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
    <p className="text-3xl">{params.user}</p>
  ) : (
    <p>No rights to access this account </p>
  );
}
