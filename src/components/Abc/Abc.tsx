import { useEffect, useRef } from "react";
import abcjs from "abcjs";

export const Abc = ({
  abc,
  params,
}: {
  abc: string;
  params?: abcjs.AbcVisualParams;
}) => {
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl?.current && abcjs.renderAbc(inputEl.current, abc, params);
  }, [abc, params, inputEl]);

  return <div ref={inputEl}></div>;
};
