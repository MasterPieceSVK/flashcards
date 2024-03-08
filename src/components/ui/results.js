import { useState } from "react";
import { Button } from "./button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import info from "../../../info";

export default function Result({ right, wrong, setId }) {
  const [saved, setSaved] = useState(false);

  const saveMutation = useMutation({
    mutationFn: async (newSave) => {
      return axios.post(
        `${info}/save-result`,
        {
          right: newSave.right,
          wrong: newSave.wrong,
          setId: newSave.setId,
        },
        {
          headers: { Authorization: `Bearer ${newSave.token}` },
        }
      );
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  function handleSave() {
    setSaved(true);
    const newSave = {
      token: localStorage.getItem("token"),
      right,
      wrong,
      setId,
    };
    saveMutation.mutate(newSave);
  }
  let percentage = (right / (right + wrong)) * 100;
  percentage = Number.isInteger(percentage)
    ? percentage
    : percentage.toFixed(2);
  return (
    <div className="h-1/2 bg-primary flex flex-col justify-center gap-2 md:gap-4 text-center p-4 w-3/4 rounded-lg min-w-fit">
      <h1 className="text-3xl font-semibold">Your score:</h1>
      <div className="flex gap-4 ">
        <div className="bg-black rounded-lg w-1/2 p-3 aspect-square flex justify-center items-center flex-col gap-2 sm:gap-4 md:gap-7">
          <h1 className="text-green-500 font-bold  text-2xl sm:text-3xl md:text-5xl">
            {right}
          </h1>
          <h1 className="text-white font-bold  text-2xl sm:text-3xl md:text-5xl">
            Right
          </h1>
        </div>
        <div className="bg-black rounded-lg w-1/2 p-3 aspect-square flex justify-center items-center flex-col gap-2 sm:gap-4 md:gap-7">
          <h1 className="text-red-500 font-bold text-2xl sm:text-3xl md:text-5xl">
            {wrong}
          </h1>
          <h1 className="text-white font-bold  text-2xl sm:text-3xl md:text-5xl">
            Wrong
          </h1>
        </div>
      </div>
      <div className="bg-black rounded-lg  p-3 flex justify-center items-center flex-col gap-2 sm:gap-4 md:gap-7">
        <h1 className="text-white font-bold text-2xl sm:text-3xl md:text-5xl">
          {percentage}%
        </h1>
        <h1 className="text-white font-bold text-2xl sm:text-3xl md:text-5xl">
          Acurracy
        </h1>
      </div>
      <Button
        className="bg-black text-white text-2xl p-6 hover:bg-green-500"
        onClick={handleSave}
        disabled={saved}
      >
        {!saved ? "Save Results" : "Saved"}
      </Button>
    </div>
  );
}
