import { useEffect, useRef } from "react";
import abcjs from "abcjs";

export const Abc = ({
  abc,
  params,
}: {
  abc: string;
  params?: abcjs.AbcVisualParams;
}) => {
  const ele = useRef(null);

  useEffect(() => {
    if (!ele?.current) return;
    console.log(ele?.current, abc, params);
    abcjs.renderAbc(ele.current, abc, params);
  }, [abc, params, ele]);

  return <div ref={ele}></div>;
};
