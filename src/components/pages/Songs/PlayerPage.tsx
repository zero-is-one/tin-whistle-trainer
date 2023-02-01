import { useState, useRef } from "react";
import ReactPlayer from "react-player";
import BaseReactPlayer from "react-player/base";
import { SheetMusicModal } from "./SheetMusicModal";
import { VideoSelectModal } from "./VideoSelectModal";
import { Video } from "types";
import { usePlaylistManager } from "hooks/usePlaylistManager";
import { PlaylistPage } from "./PlaylistPage";

export const PlayerPage = ({ changePage }: { changePage: Function }) => {
  const {
    playheadItem,
    next,
    previous,
    updateItem,
    playheadSong: song,
    playheadIndex,
    playlist,
  } = usePlaylistManager();
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(-1);
  const [playing, setPlaying] = useState(false);

  const playerRef = useRef<BaseReactPlayer<any>>(null);
  const [showSheetMusic, setShowSheetMusic] = useState(false);
  const [showVideoSelect, setShowVideoSelect] = useState(false);
  const [loop, setLoop] = useState([-1, -1]);

  const onVideoSelect = (video: Video) => {
    setShowVideoSelect(false);
    if (!playheadItem) return;
    updateItem({ ...playheadItem, videoUrl: video.url });
  };

  const onProgress = (e: { playedSeconds: number }) => {
    setProgress(e.playedSeconds);
    if (loop[1] !== -1) {
      if (e.playedSeconds > loop[1]) {
        seekTo(loop[0]);
      }
      if (e.playedSeconds < loop[0]) {
        seekTo(loop[0]);
      }
      return;
    }

    setProgress(e.playedSeconds);
  };

  const seekTo = (position: number) => {
    playerRef.current?.seekTo(position, "seconds");
    setProgress(position);
  };

  const setLoopHead = () => {
    if (loop[0] === -1) {
      setLoop([progress, -1]);
    } else if (loop[1] === -1) {
      setLoop([loop[0], progress]);
    } else {
      setLoop([-1, -1]);
    }
  };

  return (
    <>
      {showSheetMusic && song && (
        <SheetMusicModal
          abc={song.abc}
          close={() => setShowSheetMusic(false)}
        />
      )}

      {showVideoSelect && song && (
        <VideoSelectModal song={song} onSelect={onVideoSelect} />
      )}

      <div
        className="page col"
        style={{
          gridTemplateRows: "1fr 1fr 1fr 1fr",
        }}
      >
        <div
          className="button-row"
          style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr" }}
        >
          {[0.5, 0.75, 0.9, 1].map((playbackRate, index) => (
            <button
              key={playbackRate}
              className={` ${
                playheadItem?.playbackRate === playbackRate && "active"
              } `}
              onClick={() => {
                if (!playheadItem) return;
                updateItem({ ...playheadItem, playbackRate });
              }}
            >
              {["🐌", "🐢", "🐏", "🐇"][index]}
              <br />
              {`${playbackRate}`.replace("0.", ".")}
            </button>
          ))}
        </div>
        <div
          className="button-row"
          style={{ gridTemplateColumns: "1fr 1fr 2fr 1fr" }}
        >
          <button onClick={setLoopHead}>
            🔁
            {loop[0] !== -1 && (
              <p style={{ fontSize: 18, fontFamily: "monospace" }}>
                {Math.floor(loop[0])}:
                <span className={loop[1] === -1 ? "blink" : ""}>
                  {loop[1] === -1 ? Math.floor(progress) : Math.floor(loop[1])}
                </span>
              </p>
            )}
          </button>

          <button onClick={() => seekTo(progress - 1)}>
            🕖
            <br /> -1
          </button>
          <button
            onClick={() => setPlaying(!playing)}
            className={` ${playing && "active"} `}
          >
            ⏯️
            <br />
            PLAY
          </button>
          <button onClick={() => seekTo(progress + 1)}>
            🕔
            <br /> +1
          </button>
        </div>

        <div
          className="button-row"
          style={{ gridTemplateColumns: "1fr 2fr 1fr" }}
        >
          <button onClick={previous}>⏪</button>
          <div>
            <p>
              {playheadIndex + 1}/{playlist.items.length} {song?.title}
            </p>
            <p style={{ fontFamily: "monospace" }}>
              ⏲ {Math.floor(progress)} : {duration}
            </p>
            <ReactPlayer
              style={{ height: 64, width: 48 }}
              playbackRate={playheadItem?.playbackRate}
              playing={playing}
              url={playheadItem?.videoUrl}
              width={"100%"}
              height={100}
              controls={false}
              progressInterval={100}
              onProgress={(e) => onProgress(e)}
              onDuration={(d) => setDuration(d)}
              onSeek={(s) => setProgress(s)}
              ref={playerRef}
              config={{
                youtube: {
                  playerVars: { modestbranding: 1, disablekb: 1 },
                },
              }}
            />
          </div>
          <button onClick={next}>⏩</button>
        </div>
        <div
          className="button-row"
          style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr" }}
        >
          <button onClick={() => setShowVideoSelect(!showVideoSelect)}>
            <div>📺</div>
            <div style={{ fontSize: 12 }}>{song?.videos.length}</div>
          </button>
          <button
            onClick={() =>
              playheadItem &&
              updateItem({
                ...playheadItem,
                isFavorite: !playheadItem.isFavorite,
              })
            }
          >
            {playheadItem?.isFavorite ? "★" : "☆"}
          </button>
          <button onClick={() => changePage(PlaylistPage)}>📻</button>
          <button onClick={() => setShowSheetMusic(true)}>🎼</button>
        </div>
      </div>
    </>
  );
};
