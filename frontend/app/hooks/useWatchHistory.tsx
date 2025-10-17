import { useState, useEffect, useCallback } from "react";

interface UseWatchHistoryReturn {
  watchProgress: Record<string, number>;
  updateProgress: (id: string, percent: number) => void;
  getProgress: (id: string) => number;
}

export interface WatchProgress {
  [id: string]: number; // key = content.id, value = percentage watched
}

const useWatchHistory = (): UseWatchHistoryReturn => {
  const [watchProgress, setWatchProgress] = useState<WatchProgress>({});

  //Load progress from localstorage
  useEffect(() => {
    const progess = localStorage.getItem("watchProgress");
    if (progess) {
      setWatchProgress(JSON.parse(progess));
    }
  }, []);

  //Update progress whenever changes
  useEffect(() => {
    localStorage.setItem("watchProgress", JSON.stringify(watchProgress));
  }, [watchProgress]);

  const updateProgress = useCallback(
    (id: string, percent: number) => {
      setWatchProgress((prev) => ({
        ...prev,
        [id]: Math.min(100, Math.max(0, percent)),
      }));
      console.log("UpdateProgress:", watchProgress[id]);
    },
    [watchProgress]
  );
  const getProgress = (id: string): number => {
    console.log("GetProgress:", watchProgress[id]);
    return watchProgress[id] || 0;
  };
  return { watchProgress, updateProgress, getProgress };
};

export default useWatchHistory;
