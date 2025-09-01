import { ScrollArea } from "@/components/ui/scroll-area";
import AlbumCard from "./AlbumCard";
import album1 from "@/assets/album1.jpg";
import album2 from "@/assets/album2.jpg";
import album3 from "@/assets/album3.jpg";
import album4 from "@/assets/album4.jpg";

const MainContent = () => {
  const recentlyPlayed = [
    { title: "Sunset Dreams", artist: "Ambient Collective", imageUrl: album1, year: "2024" },
    { title: "Digital Frontier", artist: "Cyber Pulse", imageUrl: album2, year: "2024" },
    { title: "Forest Tales", artist: "Wild Harmony", imageUrl: album3, year: "2023" },
    { title: "Street Vibes", artist: "Urban Flow", imageUrl: album4, year: "2024" },
    { title: "Late Night Jazz", artist: "The Midnight Quartet" },
    { title: "Electronic Dreams", artist: "Synth Master" },
  ];

  const madeForYou = [
    { title: "Discover Weekly", artist: "Your weekly mixtape of fresh music" },
    { title: "Daily Mix 1", artist: "Made for you" },
    { title: "Daily Mix 2", artist: "Made for you" },
    { title: "Release Radar", artist: "Catch all the latest music from artists you follow" },
    { title: "Chill Mix", artist: "The perfect mix to keep you company" },
    { title: "Rock Mix", artist: "Rock hits and deep cuts" },
  ];

  const popularAlbums = [
    { title: "Midnight City", artist: "Various Artists", imageUrl: album1, year: "2024" },
    { title: "Future Bass", artist: "Electronic Collective", imageUrl: album2, year: "2024" },
    { title: "Acoustic Sessions", artist: "Indie Artists", imageUrl: album3, year: "2023" },
    { title: "Hip Hop Now", artist: "Various Artists", imageUrl: album4, year: "2024" },
  ];

  return (
    <div className="flex-1 bg-gradient-hero">
      <ScrollArea className="h-full">
        <div className="p-6">
          {/* Good afternoon header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-6">Good afternoon</h1>
            
            {/* Quick access grid */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {recentlyPlayed.slice(0, 6).map((item, index) => (
                <div
                  key={index}
                  className="bg-card/80 backdrop-blur-sm rounded-md flex items-center overflow-hidden hover:bg-accent/50 transition-colors cursor-pointer group"
                >
                  <div className="w-16 h-16 bg-muted flex-shrink-0">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-card flex items-center justify-center">
                        <span className="text-muted-foreground">♪</span>
                      </div>
                    )}
                  </div>
                  <div className="px-4 flex-1">
                    <p className="font-medium text-foreground text-sm truncate">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Made for you section */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Made for you</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {madeForYou.map((item, index) => (
                <AlbumCard
                  key={index}
                  title={item.title}
                  artist={item.artist}
                />
              ))}
            </div>
          </section>

          {/* Recently played section */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Recently played</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {recentlyPlayed.map((item, index) => (
                <AlbumCard
                  key={index}
                  title={item.title}
                  artist={item.artist}
                  imageUrl={item.imageUrl}
                  year={item.year}
                />
              ))}
            </div>
          </section>

          {/* Popular albums section */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Popular albums</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {popularAlbums.map((item, index) => (
                <AlbumCard
                  key={index}
                  title={item.title}
                  artist={item.artist}
                  imageUrl={item.imageUrl}
                  year={item.year}
                />
              ))}
            </div>
          </section>
        </div>
      </ScrollArea>
    </div>
  );
};

export default MainContent;