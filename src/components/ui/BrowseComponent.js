import MostLikedSets from "./MostLikedSets";
import RecentSets from "./RecentSets";

export default function BrowseComponent({ data }) {
  return (
    <div className="flex flex-col md:flex-row justify-center  gap-4">
      <MostLikedSets mostLiked={data.mostLikedSets} />
      <RecentSets recentSets={data.recentSets} />
    </div>
  );
}
