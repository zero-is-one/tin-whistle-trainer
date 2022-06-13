import { SongbookPage } from "components/pages/SongbookPage";
import { Routes, Route, Link } from "react-router-dom";

const About = () => {
  return <div>about</div>;
};

const routes = [
  { path: "/", element: SongbookPage, icon: "🎶", title: "Book" },
  { path: "/about", element: About, icon: ":)", title: "About" },
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
            {r.title}
          </Link>
        ))}
      </nav>
    </div>
  );
};
