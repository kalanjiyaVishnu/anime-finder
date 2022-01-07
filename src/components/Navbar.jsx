import { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import Logo_M from "./wd.png";
import * as ROUTES from "../constansts/routes";
import { FireBaseContext } from "../context/fireBaseContext";
import { useAuthState } from "react-firebase-hooks/auth";
export default function NavBar({ handleSearch }) {
  const Location = useLocation();
  const { firebase } = useContext(FireBaseContext);

  const [user] = useAuthState(firebase.auth());

  const [showSearch, setShowSearch] = useState(false);
  useEffect(() => {
    console.log(Location.pathname.length);
    if (Location.pathname.toLowerCase().includes("search")) {
      setShowSearch(true);
      inputRef.current.focus();
    }
  }, []);
  const inputRef = useRef(null);

  const getSearchClass = () => {
    return `bg-gray-400 appearance-none border-2 border-gray-800 bg-opacity-50
    border-opacity-5 rounded md:block py-2 px-4 text-gray-800  leading-tight focus:outline-none focus:bg-white focus:border-gray-800 hover:bg-opacity-5 focus:border-opacity-50 shadow-sm placeholder-gray-800 transform transition-colors duration-300 mr-2 w-1/2 ml-auto md:w-full ${
      !showSearch ? "hidden" : "focus:bg-gray-300"
    }`;
  };
  return (
    <div
      className={`w-full h-10 my-2 flex items-center mx-auto z-50 relative ${
        Location.pathname.startsWith("/anime") && "text-white-light"
      }`}
    >
      <div className="flex items-center">
        {/* <img src={Logo_M} className="w-16" alt="" /> */}

        {user ? (
          <div className="flex text-xl">
            <h1>Hello,</h1> <strong>{user.displayName}</strong>
          </div>
        ) : (
          <h1 className="font-medium text-2xl">Noted.</h1>
        )}
      </div>
      <div className="ml-auto flex items-center px-2">
        {!Location.pathname.startsWith("/anime") && (
          <div className="ml-auto flex items-center">
            {Location.pathname === "/search" && (
              <input
                type="text"
                placeholder="one piece.."
                className={getSearchClass()}
                onChange={(e) => handleSearch(e)}
                ref={inputRef}
              />
            )}

            {(Location.pathname.length == 1 ||
              Location.pathname.toLowerCase().includes("/search")) && (
              <Link
                to="/search"
                className=" opacity-40 hover:opacity-90 transform transition-all duration-150 ease-in-out"
                onClick={() => {
                  // if (inputRef) inputRef.current.focus();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 "
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            )}
          </div>
        )}
        {Location.pathname === "/" && (
            <>
              {/* <Link
              to={ROUTES.LOGIN}
              className="mx-2 text-cgray-lightest bg-green-best rounded-sm px-2 py-1 shadow-md transform hover:-translate-y-1 transition-all duration-200"
            >
              login
            </Link>
            <Link
              to={ROUTES.REGISTER}
              className="text-green-best transform hover:-translate-y-1 transition-all duration-200"
            >
              signup
            </Link> */}
            </>
          ) && (
            <Link
              to="/profile"
              className="opacity-40 hover:opacity-90 transform transition-all duration-150 ease-in-out px-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          )}
      </div>
    </div>
  );
}
