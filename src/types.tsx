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
  songId: string;
  videoUrl: string;
  playbackRate: number;
}

export type Playlist = PlaylistItem[];
