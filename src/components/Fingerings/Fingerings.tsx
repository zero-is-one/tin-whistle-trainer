import { Interval } from "@tonaljs/tonal";

console.log();

export const Fingerings = ({
  note,
  baseNote,
  style,
}: {
  note: string;
  baseNote?: string;
  style?: React.CSSProperties;
}) => {
  const interval = Interval.get(Interval.distance(baseNote || "D5", note));
  const semitones = interval.semitones || 0;
  const fingering = fingerMap[semitones] + (semitones >= 12 ? "+" : "");
  const segments = 7;
  const gutter = 24;
  const strokeWidth = 10;
  const plusLineWidth = 20;

  if (!fingering || interval.semitones === undefined)
    return <>Unknown Fingering</>;

  return (
    <svg
      style={{ background: "#efefef", ...style }}
      width="100"
      height="400"
      viewBox={`0 0 100 ${100 * segments + (segments - 1) * gutter}`}
    >
      <defs>
        <linearGradient id="half">
          <stop offset="0%" stopColor="black" />
          <stop offset="50%" stopColor="black" />
          <stop offset="50%" stopColor="transparent" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="100%" height="100%" fill="#ddd" />
      <g strokeWidth={strokeWidth} stroke="black">
        {[...Array(segments)].map((e, i) => {
          const y = i * 100 + 50 + i * gutter;

          return (
            <g key={i}>
              {i !== segments - 1 ? (
                <circle
                  key={i}
                  cx="50"
                  cy={y}
                  r="45"
                  fill={
                    { o: "transparent", x: "black", "-": "black" }[
                      fingering.split("")[i]?.toLowerCase()
                    ] || "url(#half)"
                  }
                />
              ) : (
                <g>
                  {fingering.endsWith("+") && (
                    <>
                      <rect
                        x={50 - plusLineWidth / 2}
                        y={y - 50 + strokeWidth / 2}
                        fill="black"
                        height={100 - strokeWidth}
                        width={plusLineWidth}
                      />
                      <rect
                        width={100 - strokeWidth}
                        height={plusLineWidth}
                        x={0 + strokeWidth / 2}
                        y={y - strokeWidth}
                        fill="black"
                      />
                    </>
                  )}
                </g>
              )}
            </g>
          );
        })}
      </g>
    </svg>
  );
};

const fingerMap = [
  "------",
  "-----h",
  "-----o",
  "----ho",
  "----oo",
  "---ooo",
  "--Hooo",
  "--oooo",
  "-Hoooo",
  "-ooooo",
  "o--ooo",
  "oooooo",

  "o-----",
  "-----h",
  "-----o",
  "----ho",
  "----oo",
  "---ooo",
  "--o--o",
  "--oooo",
  "-o-ooo",
  "-ooooo",
  "o-o---",
  "ooo---",

  "o-----",
  null,
  "-----o",
  null,
  "----oo",
  "---ooo",
  null,
  "o----o",
  null,
  "-ooooo",
  null,
  "oooooo",
];
