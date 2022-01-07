import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import * as ROUTES from "./constansts/routes";
import { Home } from "./pages/Home/Home";
import Error from "./components/Error";
import { data } from "./data";
import { useState } from "react";
import Search from "./components/Search";
import NavBar from "./components/Navbar";
import Anime from "./components/Anime";
import Profile from "./pages/Home/Profile";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { lazy } from "react";
import Register from './pages/Register'
// const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
function App() {
  const [searchRes, setsearches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("search for something");
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
    <main className="h-screen container md:max-w-screen-2xl w-5/6 mx-auto z-50">
      <NavBar handleSearch={handleSearch} />

      <Routes>
        <Route exact path={ROUTES.REGISTER} element={<Register />} />
        <Route exact path={ROUTES.LOGIN} element={<Login />} />

        <Route path="/" element={<Home />} />
        <Route
          path={ROUTES.search}
          element={
            <Search
              searchres={searchRes}
              isLoading={isLoading}
              message={message}
            />
          }
        ></Route>
        <Route path="/anime/:name/:id" element={<Anime />} />
        <Route path="/profile" element={<Profile />}>
          {" "}
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </main>
  );
}

export default App;
