import { useState, useEffect } from "react";
import songsJson from "assets/songs.json";
import { Playlist, PlaylistItem } from "types";
import useLocalStorage from "use-local-storage";

export const usePlaylistManager = () => {
  const [playlist, setPlaylist] = useLocalStorage<Playlist>("playlistv7", {
    items: [],
  } as Playlist);

  const [itemPlayheadId, setItemPlayheadId] = useState<string | null>();
  const itemPlayhead = playlist.items.find(
    (item) => item.id === itemPlayheadId
  );

  useEffect(() => {
    if (songsJson.length === playlist.items.length) return;

    const items = songsJson.map((song, index) => {
      const playlistItem = playlist.items?.[index];

      return {
        id: playlistItem?.id || Math.random().toString(36).replace("0.", ""),
        songId: song.id,
        videoUrl: playlistItem?.videoUrl || song.videos[0].url,
        playbackRate: playlistItem?.playbackRate || 1,
        isFavorite: playlistItem?.isFavorite || false,
        isSelected: playlistItem?.isSelected || false,
        index,
      };
    });

    setPlaylist({
      items,
    });
  }, []);

  useEffect(() => {
    if (playlist.items.length === 0 || itemPlayhead) return;
    setItemPlayheadId(playlist.items.filter((i) => i.isSelected)[0]?.id);
  }, [playlist, itemPlayhead]);

  const updateItem = (id: string, val: PlaylistItem) => {
    const items = [...playlist.items];
    const index = playlist.items.findIndex((i) => i.id === id);
    items[index] = val;

    setPlaylist({ ...playlist, items });
  };

  const movePlayhead = (dir: number) => {
    const items = playlist.items.filter((i) => i.isSelected);
    let index = items.findIndex((item) => item.id === itemPlayhead?.id) || 0;
    index += dir;
    index = Math.min(index, items.length - 1);
    index = Math.max(index, 0);
    setItemPlayheadId(items[index].id);
  };
  const next = () => {
    movePlayhead(1);
  };
  const previous = () => {
    movePlayhead(-1);
  };

  const randomizeItems = () => {
    const favs = [...playlist.items]
      .filter((i) => i.isFavorite)
      .filter((i) => i.isSelected)
      .sort((a, b) => b.index - a.index);

    const norms = shuffle(
      [...playlist.items]
        .filter((i) => !i.isFavorite)
        .filter((i) => i.isSelected)
    );

    const remaining = [
      ...playlist.items
        .filter((i) => !i.isSelected)
        .sort((a, b) => a.index - b.index),
    ];

    setPlaylist({ ...playlist, items: [...favs, ...norms, ...remaining] });
  };

  const sort = () => {
    const items = [...playlist.items].sort((a, b) => a.index - b.index);

    setPlaylist({ ...playlist, items });
  };

  const selectedPlaylistItems = playlist.items.filter((i) => i.isSelected);

  return {
    playlist,
    selectedPlaylistItems,
    sort,
    updateItem,
    next,
    previous,
    selectedPlaylistItemIndex: itemPlayhead
      ? selectedPlaylistItems.indexOf(itemPlayhead) + 1
      : 0,
    playlistItem: itemPlayhead,
    randomizeItems,
  };
};

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
