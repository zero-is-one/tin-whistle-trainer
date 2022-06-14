import { Tune } from "./types";

export const PlaylistModal = ({
  tune,
  onSelect,
}: {
  tune: Tune;
  onSelect: any;
}) => {
  return (
    <dialog open>
      {tune.videos.map((v, index) => (
        <button
          key={v.youtubeId}
          style={{
            display: "block",
            width: "100%",
            marginBottom: 8,
            fontSize: 40,
          }}
          onClick={() => {
            onSelect(index);
          }}
        >
          {v.source}
        </button>
      ))}
    </dialog>
  );
};
