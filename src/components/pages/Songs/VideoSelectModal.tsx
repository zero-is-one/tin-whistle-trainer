import { Song, Video } from "types";

export const VideoSelectModal = ({
  song,
  onSelect,
}: {
  song: Song;
  onSelect: (video: Video) => void;
}) => {
  return (
    <dialog open>
      {song.videos.map((v, index) => (
        <button
          key={v.title}
          style={{
            display: "block",
            width: "100%",
            marginBottom: 8,
            fontSize: 40,
          }}
          onClick={() => {
            onSelect(v);
          }}
        >
          {v.title}
        </button>
      ))}
    </dialog>
  );
};
