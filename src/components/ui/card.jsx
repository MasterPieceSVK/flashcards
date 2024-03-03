import Link from "next/link";

export default function Card({ likes_count, set_name, setId }) {
  return (
    <div className="bg-primary rounded-lg w-3/6">
      <Link href={`/sets/${setId}`}>
        <div className="p-8">
          <h1 className="text-2xl text-center font-bold">{set_name}</h1>
          <h2 className="text-base text-left">Likes: {likes_count}</h2>
        </div>
      </Link>
    </div>
  );
}
