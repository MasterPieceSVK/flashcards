import Link from "next/link";
import LikeIcon from "./like";
import UserIcon from "./UserIcon";
import PencilIcon from "./Pencil";

export default function SetCard({ content }) {
  const dateObj = new Date(content.created_at);
  let year = dateObj.getFullYear();
  let month = dateObj.getMonth() + 1;
  let day = dateObj.getDate();
  let formattedDate = `${day}.${month}.${year}`;

  return (
    <div className="flex flex-grow flex-shrink">
      <Link href={`/sets/${content.set_id}`}>
        <div className="bg-white  p-5 rounded-lg flex flex-col justify-center  gap-2">
          <div className="flex gap-3 items-center justify-center ">
            <UserIcon />
            <p>{content.username}</p>
          </div>

          <div className="flex justify-center">
            <p className="text-2xl font-inknut">{content.set_name}</p>
          </div>
          <div className="flex gap-3 items-center">
            <PencilIcon />
            <p>{formattedDate}</p>
          </div>
          <div className="flex gap-3 items-center ">
            <LikeIcon />
            <p>{content.likes_count}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
