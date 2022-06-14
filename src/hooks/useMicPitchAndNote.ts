import { useMicrophone } from "./useMicrophone";
import * as Pitchfinder from "pitchfinder";
import { useAnimationFrame } from "./useAnimationFrame";
import { fromFreqSharps } from "@tonaljs/note";

export const useMicPitchAndNote = (
  callback: (pitch: number, note: string) => void
) => {
  const { mic, analyser, isRunning } = useMicrophone();

  const detectPitch = Pitchfinder.ACF2PLUS({
    sampleRate: mic.context.sampleRate,
    //minFrequency: 73,
    //maxFrequency: 4699,
    //ratio: 5,
    //sensitivity: 0.1,
  });

  useAnimationFrame(isRunning, () => {
    const pitch = detectPitch(analyser.getValue() as Float32Array);

    const pitchWithinBounds = pitch && pitch < 4699 && pitch > 73;
    if (!pitch || !pitchWithinBounds) return;

    callback(pitch, fromFreqSharps(pitch));
  });
};
