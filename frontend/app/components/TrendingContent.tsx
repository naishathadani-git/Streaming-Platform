"use client";
import React, { useEffect, useState } from "react";
import ContentCard from "./ContentCard";
import { StreamingContent } from "../types/StreamingContent";
import LoadingSkeleton from "./LoadingSkeleton";
import ContentModal from "./ContentModal";
import useWatchHistory from "../hooks/useWatchHistory";

const TrendingContent = () => {
  const [content, setContent] = useState<StreamingContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedContent, setSelectedContent] =
    useState<StreamingContent | null>(null);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const { getProgress, updateProgress } = useWatchHistory();

  const handleContentClick = (contentItem: StreamingContent) => {
    setSelectedContent(contentItem);
    setIsModelOpen(true);
  };
  const handleCloseModal = () => {
    setSelectedContent(null);
    setIsModelOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(
          "http://localhost:3000/streaming-content"
        ).then((res) => res.json());
        setContent(data);
      } catch (error) {
        setError("Failed to load trending content. Please try again.");
        console.log("Error fetching content: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return (
      <p className="text-red-500">
        ⚠️ Unable to load content. Please try again later.
      </p>
    );
  }
  if (isLoading) {
    return (
      <div className="flex overflow-x-scroll gap-4 scrollbar-hide py-2">
        {[...Array(5)].map((_, i) => (
          <LoadingSkeleton key={i} />
        ))}
      </div>
    );
  }
  return (
    <section className="p-4 md:p-6">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">Trending Now</h2>
      <div className="flex flex-nowrap overflow-x-scroll gap-4 md:grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 md:gap-6 scrollbar-hide">
        {Array.isArray(content) && content.length > 0 ? (
          content.map((item) => (
            <ContentCard
              key={item.id}
              content={item}
              onClick={() => handleContentClick(item)}
              progress={getProgress(item.id)}
            />
          ))
        ) : (
          <p>No content available</p>
        )}
      </div>
      <ContentModal
        content={selectedContent}
        isOpen={isModelOpen}
        onClose={handleCloseModal}
        getProgress={getProgress}
        updateProgress={updateProgress}
      />
    </section>
  );
};

export default TrendingContent;
