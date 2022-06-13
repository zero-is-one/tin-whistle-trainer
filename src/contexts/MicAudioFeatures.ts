export const here = "s";

// import React from "react";
// import { useImmer } from "use-immer";

// function useProviderValue() {
//   const [moved, setMoved] = React.useState(false);
//   const [point, setPoint] = useImmer<{
//     x: number;
//     y: number;
//   }>({ x: 0, y: 0 }); // using immer to illustrate that you can easily derive setPoint type instead of writing types for Context manually
//   const value = React.useMemo(
//     () => ({
//       moved,
//       setMoved,
//       point,
//       setPoint,
//     }),
//     [moved, point, setPoint]
//   );
//   return value;
// }

// export type Context = ReturnType<typeof useProviderValue>;

// const Context = React.createContext<Context | undefined>(undefined);
// Context.displayName = "Context";

// export const Provider: React.FC = (props) => {
//   const value = useProviderValue();
//   return <Context.Provider value={value} {...props} />;
// };

// export function useContext() {
//   const context = React.useContext(Context);
//   if (context === undefined) {
//     throw new Error(`useContext must be used within a Provider`);
//   }
//   return context;
// }

// export function useMoved() {
//   const { moved } = useContext();
//   return moved;
// }

// export function useListenMouseMove() {
//   const { setMoved, setPoint } = useContext();
//   const isMounted = React.useRef(false);
//   React.useEffect(() => {
//     isMounted.current = true;
//     const listen = (e: MouseEvent) => {
//       if (isMounted.current) {
//         setPoint((draft) => {
//           draft.x = e.x;
//           draft.y = e.y;
//         });
//         setMoved(true);
//       }
//     };
//     document.addEventListener("mousemove", listen);
//     return () => {
//       isMounted.current = false;
//       document.removeEventListener("mousemove", listen);
//     };
//   }, [setMoved, setPoint]);
//   return;
// }
