import { StreamingContent } from "../types/StreamingContent";
import useWatchHistory from "../hooks/useWatchHistory";

interface ContentCardProps {
  content: StreamingContent;
  onClick: () => void;
  progress: Number;
}
const ContentCard = ({ content, onClick, progress }: ContentCardProps) => {
  //const { getProgress } = useWatchHistory();
  // const progress = getProgress(content.id);
  console.log("Content ID", content.id);
  console.log("Progress:", progress);
  console.log("Localsotrage:", localStorage.getItem("watchProgress"));
  return (
    <div
      className="min-w-[180px] bg-gray-900 rounded-xl overflow-hidden shadow hover:scale-105 transition-transform cursor-pointer"
      onClick={onClick}
    >
      <img
        src={content.thumbnailUrl}
        alt={content.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-2 text-white">
        <h3 className="font-semibold text-sm truncate">{content.title}</h3>
        <p className="text-xs text-gray-400">
          {content.year} • ⭐ {content.rating}
        </p>
      </div>
      {progress && (
        <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden mt-1">
          <div
            className="bg-green-500 h-1.5"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default ContentCard;
