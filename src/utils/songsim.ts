import songsJson from "assets/songs.json";
import dSongsJson from "assets/hataosongs.json";

const stringSimilarity = require("string-similarity");

const clean = (s: string) => {
  return s
    .replace("the", "")
    .replace("The", "")
    .replace(", ", "")
    .replace(", The", "")
    .replace("jig", "")
    .replace("reel", "")
    .replace("Reel", "")
    .replace("Polka", "")
    .replace("polka", "");
};

songsJson.map((s) => {
  const videos = s.videos;

  dSongsJson.forEach((d: any) => {
    const sim = stringSimilarity.compareTwoStrings(
      clean(d.title),
      clean(s.title)
    );

    if (sim < 0.43) return;

    console.log({
      d: clean(d.title),
      s: clean(s.title),
      sim,
    });

    videos.push({ title: "Hatao Songs", url: d.url });
  });

  return { ...s, videos };
});

export const here = songsJson;
