import { Abc } from "components/Abc/Abc";

export const SheetMusicModal = ({ tune, close }: any) => {
  return (
    <dialog open style={{ textAlign: "center" }}>
      <Abc
        abc={tune.abc}
        params={{
          responsive: "resize",
          paddingbottom: 0,
          paddingleft: 0,
          paddingright: 0,
          paddingtop: 0,
        }}
      />
      <button onClick={close} style={{ margin: "auto" }}>
        close
      </button>
    </dialog>
  );
};
