import { Song } from "types";
import songsJson from "assets/songs.json";

export const useSongs = () => {
  const songs: Song[] = songsJson.map((song, index) => ({
    ...song,
    index,
  }));

  return { songs };
};
