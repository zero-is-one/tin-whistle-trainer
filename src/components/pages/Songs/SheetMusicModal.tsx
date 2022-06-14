import { Abc } from "components/Abc/Abc";

export const SheetMusicModal = ({ tune, close }: any) => {
  return (
    <dialog open style={{ textAlign: "center" }}>
      <Abc abc={tune.abc} params={{ responsive: "resize" }} />
      <button onClick={close} style={{ margin: "auto" }}>
        close
      </button>
    </dialog>
  );
};
