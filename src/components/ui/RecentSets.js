import { useState } from "react";
import SetCard from "./SetCard";
import { Button } from "./button";

export default function RecentSets({ recentSets }) {
  const [viewMore, setViewMore] = useState(false);

  return (
    <div className="bg-primary rounded-lg ">
      <h1 className="font-inknut text-3xl text-center pt-5">
        Most Recent Sets
      </h1>
      <div className="bg-primary flex flex-wrap gap-3 p-9">
        {recentSets.map((set, i) => {
          if (!viewMore) {
            if (i < 6) {
              return <SetCard content={set} key={i} />;
            }
          } else {
            return <SetCard content={set} key={i} />;
          }
        })}
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
