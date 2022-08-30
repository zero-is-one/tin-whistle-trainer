import { useState, useEffect } from "react";
import songsJson from "assets/songs.json";
import { Song, Playlist, PlaylistItem } from "types";
import useLocalStorage from "use-local-storage";

export const usePlaylistManager = () => {
  const [playlist, setPlaylist] = useLocalStorage<Playlist>("playlist", []);
  const [playhead, setPlayhead] = useState(0);
  const songs = songsJson as Song[];
  const playlistItem = playlist[playhead];
  const song = songs.find((s) => s.id === playlistItem?.songId);

  const add = (song: Song) => {
    setPlaylist([
      ...playlist,
      { songId: song.id, videoUrl: song.videos[0].url, playbackRate: 1 },
    ]);
  };

  const remove = (song: Song) => {
    setPlaylist(playlist.filter((s) => s.songId !== song.id));
  };

  const hasSong = (song: Song) => {
    return !!playlist.find((s) => s.songId === song.id);
  };

  const setPlaybackRate = (rate: number) => {};

  const next = () => {};
  const prev = () => {};

  return {
    playlist,
    songs,
    song,
    add,
    hasSong,
    remove,
    playlistItem,
    setPlaybackRate,
    next,
    prev,
  };
};
