-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create artists table
CREATE TABLE public.artists (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  image_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create albums table
CREATE TABLE public.albums (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  artist_id UUID NOT NULL REFERENCES public.artists(id) ON DELETE CASCADE,
  image_url TEXT,
  release_year INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create songs table
CREATE TABLE public.songs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  artist_id UUID NOT NULL REFERENCES public.artists(id) ON DELETE CASCADE,
  album_id UUID REFERENCES public.albums(id) ON DELETE SET NULL,
  duration_seconds INTEGER,
  audio_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create playlists table
CREATE TABLE public.playlists (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create playlist_songs junction table
CREATE TABLE public.playlist_songs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  playlist_id UUID NOT NULL REFERENCES public.playlists(id) ON DELETE CASCADE,
  song_id UUID NOT NULL REFERENCES public.songs(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  added_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(playlist_id, song_id)
);

-- Create user_liked_songs table
CREATE TABLE public.user_liked_songs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  song_id UUID NOT NULL REFERENCES public.songs(id) ON DELETE CASCADE,
  liked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, song_id)
);

-- Create listening_history table
CREATE TABLE public.listening_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  song_id UUID NOT NULL REFERENCES public.songs(id) ON DELETE CASCADE,
  played_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.songs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.playlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.playlist_songs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_liked_songs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listening_history ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for artists (public read, admin write)
CREATE POLICY "Anyone can view artists" ON public.artists FOR SELECT USING (true);

-- Create RLS policies for albums (public read, admin write)
CREATE POLICY "Anyone can view albums" ON public.albums FOR SELECT USING (true);

-- Create RLS policies for songs (public read, admin write)
CREATE POLICY "Anyone can view songs" ON public.songs FOR SELECT USING (true);

-- Create RLS policies for playlists
CREATE POLICY "Users can view public playlists and their own" ON public.playlists 
  FOR SELECT USING (is_public = true OR auth.uid() = user_id);
CREATE POLICY "Users can create their own playlists" ON public.playlists 
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own playlists" ON public.playlists 
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own playlists" ON public.playlists 
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for playlist_songs
CREATE POLICY "Users can view songs in public playlists and their own" ON public.playlist_songs 
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.playlists 
      WHERE playlists.id = playlist_songs.playlist_id 
      AND (playlists.is_public = true OR playlists.user_id = auth.uid())
    )
  );
CREATE POLICY "Users can add songs to their own playlists" ON public.playlist_songs 
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.playlists 
      WHERE playlists.id = playlist_songs.playlist_id 
      AND playlists.user_id = auth.uid()
    )
  );
CREATE POLICY "Users can remove songs from their own playlists" ON public.playlist_songs 
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.playlists 
      WHERE playlists.id = playlist_songs.playlist_id 
      AND playlists.user_id = auth.uid()
    )
  );

-- Create RLS policies for user_liked_songs
CREATE POLICY "Users can view their own liked songs" ON public.user_liked_songs 
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can like songs" ON public.user_liked_songs 
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unlike songs" ON public.user_liked_songs 
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for listening_history
CREATE POLICY "Users can view their own listening history" ON public.listening_history 
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can add to their listening history" ON public.listening_history 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_playlists_updated_at
  BEFORE UPDATE ON public.playlists
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data
INSERT INTO public.artists (name, image_url) VALUES
  ('Ambient Collective', '/placeholder.svg'),
  ('Cyber Pulse', '/placeholder.svg'),
  ('Wild Harmony', '/placeholder.svg'),
  ('Urban Flow', '/placeholder.svg'),
  ('The Midnight Quartet', '/placeholder.svg'),
  ('Synth Master', '/placeholder.svg'),
  ('Various Artists', '/placeholder.svg'),
  ('Electronic Collective', '/placeholder.svg'),
  ('Indie Artists', '/placeholder.svg');

INSERT INTO public.albums (title, artist_id, image_url, release_year) VALUES
  ('Sunset Dreams', (SELECT id FROM public.artists WHERE name = 'Ambient Collective'), '/src/assets/album1.jpg', 2024),
  ('Digital Frontier', (SELECT id FROM public.artists WHERE name = 'Cyber Pulse'), '/src/assets/album2.jpg', 2024),
  ('Forest Tales', (SELECT id FROM public.artists WHERE name = 'Wild Harmony'), '/src/assets/album3.jpg', 2023),
  ('Street Vibes', (SELECT id FROM public.artists WHERE name = 'Urban Flow'), '/src/assets/album4.jpg', 2024),
  ('Midnight City', (SELECT id FROM public.artists WHERE name = 'Various Artists'), '/src/assets/album1.jpg', 2024),
  ('Future Bass', (SELECT id FROM public.artists WHERE name = 'Electronic Collective'), '/src/assets/album2.jpg', 2024),
  ('Acoustic Sessions', (SELECT id FROM public.artists WHERE name = 'Indie Artists'), '/src/assets/album3.jpg', 2023),
  ('Hip Hop Now', (SELECT id FROM public.artists WHERE name = 'Various Artists'), '/src/assets/album4.jpg', 2024);

INSERT INTO public.songs (title, artist_id, album_id, duration_seconds) VALUES
  ('Sunset Dreams', (SELECT id FROM public.artists WHERE name = 'Ambient Collective'), (SELECT id FROM public.albums WHERE title = 'Sunset Dreams'), 240),
  ('Digital Frontier', (SELECT id FROM public.artists WHERE name = 'Cyber Pulse'), (SELECT id FROM public.albums WHERE title = 'Digital Frontier'), 210),
  ('Forest Tales', (SELECT id FROM public.artists WHERE name = 'Wild Harmony'), (SELECT id FROM public.albums WHERE title = 'Forest Tales'), 195),
  ('Street Vibes', (SELECT id FROM public.artists WHERE name = 'Urban Flow'), (SELECT id FROM public.albums WHERE title = 'Street Vibes'), 220),
  ('Late Night Jazz', (SELECT id FROM public.artists WHERE name = 'The Midnight Quartet'), NULL, 280),
  ('Electronic Dreams', (SELECT id FROM public.artists WHERE name = 'Synth Master'), NULL, 200);