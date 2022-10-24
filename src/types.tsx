export interface Video {
  url: string;
  title: string;
  duration?: number;
  authorName?: string;
}

export interface Song {
  id: string;
  title: string;
  abc: string;
  videos: Video[];
}

export interface PlaylistItem {
  id: string;
  songId: string;
  videoUrl: string;
  playbackRate: number;
  isFavorite: boolean;
  isSelected: boolean;
  index: number;
}

export interface Playlist {
  items: PlaylistItem[];
}
