"use client";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";

import Nav from "@/components/ui/nav";

import NoSets from "@/components/ui/noSets";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

export default function Dashboard() {
  const [sets, setSets] = useState([]);
  const [user, setUser] = useState("");
  const [noSets, setNoSets] = useState(false);
  const router = useRouter();
  const authMutation = useMutation({
    mutationFn: async (token) => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_BASEURL}/dashboard`,
        { sets: true },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    },
    onSuccess: (data) => {
      if (data.data.sets?.length) {
        setNoSets(false);
        setSets(data.data.sets);
      } else {
        setNoSets(true);
      }
      setUser(data.data.username);
    },
    onError: () => {
      router.push("/");
      setAuthenticated(false);
    },
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    authMutation.mutate(token);
  }, []);

  useEffect(() => {
    console.log(sets);
  }, [sets]);
  return (
    <div>
      {authMutation.isError ? (
        <h1>An error happened</h1>
      ) : (
        <div>
          <Nav user={user} />
          <div className="flex justify-end mb-9 w-3/4">
            <Button onClick={() => router.push("/create")}>
              <Plus />
              <p className="font-bold ml-2 ">New Set</p>
            </Button>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            {!noSets ? (
              sets.map((set, i) => {
                return (
                  <Card
                    key={i}
                    is_public={set.is_public}
                    setId={set.set_id}
                    likes_count={set.likes_count}
                    set_name={set.set_name}
                  />
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
