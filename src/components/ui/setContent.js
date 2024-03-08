import LoadingDots from "./loadingDots";

export default function SetContent({ length }) {
  return (
    <div className="bg-primary flex flex-col p-6 w-3/4 items-center text-2xl rounded-lg ">
      <p># of questions:</p>
      {length ? <p className="font-extrabold">{length}</p> : <LoadingDots />}
    </div>
  );
}
