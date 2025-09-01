import { Play, SkipBack, SkipForward, Repeat, Shuffle, Volume2, Mic2, ListMusic, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const SpotifyPlayer = () => {
  return (
    <div className="h-20 bg-card border-t border-border flex items-center justify-between px-4">
      {/* Currently Playing */}
      <div className="flex items-center space-x-3 w-1/4">
        <div className="w-14 h-14 bg-muted rounded"></div>
        <div>
          <h4 className="text-sm font-medium text-foreground">Song Title</h4>
          <p className="text-xs text-muted-foreground">Artist Name</p>
        </div>
      </div>

      {/* Player Controls */}
      <div className="flex flex-col items-center space-y-2 w-2/4">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <Shuffle className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-8 h-8 p-0"
          >
            <Play className="h-4 w-4 ml-0.5" />
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <SkipForward className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <Repeat className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Progress Bar */}
        <div className="flex items-center space-x-2 w-full max-w-md">
          <span className="text-xs text-muted-foreground">1:23</span>
          <Slider
            defaultValue={[33]}
            max={100}
            step={1}
            className="flex-1"
          />
          <span className="text-xs text-muted-foreground">3:45</span>
        </div>
      </div>

      {/* Volume and Other Controls */}
      <div className="flex items-center space-x-2 w-1/4 justify-end">
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <Mic2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <ListMusic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <Monitor className="h-4 w-4" />
        </Button>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <Volume2 className="h-4 w-4" />
          </Button>
          <Slider
            defaultValue={[70]}
            max={100}
            step={1}
            className="w-20"
          />
        </div>
      </div>
    </div>
  );
};

export default SpotifyPlayer;