export interface Video {
  youtubeId: string;
  source: string;
}

export interface Tune {
  title: string;
  abc: string;
  videos: Video[];
}

export interface TuneSettings {
  videoIndex: number;
  playbackRate: number;
  songIndex: number;
}
