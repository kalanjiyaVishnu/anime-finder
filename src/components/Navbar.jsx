import { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import * as ROUTES from "../constansts/routes";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function NavBar({ handleSearch }) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [showSearch, setShowSearch] = useState(false);
  const Location = useLocation();

  let someThingNeedHidding =
    Location.pathname.startsWith("/anime") ||
    Location.pathname.startsWith("/search");
  const inputRef = useRef(null);
  useEffect(() => {
    console.log(document.body.clientWidth);
  }, []);

  // Location.pathname.toLowerCase().includes("search") &&
  //   inputRef.current.focus();
  return (
    <div
      className={`z-50  fixed inset-0 bg-cgray-700 transform transition-all duration-300 text-white-light h-16  flex items-center justify-between  px-16 makeItTop`}
    >
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        {!someThingNeedHidding &&
          (user ? (
            <div className="text-lg opacity-90 md:block hidden">
              Hello,{" "}
              <strong className="text-2xl font-semibold">
                {user.displayName}
              </strong>
            </div>
          ) : (
            <h1 className="font-medium text-2xl">sideEffects</h1>
          ))}
        {(someThingNeedHidding || document.body.clientWidth < 600) && (
          <h1 className="font-medium text-2xl">sideEffects</h1>
        )}
      </div>
      <div className="flex items-center px-2">
        {Location.pathname === "/search" && (
          <input
            type="text"
            placeholder="one piece.."
            className={`appearance-none md:block 
              rounded py-2 px-4 text-gray-800 w-auto focus:outline-none focus:bg-white focus:border-gray-800 hover:bg-opacity-5 focus:border-opacity-50  placeholder-gray-800 transform transition-colors duration-300 mr-2 focus:bg-gray-300 ${
                !showSearch && "hidden"
              }`}
            onChange={handleSearch}
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
        {Location.pathname.length == 1 && (
          <Link to={"/about"}>
            <div className="opacity-40 hover:opacity-90 transform transition-all duration-150 ease-in-out mx-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </Link>
        )}
        {user ? (
          <Menu as="div" className="ml-3 relative">
            <div>
              <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src={user.photoURL}
                  alt=""
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="bg-white-dull origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none makeItTop z-50">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to={ROUTES.PROFILE}
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      <span>Your Profile</span>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/settings"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      <span>

                      Settings
                      </span>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={classNames(
                        active ? "bg-gray-100 cursor-pointer" : "",
                        "px-4 py-2 text-sm text-gray-700 w-full"
                      )}
                      onClick={async () => {
                        await signOut(auth);
                      }}
                    >
                      Sign out
                    </div>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        ) : (
          <div>
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
          </div>
        )}
      </div>
      
    </div>
  );
}

// {Location.pathname === "/" && (
//     <>
//       {/* <Link
//       to={ROUTES.LOGIN}
//       className="mx-2 text-cgray-lightest bg-green-best rounded-sm px-2 py-1 shadow-md transform hover:-translate-y-1 transition-all duration-200"
//     >
//       login
//     </Link>
//     <Link
//       to={ROUTES.REGISTER}
//       className="text-green-best transform hover:-translate-y-1 transition-all duration-200"
//     >
//       signup
//     </Link> */}
//     </>
//   ) && (
//     <Link
//       to="/profile"
//       className="opacity-40 hover:opacity-90 transform transition-all duration-150 ease-in-out px-2"
//     >
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="h-6 w-6"
//         viewBox="0 0 20 20"
//         fill="currentColor"
//       >
//         <path
//           fillRule="evenodd"
//           d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
//           clipRule="evenodd"
//         />
//       </svg>
//     </Link>
//   )}
