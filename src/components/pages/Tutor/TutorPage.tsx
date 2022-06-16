import { useState } from "react";
import { useMicrophone } from "hooks/useMicrophone";
import { useMicPitchAndNote } from "hooks/useMicPitchAndNote";
import { Fingerings } from "components/Fingerings/Fingerings";
import { SingleMusicNote } from "components/SingleMusicNote/SingleMusicNote";
import { useCountdown } from "hooks/useCoutdown";
import { useSampler } from "hooks/useSampler";
import useLocalStorage from "use-local-storage";

export const TutorPage = () => {
  const { onClickActivateMicrophone, isRunning } = useMicrophone();
  const [sessionCardTypes, setSessionCardTypes] = useState(cardTypes);
  const [currentNote, setCurrentNote] = useState("");
  const [currentType, setCurrentType] = useState("");
  const { reset: resetCountdown, count } = useCountdown(5);
  const [cardsSeenCount, setCardsSeenCout] = useState(0);
  const [sightingsCount, setSightingsCount] = useState(0);
  const sightingsCountGoal = 20;

  const { sampler } = useSampler();

  useMicPitchAndNote((pitch, note) => {
    if (!currentNote) return;
    if (note !== currentNote) return;

    setSightingsCount((s) => s + 1);
    if (sightingsCount >= sightingsCountGoal) refreshCard();
  });

  const refreshCard = () => {
    resetCountdown();
    setSightingsCount(0);
    const opts = basicNotes.filter((c) => c !== currentNote);
    const randomNote = opts[Math.floor(Math.random() * opts.length)];
    setCurrentNote(randomNote);
    setCardsSeenCout((c) => c + 1);
    const randomCardType =
      sessionCardTypes[Math.floor(Math.random() * sessionCardTypes.length)];
    setCurrentType(randomCardType);

    if (randomCardType === "sound")
      sampler?.triggerAttackRelease([randomNote], 1);
  };

  return (
    <>
      <dialog open={!isRunning}>
        <button onClick={() => onClickActivateMicrophone()}>
          Allow Microphone Access
        </button>
      </dialog>

      {!currentNote && (
        <div className="page">
          Flashcard types:
          <ul>
            {cardTypes.map((type) => (
              <li key={type}>
                <label>
                  <input
                    name={type}
                    value={type}
                    type="checkbox"
                    id={`checkbox-types-${type}`}
                    checked={sessionCardTypes.includes(type)}
                    onChange={() => {
                      setSessionCardTypes(
                        sessionCardTypes.includes(type)
                          ? sessionCardTypes.filter((i) => i !== type)
                          : [...sessionCardTypes, type]
                      );
                    }}
                  />{" "}
                  {type}
                </label>
              </li>
            ))}
          </ul>
          <p>Play what you see or hear. </p>
          <button
            onClick={() => {
              refreshCard();
            }}
          >
            Start
          </button>
        </div>
      )}

      {currentNote && (
        <div
          className="page"
          style={{
            display: "grid",
            gridTemplateRows: "auto 1fr auto",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div>⌛ {count}</div>
            <div>{cardsSeenCount} 👓</div>
          </div>
          <div
            className="hide-clef"
            style={{
              marginTop: 5,
              display: "grid",
              gridTemplateColumns: "1fr",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            {count > 0 && currentType === "sound" && (
              <h1 style={{ fontSize: 60 }}>🔊</h1>
            )}

            {(count <= 0 || currentType === "note") && (
              <h1 onClick={refreshCard}>{currentNote}</h1>
            )}
            {count <= 0 && <Fingerings note={currentNote} />}
            {(count <= 0 || currentType === "sheet") && (
              <SingleMusicNote note={currentNote} />
            )}
          </div>
          <div
            style={{
              width: `${(100 / sightingsCountGoal) * sightingsCount}%`,
              height: 16,
              background: "#bada55",
              display: "block",
            }}
          ></div>
        </div>
      )}
    </>
  );
};

const cardTypes = ["sound", "sheet", "note"];

const basicNotes = [
  "D5",
  "E5",
  "F#5",
  "G5",
  "A5",
  "B5",
  "C#6",
  "D6",
  "E6",
  "F#6",
  "G6",
  "A6",
  "B6",
];
