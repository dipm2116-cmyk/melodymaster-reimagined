import SpotifySidebar from "@/components/SpotifySidebar";
import SpotifyPlayer from "@/components/SpotifyPlayer";
import MainContent from "@/components/MainContent";

const Index = () => {
  return (
    <div className="h-screen bg-background flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        <SpotifySidebar />
        <MainContent />
      </div>
      <SpotifyPlayer />
    </div>
  );
};

export default Index;
