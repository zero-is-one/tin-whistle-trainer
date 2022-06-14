import { SongsPage } from "components/pages/Songs/SongsPage";
import { TutorPage } from "components/pages/Tutor/TutorPage";

import { Routes, Route, Link } from "react-router-dom";

const routes = [
  { path: "/", element: SongsPage, icon: "🎶", title: "Songs" },
  { path: "/tutor", element: TutorPage, icon: "🎤", title: "Tutor" },
];

export const App = () => {
  return (
    <div
      className="App"
      style={{ display: "grid", gridTemplateRows: "minmax(0, 1fr) 64px" }}
    >
      <div>
        <Routes>
          {routes.map((r) => {
            const Element = r.element as React.ElementType;
            return <Route key={r.path} path={r.path} element={<Element />} />;
          })}
        </Routes>
      </div>
      <nav>
        {routes.map((r) => (
          <Link key={r.path} to={r.path}>
            {r.icon}
            <br />
            {r.title}
          </Link>
        ))}
      </nav>
    </div>
  );
};
