import { useState } from "react";
import { PlaylistPage } from "./PlaylistPage";
import { PlayerPage } from "./PlayerPage";

export const SongsPage = () => {
  const [screen, setScreen] = useState(() => PlaylistPage);

  const changePage = (page: JSX.Element) => {
    return setScreen(() => page);
  };

  return (
    <>
      {screen === PlaylistPage && <PlaylistPage changePage={changePage} />}
      {screen === PlayerPage && <PlayerPage changePage={changePage} />}
    </>
  );
};
