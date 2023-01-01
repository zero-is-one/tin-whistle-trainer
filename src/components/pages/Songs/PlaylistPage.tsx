import { usePlaylistManager } from "hooks/usePlaylistManager";
import { PlayerPage } from "./PlayerPage";
import songsJson from "assets/songs.json";

export const PlaylistPage = ({ changePage }: { changePage: Function }) => {
  const { playlist, updateItem, randomizeItems, sort } = usePlaylistManager();

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
        <button style={{ minWidth: 60 }} onClick={sort}>
          ↧
        </button>
        <button onClick={randomizeItems}>🔀</button>
      </div>
      <div style={{ overflow: "auto", width: "100%", height: " 100%" }}>
        <ul style={{ overflow: "auto", width: "100%", height: " 100%" }}>
          {playlist.items.map((item) => (
            <li
              key={item.id}
              style={{
                background: item.isSelected ? "#c9ffc9" : "",
                cursor: "pointer",
                fontWeight: item.isSelected ? "bold" : "normal",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span
                onClick={() =>
                  updateItem(item.id, {
                    ...item,
                    isSelected: !item.isSelected,
                  })
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
                {`${item.isSelected ? "☑ " : "☐ "}`}
                {item.index + 1}.{" "}
                {songsJson.find((i) => i.id === item.songId)?.title}
              </span>
              <span
                style={{ minWidth: "6vw", textAlign: "center" }}
                onClick={() =>
                  updateItem(item.id, {
                    ...item,
                    isFavorite: !item.isFavorite,
                  })
                }
              >{`${item.isFavorite ? "★" : "☆"}`}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
