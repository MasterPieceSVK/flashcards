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
import SetContent from "@/components/ui/setContent";
import Play from "@/components/ui/play";

export default function Sets({ params }) {
  const [user, setUser] = useState("");
  const [auth, setAuth] = useState(false);
  const [grabbedData, setGrabbedData] = useState(true);
  const [visibility, setVisibility] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [error, setError] = useState(false);
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
      // console.log(data.data.username);
      setUser(data.data.username);
      setAuth(true);
    },
    onError: (e) => {
      console.log(e);
    },
  });
  let token = "";
  useEffect(() => {
    token = localStorage.getItem("token");
    // console.log(token);
    authMutation.mutate(token);
  }, []);

  const qaMutation = useMutation({
    mutationFn: async (authToken) => {
      const setId = Number(params.setId);
      if (Number.isInteger(setId)) {
        return axios.post(
          `${info}/qa/${setId}`,
          {},
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
      } else {
        setError(true);
      }
    },
    onSuccess: (data) => {
      setError(false);
      if (data.data == "") {
        // console.log("succes printing data 0 ");
        // console.log(data);
        setGrabbedData(false);
      } else {
        // console.log("succes printing data 1 ");
        // console.log(data);
        setGrabbedData(data.data);
      }
    },
    onError: (e) => {
      setError(true);
      console.log(e);
    },
  });

  useEffect(() => {
    if (auth) {
      const authToken = localStorage.getItem("token");
      qaMutation.mutate(authToken);
    }
  }, [auth]);

  function handlePlay() {
    setIsPlay(true);
  }
  return (
    <div>
      <Nav user={user} />
      {!error ? (
        !isPlay ? (
          <div>
            {!grabbedData.qa ? (
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
              <div className="flex gap-4 flex-col mb-5 items-center">
                <SetContent content={grabbedData} />
                <div className="flex gap-4 justify-center mb-5">
                  <Button
                    disabled={qaMutation.isPending}
                    onClick={() =>
                      visibility ? setVisibility(false) : setVisibility(true)
                    }
                  >
                    Show Questions and Answers
                  </Button>
                  <Button disabled={qaMutation.isPending} onClick={handlePlay}>
                    Play
                  </Button>
                </div>
              </div>
            )}

            {visibility && (
              <div className="flex flex-col gap-4 justify-center items-center">
                {grabbedData &&
                  grabbedData.qa.map((qa, i) => {
                    console.log(qa);
                    return (
                      <QuestionCard key={i} q={qa.question} a={qa.answer} />
                    );
                  })}
              </div>
            )}
          </div>
        ) : (
          <Play set={grabbedData.qa} setId={params.setId} />
        )
      ) : (
        <div className="bg-primary flex flex-col items-center justify-center w-1/2 rounded-lg gap-5 p-5 m-auto">
          <h1>Error</h1>
          <Button className="bg-black hover:bg-gray-500 text-white" asChild>
            <Link href={"/dashboard"}>Go back</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
