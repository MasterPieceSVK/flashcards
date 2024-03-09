import MostLikedSets from "./MostLikedSets";
import RecentSets from "./RecentSets";

export default function BrowseComponent({ data }) {
  console.log(data);
  return (
    <div className="flex flex-col gap-4">
      <MostLikedSets mostLiked={data.mostLikedSets} />
      <RecentSets recentSets={data.recentSets} />
    </div>
  );
}
