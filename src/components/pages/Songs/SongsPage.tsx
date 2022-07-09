import { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import BaseReactPlayer from "react-player/base";
import { useLocalStorage } from "react-use";
import { SheetMusicModal } from "./SheetMusicModal";
import { PlaylistModal } from "./PlaylistModal";
import songsJson from "assets/songs.json";

import { Tune, TuneSettings } from "./types";

const playbackRates = [0.25, 0.5, 0.75, 1];

export const SongsPage = () => {
  const [index, setIndex] = useState(0);
  const [tune, setTune] = useState<Tune>(songsJson[0]);
  const [settings, setSettings] = useState<TuneSettings | undefined>();
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(-1);
  const [playing, setPlaying] = useState(false);

  const playerRef = useRef<BaseReactPlayer<any>>(null);
  const [showSheetMusic, setShowSheetMusic] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [loop, setLoop] = useState([-1, -1]);

  useEffect(() => {
    const val: TuneSettings = JSON.parse(
      window.localStorage.getItem(`current-tune-settings-${index}`) || "null"
    ) || { videoIndex: 0, playbackRate: 1 };
    setSettings({ ...val, songIndex: index });
    setTune(songsJson[index]);
  }, [setSettings, index, setTune]);

  const updateSettings = (val: TuneSettings) => {
    setSettings({ ...val, songIndex: index });

    window.localStorage.setItem(
      `current-tune-settings-${index}`,
      JSON.stringify(val)
    );
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

  const onPlaylistSelect = (index: number) => {
    setShowPlaylist(false);
    if (!settings) return;
    updateSettings({ ...settings, videoIndex: index });
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

  if (!settings) return;

  return (
    <>
      {showSheetMusic && (
        <SheetMusicModal tune={tune} close={() => setShowSheetMusic(false)} />
      )}
      {showPlaylist && (
        <PlaylistModal tune={tune} onSelect={onPlaylistSelect} />
      )}

      <div
        className="page col"
        style={{
          gridTemplateRows: "1fr 2fr 1fr 1fr",
        }}
      >
        <div className="button-row">
          {playbackRates.map((playbackRate, index) => (
            <button
              key={playbackRate}
              className={` ${
                settings.playbackRate === playbackRate && "active"
              } `}
              onClick={() => {
                updateSettings({ ...settings, playbackRate });
              }}
            >
              {["🐌", "🐢", "🦙", "🐇"][index]}
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
          <button onClick={() => setShowPlaylist(true)}>📻</button>
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
          <button
            onClick={() =>
              setIndex(index - 1 < 0 ? songsJson.length - 1 : index - 1)
            }
          >
            ⏪
          </button>
          <div>
            <p>
              {index + 1}. {tune.title}
            </p>
            <p>{tune.videos[settings.videoIndex].source}</p>
            <p style={{ fontFamily: "monospace" }}>
              ⏲ {Math.floor(progress)} : {duration}
            </p>
            <ReactPlayer
              style={{ height: 64, width: 48 }}
              playbackRate={settings.playbackRate}
              playing={playing}
              url={`https://www.youtube.com/watch?v=${
                tune.videos[settings.videoIndex].youtubeId
              }`}
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
          <button
            onClick={() =>
              setIndex(index + 1 >= songsJson.length ? 0 : index + 1)
            }
          >
            ⏩
          </button>
        </div>
      </div>
    </>
  );
};
