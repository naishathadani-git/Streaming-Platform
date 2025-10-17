import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ContentModal from "../ContentModal";
import { StreamingContent } from "../../types/StreamingContent";
import useWatchHistory from "@/app/hooks/useWatchHistory";
import "@testing-library/jest-dom";

// jest.mock("@/app/hooks/useWatchHistory", () => ({
//   __esModule: true,
//   default: jest.fn(),
// }));
jest.mock("@/app/hooks/useWatchHistory");

describe("ContentModal", () => {
  const mockOnClose = jest.fn();
  const mockUpdateProgress = jest.fn();
  const mockGetProgres = jest.fn().mockReturnValue(0);

  const mockContent: StreamingContent = {
    id: "1",
    title: "Inception",
    description: "A mind-bending thriller",
    thumbnailUrl: "https://example.com/inception.jpg",
    videoUrl: "https://example.com/inception.mp4",
    year: 2010,
    genre: "Sci-Fi",
    rating: 8.8,
    duration: 148,
    cast: "Leonardo DiCaprio",
    watchProgress: 0,
    createdAt: "2025-10-16T18:05:00Z",
    updatedAt: "2025-10-16T18:05:00Z",
  };
  //const mockedUseWatchHistory = useWatchHistoryModule.default as jest.Mock;
  beforeEach(() => {
    jest.clearAllMocks();
    (useWatchHistory as jest.Mock).mockReturnValue({
      getProgress: mockGetProgres,
      updateProgress: mockUpdateProgress,
    });
  });
  it("renders the content modal with details", () => {
    render(
      <ContentModal
        content={mockContent}
        onClose={mockOnClose}
        isOpen={true}
        getProgress={mockGetProgres}
        updateProgress={mockUpdateProgress}
      />
    );

    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(screen.getByText(/A mind-bending thriller/i)).toBeInTheDocument();
    expect(screen.getByAltText("Inception thumbnail")).toBeInTheDocument();
  });
  it("calls updateProgress when 'Mark 60% Watched' button is clicked", () => {
    render(
      <ContentModal
        content={mockContent}
        onClose={mockOnClose}
        isOpen={true}
        getProgress={mockGetProgres}
        updateProgress={mockUpdateProgress}
      />
    );

    const button = screen.getByRole("button", { name: /mark 60% watched/i });
    fireEvent.click(button);

    expect(mockUpdateProgress).toHaveBeenCalledWith("1", 60);
  });
  it("calls onClose when close button is clicked", () => {
    render(
      <ContentModal
        content={mockContent}
        onClose={mockOnClose}
        isOpen={true}
        getProgress={mockGetProgres}
        updateProgress={mockUpdateProgress}
      />
    );

    const closeBtn = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeBtn);

    expect(mockOnClose).toHaveBeenCalled();
  });
  it("has proper ARIA labels for accessibility", () => {
    render(
      <ContentModal
        content={mockContent}
        onClose={mockOnClose}
        isOpen={true}
        getProgress={mockGetProgres}
        updateProgress={mockUpdateProgress}
      />
    );

    const modal = screen.getByRole("dialog");
    expect(modal).toHaveAttribute("aria-modal", "true");
  });
});
