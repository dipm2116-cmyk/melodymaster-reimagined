import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AlbumCardProps {
  title: string;
  artist: string;
  imageUrl?: string;
  year?: string;
}

const AlbumCard = ({ title, artist, imageUrl, year }: AlbumCardProps) => {
  return (
    <div className="group bg-card p-4 rounded-lg hover:bg-accent/50 transition-all duration-300 cursor-pointer relative">
      <div className="relative mb-4">
        <div className="aspect-square bg-muted rounded-lg overflow-hidden">
          {imageUrl ? (
            <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-card flex items-center justify-center">
              <span className="text-muted-foreground text-2xl">♪</span>
            </div>
          )}
        </div>
        <Button
          size="sm"
          className="absolute bottom-2 right-2 w-12 h-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-green opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
        >
          <Play className="h-5 w-5 ml-0.5" />
        </Button>
      </div>
      
      <div>
        <h3 className="font-medium text-foreground mb-1 line-clamp-1">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {year && `${year} • `}{artist}
        </p>
      </div>
    </div>
  );
};

export default AlbumCard;