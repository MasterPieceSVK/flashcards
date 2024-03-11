import { useState } from "react";
import SetCard from "./SetCard";
import { Button } from "./button";

export default function MostLikedSets({ mostLiked }) {
  const [viewMore, setViewMore] = useState(false);
  return (
    <div className="bg-primary rounded-lg md:w-1/2 md:ml-3">
      <div className="flex justify-center mt-5">
        <div className=" bg-gradient-to-r from-black via-purple-600 to-black w-fit rounded-xl">
          <h1 className="font-bold text-gray-200   text-4xl text-center p-5 ">
            Most Liked Sets
          </h1>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="bg-black 3xl:bg-primary 3xl:w-full rounded-3xl w-11/12  mt-2 flex flex-col  gap-3 p-9">
          {mostLiked.map((set, i) => {
            if (!viewMore) {
              if (i < 6) {
                return <SetCard content={set} key={i} />;
              }
            } else {
              return <SetCard content={set} key={i} />;
            }
          })}
        </div>
      </div>
      <div className="flex justify-center p-6">
        <Button
          className="bg-black text-white hover:bg-gray-500"
          onClick={() => setViewMore(!viewMore)}
        >
          {viewMore ? "View Less" : "View More"}
        </Button>
      </div>
    </div>
  );
}
