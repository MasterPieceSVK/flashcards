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
    <div className="flex items-center justify-center">
      <div className="w-full 3xl:w-3/4 3xl:w-1/2">
        <Link href={`/sets/${content.set_id}`}>
          <div className="bg-white  rounded-lg flex flex-col justify-center  gap-2 p-6 ">
            <div className="flex gap-3 items-center justify-center ">
              <UserIcon />
              <p className="text-wrap font-semibold">{content.username}</p>
            </div>

            <div className="flex justify-center">
              <p className="text-4xl font-inknut text-wrap">
                {content.set_name}
              </p>
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
    </div>
  );
}
