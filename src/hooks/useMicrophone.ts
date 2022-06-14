import { useEffect, useState } from "react";
import * as Tone from "tone";

export const useMicrophone = () => {
  const mic = new Tone.UserMedia();
  const analyser = new Tone.Analyser({ type: "waveform" });
  mic.connect(analyser);

  const [contextState, setContextState] = useState<string>(Tone.context.state);

  const onClickActivateMicrophone = async () => {
    await Tone.start();
    return mic.open().catch((e) => console.error(e));
  };

  useEffect(() => {
    if (Tone.context.state === "running") {
      onClickActivateMicrophone();
    }

    return () => {
      mic.close();
    };
  }, []);

  useEffect(() => {
    const cb = (state: string) => {
      setContextState(state);
    };

    Tone.context.on("statechange", cb);

    return () => {
      Tone.context.off("statechange", cb);
    };
  }, [setContextState]);

  return {
    onClickActivateMicrophone,
    isRunning: contextState === "running",
    mic,
    analyser,
  };
};
