import Link from "next/link";
import PublicIcon from "./public";
import PrivateIcon from "./private";

export default function Card({ likes_count, set_name, setId, is_public }) {
  return (
    <div className="bg-primary rounded-lg w-3/4 2xl:w-1/2">
      <Link href={`/sets/${setId}`}>
        <div className="p-8">
          <div className="flex gap-2 items-center">
            {is_public ? <PublicIcon /> : <PrivateIcon />}
            <h1 className="text-2xl text-center font-bold">{set_name}</h1>
          </div>
          <h2 className="text-base text-left">Likes: {likes_count}</h2>
        </div>
      </Link>
    </div>
  );
}
