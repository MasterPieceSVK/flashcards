"use client";

import Nav from "@/components/ui/nav";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import info from "../../../info";
import InitNav from "@/components/ui/initnav";
import BrowseComponent from "@/components/ui/BrowseComponent";

export default function Page() {
  const [user, setUser] = useState("");
  const [authorized, setAuthorized] = useState(false);

  const authMutation = useMutation({
    mutationFn: async (token) => {
      return axios.post(
        `${info}/dashboard`,
        { sets: false },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    },
    onSuccess: (data) => {
      setAuthorized(true);
      setUser(data.data.username);
    },
    onError: () => {
      setAuthorized(false);
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    authMutation.mutate(token);
  }, []);

  const getPublicSets = useQuery({
    queryKey: ["sets"],
    queryFn: async () => {
      return axios.get(`${info}/getPublicSets`);
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (e) => console.log(e),
  });

  return (
    <div>
      {authorized ? <Nav user={user} /> : <InitNav />}
      {getPublicSets.isFetched && (
        <BrowseComponent data={getPublicSets.data.data} />
      )}
    </div>
  );
}
