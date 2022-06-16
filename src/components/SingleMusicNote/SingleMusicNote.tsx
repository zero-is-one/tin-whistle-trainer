import { Abc } from "components/Abc/Abc";

import { scientificToAbcNotation } from "@tonaljs/abc-notation";

export const SingleMusicNote = ({
  note,
  flair = false,
}: {
  note: string;
  flair?: boolean;
}) => {
  const abcNote = scientificToAbcNotation(note).replace("^", "");

  const flairs = [1, 2, 4, 8];

  // http://trillian.mit.edu/~jc/music/abc/doc/ABCprimer.html
  // example is with alto recorder music, which historically has been
  // printed in two different octaves. In ABC terms, printers treat the
  // instrument's range as F,, ... g or F, ... g'. Such music, when
  // transcribed to ABC, can easily be printed in staff notation in
  // either octave by merely adding a middle=B or middle=b term to the
  // K: header line.

  const abc = `
    L:1/8
    K:C middle=b
    ${abcNote}${!flair ? 2 : flairs[Math.floor(Math.random() * flairs.length)]}
  `;

  return (
    <Abc
      abc={abc}
      params={{
        paddingbottom: 0,
        paddingleft: 0,
        paddingright: 0,
        paddingtop: 0,
        staffwidth: 80,
      }}
    />
  );
};

// Example abc notation
// `
// L:1/4
// K:C
// C, D, E, F,|G, A, B, C|D E F G|A B c d|e f g a|b c' d' e'|f' g' a' b'|]
// `
