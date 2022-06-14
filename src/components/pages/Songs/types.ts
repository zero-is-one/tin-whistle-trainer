export interface Video {
  youtubeId: string;
  source: string;
}

export interface Tune {
  title: string;
  abc: string;
  videos: Video[];
}
