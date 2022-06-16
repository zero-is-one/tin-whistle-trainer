import { useState, useEffect, useRef } from "react";
import * as Tone from "tone";
import { useMicrophone } from "./useMicrophone";

export const useSampler = () => {
  const [loaded, setLoaded] = useState(false);
  const { isRunning } = useMicrophone();
  const sampler = useRef<Tone.Sampler | null>(null);
  const instrument = "whistle";

  useEffect(() => {
    if (!isRunning || sampler.current) return;

    sampler.current = new Tone.Sampler({
      urls: {
        A4: `soundfonts/${instrument}-mp3/A4.mp3`,
        A5: `soundfonts/${instrument}-mp3/A5.mp3`,
        D6: `soundfonts/${instrument}-mp3/D6.mp3`,
      },

      onload: () => {
        setLoaded(true);
      },
    }).toDestination();
  }, [isRunning, setLoaded, sampler.current]);

  return { sampler: sampler.current, loaded };
};
