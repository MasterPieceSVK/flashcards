import PencilIcon from "./Pencil";
import UserIcon from "./UserIcon";
import LikeIcon from "./like";
import LoadingDots from "./loadingDots";
import PrivateIcon from "./private";
import PublicIcon from "./public";

export default function SetContent({ content }) {
  const dateObj = new Date(content.created_at);
  let year = dateObj.getFullYear();
  let month = dateObj.getMonth() + 1;
  let day = dateObj.getDate();
  let formattedDate = `${day}.${month}.${year}`;
  return (
    <div className="bg-primary flex flex-col p-6 w-3/4 text-2xl rounded-lg ">
      <div className="flex justify-between items-center">
        <div className="font-bold text-center uppercase mx-auto">
          <h1>{content.set_name}</h1>
        </div>
        <div>{content.is_public ? <PublicIcon /> : <PrivateIcon />}</div>
      </div>
      <div className="flex items-center gap-1 justify-start">
        <UserIcon />
        <p>{content.username}</p>
      </div>
      <div className="flex items-center gap-1 justify-start">
        <LikeIcon />
        <p>{content.likes_count}</p>
      </div>
      <div className="flex items-center gap-1 justify-start">
        <PencilIcon />
        <p>{formattedDate}</p>
      </div>
      <div className="flex justify-center items-center flex-col gap-3 mt-6">
        <p># of questions:</p>
        {content.qa.length ? (
          <p className="font-extrabold text-3xl">{content.qa.length}</p>
        ) : (
          <LoadingDots />
        )}
      </div>
    </div>
  );
}
