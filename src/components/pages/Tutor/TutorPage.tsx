import { useState } from "react";
import { useMicrophone } from "hooks/useMicrophone";
import { useMicPitchAndNote } from "hooks/useMicPitchAndNote";

export const TutorPage = () => {
  const { onClickActivateMicrophone, isRunning } = useMicrophone();
  const [currentCardTypes, setCurrentCardTypes] = useState(cardTypes);
  const [currentNote, setCurrentNote] = useState("");
  const [sightingsCount, setSightingsCount] = useState(0);
  const sightingsCountGoal = 100;

  // useMicPitchAndNote((pitch, note) => {
  //   if (!currentNote) return;
  //   if (note !== currentNote) return;

  //   setSightingsCount((s) => s + 1);
  //   if (sightingsCount >= sightingsCountGoal) refreshCard();
  // });

  const refreshCard = () => {
    console.log("here");
    setSightingsCount(0);
    setCurrentNote(basicNotes[Math.floor(Math.random() * basicNotes.length)]);
  };

  return (
    <>
      {/* <dialog open={!isRunning}>
        <button onClick={() => onClickActivateMicrophone()}>
          Allow Microphone Access
        </button>
      </dialog> */}

      <div className="page">
        {currentNote === "" && (
          <>
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
                      checked={currentCardTypes.includes(type)}
                      onChange={() => {
                        setCurrentCardTypes(
                          currentCardTypes.includes(type)
                            ? currentCardTypes.filter((i) => i !== type)
                            : [...currentCardTypes, type]
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
          </>
        )}
      </div>
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
