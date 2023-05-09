import { useState } from "react";
import { useSongs } from "./useSongs";
import { Playlist, PlaylistItem, Song } from "types";
import useLocalStorage from "use-local-storage";

export const usePlaylistManager = () => {
  const { songs } = useSongs();
  const [playlist, setPlaylist] = useLocalStorage<Playlist>("playlistv9", {
    items: [
      {
        ...getDefaultPlaylistItem(),
        songIndex: songs[0].index,
        videoUrl: songs[0].videos[0].url,
      },
    ],
  } as Playlist);

  const [playheadIndex, setPlayheadIndex] = useState<number>(0);
  const playheadItem = playlist.items[playheadIndex];
  const playheadSong = songs[playheadItem.songIndex];

  const updateItem = (item: PlaylistItem) => {
    const items = [...playlist.items];
    const index = playlist.items.findIndex((i) => i.id === item.id);
    items[index] = item;

    setPlaylist({ ...playlist, items });
  };

  const deleteItem = (item: PlaylistItem) => {
    const items = [...playlist.items].filter((i) => i.id !== item.id);
    setPlaylist({ ...playlist, items });
  };

  const createItem = (song: Song) => {
    const item: PlaylistItem = {
      ...getDefaultPlaylistItem(),
      songIndex: song.index,
      videoUrl: song.videos[0].url,
    };

    setPlaylist({ ...playlist, items: [...playlist.items, item] });
  };

  const movePlayhead = (dir: number) => {
    setPlayheadIndex(
      Math.min(Math.max(playheadIndex + dir, 0), playlist.items.length - 1)
    );
  };

  const next = () => {
    movePlayhead(1);
  };
  const previous = () => {
    movePlayhead(-1);
  };

  const sortByBest = () => {
    const faved = [...playlist.items.filter((i) => i.isFavorite)].sort(
      (a, b) => b.songIndex - a.songIndex
    );
    const unfaved = shuffle([
      ...playlist.items.filter((i) => !i.isFavorite),
    ]).sort(
      (a, b) => (a.lastPlayedTimestamp || 0) - (b.lastPlayedTimestamp || 0)
    );

    setPlaylist({ ...playlist, items: [...faved, ...unfaved] });
  };

  const sortBySongIndex = () => {
    const items = [...playlist.items].sort((a, b) => a.songIndex - b.songIndex);

    setPlaylist({ ...playlist, items });
  };

  const sortByLastPlayed = () => {
    const items = [...playlist.items].sort(
      (a, b) => (a.lastPlayedTimestamp || 0) - (b.lastPlayedTimestamp || 0)
    );

    setPlaylist({ ...playlist, items });
  };

  return {
    playlist,
    createItem,
    updateItem,
    deleteItem,
    sortBySongIndex,
    sortByBest,
    sortByLastPlayed,
    next,
    previous,
    playheadIndex,
    playheadItem,
    playheadSong,
  };
};

const getDefaultPlaylistItem = (): PlaylistItem => ({
  id: Math.random().toString(36).replace("0.", ""),
  isFavorite: false,
  songIndex: 0,
  videoUrl: "",
  playbackRate: 1,
  lastPlayedTimestamp: new Date(1).getTime(),
});

export function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
