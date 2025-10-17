import Image from "next/image";

import TrendingContent from "../app/components/TrendingContent";
import Header from "../app/components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="pt-16 min-h-screen bg-black text-white items-center justify-items-center flex flex-col justify-start">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to My Streaming Platform
        </h1>
        <TrendingContent />
      </main>
    </div>
  );
}
