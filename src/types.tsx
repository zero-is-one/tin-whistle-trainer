export interface Video {
  url: string;
  title: string;
  duration?: number;
  authorName?: string;
}

export interface Song {
  index: number;
  title: string;
  abc: string;
  videos: Video[];
}

export interface PlaylistItem {
  id: string;
  songIndex: number;
  videoUrl: string;
  playbackRate: number;
  isFavorite: boolean;
  lastPlayedTimestamp: number;
}

export interface Playlist {
  items: PlaylistItem[];
}
