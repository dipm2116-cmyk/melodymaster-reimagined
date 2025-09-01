import { Home, Search, Library, Plus, Heart, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const SpotifySidebar = () => {
  const playlists = [
    "Liked Songs",
    "My Playlist #1",
    "Discover Weekly", 
    "Release Radar",
    "Daily Mix 1",
    "Chill Hits",
    "Rock Classics",
    "Pop Rising",
    "Indie Folk",
    "Electronic Favorites"
  ];

  return (
    <div className="w-64 bg-spotify-darker flex flex-col h-full">
      {/* Logo */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-foreground">Spotify</h1>
      </div>

      {/* Main Navigation */}
      <div className="px-6 mb-6">
        <nav className="space-y-2">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-foreground hover:text-foreground hover:bg-accent"
          >
            <Home className="mr-3 h-5 w-5" />
            Home
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            <Search className="mr-3 h-5 w-5" />
            Search
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            <Library className="mr-3 h-5 w-5" />
            Your Library
          </Button>
        </nav>
      </div>

      {/* Create Playlist Section */}
      <div className="px-6 mb-6">
        <div className="space-y-2">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            <Plus className="mr-3 h-5 w-5" />
            Create Playlist
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            <Heart className="mr-3 h-5 w-5" />
            Liked Songs
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            <Download className="mr-3 h-5 w-5" />
            Your Episodes
          </Button>
        </div>
      </div>

      <div className="px-6 mb-4">
        <div className="h-px bg-border"></div>
      </div>

      {/* Playlists */}
      <div className="flex-1 px-6">
        <ScrollArea className="h-full">
          <div className="space-y-2">
            {playlists.map((playlist, index) => (
              <button
                key={index}
                className="w-full text-left text-muted-foreground hover:text-foreground text-sm py-1 transition-colors"
              >
                {playlist}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default SpotifySidebar;