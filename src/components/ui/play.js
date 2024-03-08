import { useEffect, useState } from "react";
import PlayCard from "./PlayCard";

export default function Play({ set, setId }) {
  const [right, setRight] = useState(0);
  const [wrong, setWrong] = useState(0);
  return (
    <div className="flex justify-center">
      <PlayCard
        set={set}
        setRight={setRight}
        setWrong={setWrong}
        right={right}
        wrong={wrong}
        setId={setId}
      />
    </div>
  );
}
