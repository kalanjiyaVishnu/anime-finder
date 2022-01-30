import { useContext, useEffect, useState } from "react";

import { Routes, Route } from "react-router-dom";
import * as ROUTES from "./constansts/routes";
import Error from "./components/Error";

import { Home } from "./pages/Home/Home";
import Search from "./components/Search";
import Anime from "./components/Anime";
import Profile from "./pages/Home/Profile";
import Register from "./pages/Register";
import About from "./pages/About";
import { UserContext } from "./context/userContext";

// import { lazy } from "react";
// const Register = lazy(() => import("./pages/Register"));
// const Login = lazy(() => import("./pages/Login"));
function App() {
  const [searchRes, setsearches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("search for something");
  const { user } = useContext(UserContext);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!e.target.value) {
      setMessage("enter somethig");
      setsearches([]);
    } else {
      setIsLoading(true);
      fetch(`https://kitsu.io/api/edge/anime?filter[text]=${e.target.value}`)
        .then((res) => res.json())
        .then((data) => {
          return data.data.map(({ attributes, id }) => {
            // console.log(attributes);
            let head = {
              en: attributes.titles.en || "",
              en_jp: attributes.titles.en_jp || "",
              ja_jp: attributes.titles.ja_jp || "",
            };
            return {
              id,
              head,
              episode: attributes.episodeCount,
              seaFin: 3,
              status: attributes.status,
              type: attributes.showType,
              posterImage: attributes.posterImage,
              favoritesCount: attributes.favoritesCount,
            };
          });
        })

        .then((data) => {
          if (!data.errors) {
            setIsLoading(false);
            setMessage(null);
            setsearches((old) => {
              return data;
            });
          } else setMessage("Error while fetching the data");
        });
    }
  };
  return (
    <>
      {!user ? (
        <Register />
      ) : (
        <Routes>
          <Route path="/" element={<Home handleSearch={handleSearch} />}>
            <Route
              path={ROUTES.search}
              element={
                <Search
                  searchres={searchRes}
                  isLoading={isLoading}
                  message={message}
                />
              }
            />
            <Route path="/anime/:name/:id" element={<Anime />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      )}
    </>
  );
}

export default App;
