"use client";
import QuestionCard from "@/components/ui/QuestionCard";
import { Button } from "@/components/ui/button";
import Nav from "@/components/ui/nav";
import NoaccessIcon from "@/components/ui/noacess";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import SetContent from "@/components/ui/setContent";
import Play from "@/components/ui/play";
import PlayIcon from "@/components/ui/PlayIcon";
import PastResults from "@/components/ui/PastResults";
import EmptyHeartIcon from "@/components/ui/emptyHeart";
import FullHeartIcon from "@/components/ui/FullHeart";
import InitNav from "@/components/ui/initnav";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Sets({ params }) {
  const [user, setUser] = useState("");
  const [auth, setAuth] = useState(false);
  const [grabbedData, setGrabbedData] = useState(true);
  const [visibility, setVisibility] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [error, setError] = useState(false);
  const [liked, setLiked] = useState(false);
  const [settled, setSettled] = useState(false);
  const [authInitToken, setAuthInitToken] = useState();
  const router = useRouter();
  const authMutation = useMutation({
    mutationFn: async (token) => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_BASEURL}/dashboard`,
        { sets: false },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    },
    onSuccess: (data) => {
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
    authMutation.mutate(token);
  }, []);

  const qaMutation = useMutation({
    mutationFn: async (authToken) => {
      const setId = Number(params.setId);
      if (Number.isInteger(setId)) {
        return axios.post(
          `${process.env.NEXT_PUBLIC_BASEURL}/qa/${setId}`,
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
        setGrabbedData(false);
      } else {
        setGrabbedData(data.data);
        setLiked(data.data.liked);
      }
    },
    onError: (e) => {
      setError(true);
      console.log(e);
    },
    onSettled: () => {
      setSettled(true);
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

  const likeMutation = useMutation({
    mutationFn: async (newLike) => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_BASEURL}/like`,
        { setId: newLike.setId, like: newLike.like },
        { headers: { Authorization: `Bearer ${newLike.token}` } }
      );
    },
    onSuccess: (data) => {
      if (data.data.like) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    },
    onError: (e) => {
      console.log(e);
    },
  });

  function handleLike() {
    const setId = params.setId;
    const token = localStorage.getItem("token");
    const newLike = {
      setId,
      token,
      like: true,
    };
    grabbedData.likes_count = grabbedData.likes_count + 1;
    likeMutation.mutate(newLike);
  }
  function handleUnlike() {
    const setId = params.setId;
    const token = localStorage.getItem("token");
    const newLike = {
      setId,
      token,
      like: false,
    };
    grabbedData.likes_count = grabbedData.likes_count - 1;

    likeMutation.mutate(newLike);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuthInitToken(token);
  }, []);

  const deleteMutation = useMutation({
    mutationFn: async (setId) => {
      const token = localStorage.getItem("token");

      return axios.delete(`${process.env.NEXT_PUBLIC_BASEURL}/sets`, {
        params: { setId },
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      router.push("/dashboard");
    },
    onError: (e) => {
      console.log(e);
    },
  });

  function handleDelete() {
    deleteMutation.mutate(params.setId);
  }

  return (
    <div>
      {authInitToken ? <Nav user={user} /> : <InitNav />}
      {!error ? (
        !isPlay ? (
          <div>
            {!qaMutation.isPending && !qaMutation.isIdle && !grabbedData.qa ? (
              authInitToken ? (
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
                <div className="flex flex-col items-center justify-center gap-5">
                  <NoaccessIcon />
                  <h1 className="font-bold">
                    Please create an account to access this content
                  </h1>
                  <Button asChild>
                    <Link href={"/dashboard"}>Go Back</Link>
                  </Button>
                </div>
              )
            ) : (
              !qaMutation.isPending &&
              !qaMutation.isIdle && (
                <div className="flex gap-4 flex-col mb-5 items-center">
                  <SetContent content={grabbedData} />
                  <div className="flex gap-4 justify-center mb-5">
                    {user == grabbedData.username && (
                      <Button variant="destructive" onClick={handleDelete}>
                        <Trash2 />
                      </Button>
                    )}
                    <Button
                      disabled={qaMutation.isPending}
                      onClick={() =>
                        visibility ? setVisibility(false) : setVisibility(true)
                      }
                    >
                      Show All Q & A
                    </Button>
                    {liked ? (
                      <Button
                        onClick={handleUnlike}
                        disabled={qaMutation.isPending}
                      >
                        <FullHeartIcon />
                      </Button>
                    ) : (
                      <Button
                        onClick={handleLike}
                        disabled={qaMutation.isPending}
                      >
                        <EmptyHeartIcon />{" "}
                      </Button>
                    )}
                    <Button
                      disabled={qaMutation.isPending}
                      onClick={handlePlay}
                    >
                      <PlayIcon />
                    </Button>
                  </div>
                  <div className="w-3/4">
                    {grabbedData.allResults?.length >= 0 ? (
                      <PastResults results={grabbedData.allResults} />
                    ) : (
                      <h1 className="text-center font-semibold">
                        You haven&apos;t played this set yet. <br></br> Click
                        play
                      </h1>
                    )}
                  </div>
                </div>
              )
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
