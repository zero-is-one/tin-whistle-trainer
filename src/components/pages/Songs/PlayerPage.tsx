import { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import BaseReactPlayer from "react-player/base";
import { SheetMusicModal } from "./SheetMusicModal";
import { PlaylistModal } from "./PlaylistModal";
import songsJson from "assets/songs.json";

import { Song, PlaylistItem } from "types";
import { usePlaylistManager } from "hooks/usePlaylistManager";
import { PlaylistPage } from "./PlaylistPage";

export const PlayerPage = ({ changePage }: { changePage: Function }) => {
  const { playlistItem, setPlaybackRate, next, prev, song } =
    usePlaylistManager();
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(-1);
  const [playing, setPlaying] = useState(false);

  const playerRef = useRef<BaseReactPlayer<any>>(null);
  const [showSheetMusic, setShowSheetMusic] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [loop, setLoop] = useState([-1, -1]);

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

  const onPlaylistSelect = (index: number) => {
    // setShowPlaylist(false);
    // if (!settings) return;
    // updateSettings({ ...settings, videoIndex: index });
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
      {/* {showSheetMusic && (
        <SheetMusicModal tune={tune} close={() => setShowSheetMusic(false)} />
      )}
      {showPlaylist && (
        <PlaylistModal tune={tune} onSelect={onPlaylistSelect} />
      )} */}

      <div
        className="page col"
        style={{
          gridTemplateRows: "1fr 1fr 1fr 1fr",
        }}
      >
        <div
          className="button-row"
          style={{ gridTemplateColumns: "1fr 1fr 1fr" }}
        >
          {[0.5, 0.75, 1].map((playbackRate, index) => (
            <button
              key={playbackRate}
              className={` ${
                playlistItem?.playbackRate === playbackRate && "active"
              } `}
              onClick={() => {
                setPlaybackRate(playbackRate);
              }}
            >
              {["🐌", "🐢", "🐇"][index]}
              <br />
              {`${playbackRate}`.replace("0.", ".")}
            </button>
          ))}
        </div>

        <div
          className="button-row"
          style={{ gridTemplateColumns: "1fr 1fr 2fr 1fr" }}
        >
          <button onClick={() => seekTo(0)}>↺</button>
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
          style={{ gridTemplateColumns: "1fr 3fr 1fr" }}
        >
          <button onClick={() => changePage(PlaylistPage)}>📻</button>
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
          <button onClick={() => setShowSheetMusic(true)}>🎼</button>
        </div>

        <div
          className="button-row"
          style={{ gridTemplateColumns: "1fr 3fr 1fr" }}
        >
          <button onClick={prev}>⏪</button>
          <div>
            <p>{song?.title}</p>
            <p style={{ fontFamily: "monospace" }}>
              ⏲ {Math.floor(progress)} : {duration}
            </p>
            <ReactPlayer
              style={{ height: 64, width: 48 }}
              playbackRate={playlistItem?.playbackRate}
              playing={playing}
              url={playlistItem?.videoUrl}
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
      </div>
    </>
  );
};
