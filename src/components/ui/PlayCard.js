import { useEffect, useState } from "react";
import { Button } from "./button";
import PreviousIcon from "./previousIcon";
import NextIcon from "./nextIcon";
import Result from "./results";

export default function PlayCard({
  set,
  setRight,
  setWrong,
  right,
  wrong,
  setId,
}) {
  const [currentCard, setCurrentCard] = useState(0);
  const [start, setStart] = useState(false);
  const [end, setEnd] = useState(false);

  useEffect(() => {
    setReveal(false);
  }, [currentCard]);

  const [reveal, setReveal] = useState(false);
  return !end ? (
    <div className="h-1/2 bg-primary flex justify-center flex-col text-center p-4 w-3/4 rounded-lg min-w-fit">
      <div className="flex justify-between gap-1">
        <Button
          className="bg-blue-500 text-white hover:bg-blue-900 gap-2 "
          onClick={() =>
            setCurrentCard(() => {
              if (currentCard - 1 >= 0) {
                setStart(false);
                return currentCard - 1;
              } else {
                setStart(true);
                return currentCard;
              }
            })
          }
        >
          <PreviousIcon />
          Previous Question
        </Button>
        <Button
          className="bg-blue-500 text-white hover:bg-blue-900 gap-2"
          onClick={() =>
            setCurrentCard((currentCard) => {
              if (currentCard + 1 < set.length) {
                setEnd(false);
                return currentCard + 1;
              } else {
                setEnd(true);
                return currentCard; // return currentCard instead of incrementing it
              }
            })
          }
        >
          Next Question
          <NextIcon />
        </Button>
      </div>
      {!reveal ? (
        <h1 className="mb-11 mt-11 font-bold text-4xl text-center">
          {set[currentCard].question}
        </h1>
      ) : (
        <h1 className="mb-11 mt-11 font-bold text-4xl text-center">
          {set[currentCard].answer}
        </h1>
      )}
      <div className="flex flex-col gap-3 items-center">
        <Button
          className="bg-blue-500 text-white hover:bg-blue-900 w-1/2 "
          onClick={() => setReveal(!reveal)}
        >
          {!reveal ? "Reveal" : "Show Question"}
        </Button>
        {reveal && (
          <div>
            <h1 className="font-semibold mb-4">I answered the question: </h1>
            <div className="flex justify-center gap-4">
              <Button
                className="bg-blue-500 text-white hover:bg-green-500"
                onClick={() => {
                  setCurrentCard((currentCard) => {
                    if (currentCard + 1 < set.length) {
                      setEnd(false);
                      return currentCard + 1;
                    } else {
                      setEnd(true);
                      return currentCard; // return currentCard instead of incrementing it
                    }
                  });
                  setRight(() => right + 1);
                }}
              >
                Right
              </Button>
              <Button
                className="bg-blue-500 text-white hover:bg-red-500"
                onClick={() => {
                  setCurrentCard((currentCard) => {
                    if (currentCard + 1 < set.length) {
                      setEnd(false);
                      return currentCard + 1;
                    } else {
                      setEnd(true);
                      return currentCard; // return currentCard instead of incrementing it
                    }
                  });
                  setWrong(() => wrong + 1);
                }}
              >
                Wrong
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  ) : (
    <Result right={right} wrong={wrong} setId={setId} />
  );
}
