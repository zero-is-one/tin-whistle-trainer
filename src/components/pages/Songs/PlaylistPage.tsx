import { usePlaylistManager } from "hooks/usePlaylistManager";
import { PlayerPage } from "./PlayerPage";

export const PlaylistPage = ({ changePage }: { changePage: Function }) => {
  const { songs, add, remove, hasSong, playlistItem } = usePlaylistManager();

  return (
    <div
      className="page"
      style={{
        gridTemplateRows: "1fr 4fr",
      }}
    >
      <div>
        <button
          onClick={() => {
            changePage(PlayerPage);
          }}
        >
          🔙
        </button>
      </div>
      <div style={{ overflow: "auto", width: "100%", height: " 100%" }}>
        <ul>
          {songs.map((s) => (
            <li
              key={s.id}
              style={{
                background: hasSong(s) ? "#c9ffc9" : "",
                cursor: "pointer",
                fontWeight: s.id === playlistItem?.songId ? "bold" : "normal",
              }}
              onClick={() => (hasSong(s) ? remove(s) : add(s))}
            >
              {`${hasSong(s) ? "☑" : "☐"}`} {s.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
