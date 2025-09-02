import { ScrollArea } from "@/components/ui/scroll-area";
import AlbumCard from "./AlbumCard";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Album {
  id: string;
  title: string;
  artist_name: string;
  image_url: string;
  release_year: number;
}

const MainContent = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const { data, error } = await supabase
          .from('albums')
          .select(`
            id,
            title,
            image_url,
            release_year,
            artists (
              name
            )
          `)
          .limit(20);

        if (error) {
          console.error('Error fetching albums:', error);
          return;
        }

        const albumsWithArtist = data?.map(album => ({
          id: album.id,
          title: album.title,
          artist_name: album.artists?.name || 'Unknown Artist',
          image_url: album.image_url,
          release_year: album.release_year
        })) || [];

        setAlbums(albumsWithArtist);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  const madeForYou = [
    { title: "Discover Weekly", artist: "Your weekly mixtape of fresh music" },
    { title: "Daily Mix 1", artist: "Made for you" },
    { title: "Daily Mix 2", artist: "Made for you" },
    { title: "Release Radar", artist: "Catch all the latest music from artists you follow" },
    { title: "Chill Mix", artist: "The perfect mix to keep you company" },
    { title: "Rock Mix", artist: "Rock hits and deep cuts" },
  ];

  if (loading) {
    return (
      <div className="flex-1 bg-gradient-hero">
        <div className="p-6 flex items-center justify-center h-full">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gradient-hero">
      <ScrollArea className="h-full">
        <div className="p-6">
          {/* Good afternoon header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-6">Good afternoon</h1>
            
            {/* Quick access grid */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {albums.slice(0, 6).map((album) => (
                <div
                  key={album.id}
                  className="bg-card/80 backdrop-blur-sm rounded-md flex items-center overflow-hidden hover:bg-accent/50 transition-colors cursor-pointer group"
                >
                  <div className="w-16 h-16 bg-muted flex-shrink-0">
                    {album.image_url ? (
                      <img src={album.image_url} alt={album.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-card flex items-center justify-center">
                        <span className="text-muted-foreground">♪</span>
                      </div>
                    )}
                  </div>
                  <div className="px-4 flex-1">
                    <p className="font-medium text-foreground text-sm truncate">{album.title}</p>
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
              {albums.slice(0, 6).map((album) => (
                <AlbumCard
                  key={album.id}
                  title={album.title}
                  artist={album.artist_name}
                  imageUrl={album.image_url}
                  year={album.release_year?.toString()}
                />
              ))}
            </div>
          </section>

          {/* Popular albums section */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Popular albums</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {albums.slice(4, 8).map((album) => (
                <AlbumCard
                  key={album.id}
                  title={album.title}
                  artist={album.artist_name}
                  imageUrl={album.image_url}
                  year={album.release_year?.toString()}
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