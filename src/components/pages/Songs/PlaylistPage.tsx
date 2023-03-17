import { usePlaylistManager } from "hooks/usePlaylistManager";
import { PlayerPage } from "./PlayerPage";
import { useSongs } from "hooks/useSongs";
import { PlaylistItem } from "types";

export const PlaylistPage = ({ changePage }: { changePage: Function }) => {
  const { songs } = useSongs();
  const {
    playlist,
    createItem,
    updateItem,
    deleteItem,
    sortByRandom,
    sortByLastPlayed,
    sortBySongIndex,
  } = usePlaylistManager();

  const displaySongs = [
    ...playlist.items.map((i) => songs[i.songIndex]),
    ...songs.filter(
      (s) => !playlist.items.find((i) => i.songIndex === s.index)
    ),
  ];

  return (
    <div className="page" style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          border: "1px solid #0E172C",
          background: "#0E172C",
          justifyContent: "space-between",
          display: "flex",
        }}
      >
        <button
          onClick={() => {
            changePage(PlayerPage);
          }}
        >
          🔙
        </button>
        <div>
          <span style={{ color: "white" }}>order: </span>
          <button
            style={{ minWidth: 60, marginRight: 4 }}
            onClick={sortByLastPlayed}
          >
            ⏲
          </button>
          <button
            style={{ minWidth: 60, marginRight: 4 }}
            onClick={sortBySongIndex}
          >
            ⤵️
          </button>
          <button onClick={sortByRandom}>🔀</button>
        </div>
      </div>
      <div style={{ overflow: "auto", width: "100%", height: " 100%" }}>
        <ul style={{ overflow: "auto", width: "100%", height: " 100%" }}>
          {displaySongs.map((song, index) => {
            const playlistItem = playlist.items.find(
              (i) => i.songIndex === song.index
            );

            const daysSincePlayed = Math.round(
              (Date.now() - (playlistItem?.lastPlayedTimestamp || 0)) /
                (1000 * 3600 * 24)
            );

            return (
              <li
                key={song.index}
                style={{
                  background: playlistItem ? "#c9ffc9" : "",
                  cursor: "pointer",
                  fontWeight: playlistItem ? "bold" : "normal",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span
                  onClick={() =>
                    playlistItem ? deleteItem(playlistItem) : createItem(song)
                  }
                  style={{
                    padding: 5,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "80vw",
                    display: "block",
                  }}
                >
                  {`${playlistItem ? "☑ " : "☐ "}`}
                  {playlistItem && (
                    <span>
                      {index + 1}.
                      {daysSincePlayed > 10000 ? "" : ` 📅${daysSincePlayed}`}
                    </span>
                  )}{" "}
                  {song.title}
                </span>
                <span
                  style={{ minWidth: "6vw", textAlign: "center" }}
                  onClick={() =>
                    updateItem({
                      ...(playlistItem as PlaylistItem),
                      isFavorite: !playlistItem?.isFavorite,
                    })
                  }
                >{`${playlistItem?.isFavorite ? "★" : "☆"}`}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
