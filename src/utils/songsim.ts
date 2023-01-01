import songsJson from "assets/songs.json";
import dSongsJson from "assets/DulahanIrelandSongs.json";

const stringSimilarity = require("string-similarity");

const clean = (s: string) => {
  return s
    .replace("the", "")
    .replace("The", "")
    .replace(", ", "")
    .replace(", The", "")
    .replace("jig", "")
    .replace("reel", "")
    .replace("Reel", "");
};

songsJson.map((s) => {
  const videos = s.videos;

  dSongsJson.forEach((d) => {
    const sim = stringSimilarity.compareTwoStrings(clean(d[0]), clean(s.title));

    if (sim < 0.7) return;

    console.log({
      d: clean(d[0]),
      s: clean(s.title),
      sim,
    });

    videos.push({ title: "Dulahan Ireland Songs", url: d[1] });
  });

  return { ...s, videos };
});

export const here = songsJson;
