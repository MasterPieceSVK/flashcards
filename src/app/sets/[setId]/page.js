"use client";
import QuestionCard from "@/components/ui/QuestionCard";
import { Button } from "@/components/ui/button";
import Nav from "@/components/ui/nav";
import NoaccessIcon from "@/components/ui/noacess";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import info from "../../../../info";

export default function Sets({ params }) {
  const [user, setUser] = useState("");
  const [auth, setAuth] = useState(false);
  const [data, setData] = useState();
  const [visibility, setVisibility] = useState(false);
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
      console.log(data.data.username);
      setUser(data.data.username);
      setAuth(true);
    },
    onError: (e) => {
      console.log(e);
    },
  });
  const token = localStorage.getItem("token");

  useEffect(() => {
    console.log(token);
    authMutation.mutate(token);
  }, []);

  const qaMutation = useMutation({
    mutationFn: async (setId) => {
      setId = params.setId;
      console.log(setId);
      return axios.post(
        `http://localhost:5000/qa/${setId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onSuccess: (data) => {
      if (data.data == "") {
        setData(false);
      } else {
        setData(data.data);
      }
    },
    onError: (e) => console.log(e),
  });

  useEffect(() => {
    qaMutation.mutate(token);
  }, [auth]);

  function handlePlay() {
    console.log("play");
  }
  return (
    <div>
      <Nav user={user} />
      {!data ? (
        <div className="flex flex-col items-center justify-center gap-5">
          <NoaccessIcon />
          <h1 className="font-bold">
            Looks like you don&apos;t have access to this set
          </h1>
          <Button asChild>
            <Link href={"/dashboard"}>Go Back</Link>
          </Button>
        </div>
      ) : (
        <div className="flex gap-4 justify-center mb-5">
          <Button
            onClick={() =>
              visibility ? setVisibility(false) : setVisibility(true)
            }
          >
            Show FlashCards
          </Button>
          <Button onClick={handlePlay}>Play</Button>
        </div>
      )}

      {visibility && (
        <div className="flex flex-col gap-4 justify-center items-center">
          {data &&
            data.map((qa, i) => {
              return <QuestionCard key={i} q={qa.question} a={qa.answer} />;
            })}
        </div>
      )}
    </div>
  );
}
