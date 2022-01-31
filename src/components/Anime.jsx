import { useParams } from "react-router";
import { fetchSingle } from "../services/fetchData";

import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { FaHeart } from "react-icons/fa";
import {
  addToFireStore,
  removeFromFireStore,
  addToComments,
} from "../services/firebase";
import { UserContext } from "../context/userContext";
import { LoaderNew } from "./Loader";
import { Transition, Listbox } from "@headlessui/react";

import { db } from "../lib/firebase";
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import AdditionalComp from "./AdditionalComp";
export default function Anime({ addNew }) {
  const { id } = useParams();
  const { watchList, loader } = useContext(GlobalContext);
  const { user } = useContext(UserContext);
  const [eachAnime, setEachAnime] = useState({});
  const [isAdded, setIsAdded] = useState(false);
  const [isloading, setisloading] = useState(true);
  const [showHint, setShowHint] = useState(false);
  useEffect(() => {
    fetchSingle(`https://kitsu.io/api/edge/anime/${id}`).then((data) => {
      const isAnimeAdded = watchList.find(
        (local_anime) => local_anime.animeID === data.animeID
      );
      console.log("isAnimeAdded", isAnimeAdded);
      if (isAnimeAdded) {
        setEachAnime(isAnimeAdded);
      } else setEachAnime(data);

      if (isAnimeAdded) {
        // setEachAnime((old) => {
        //   setisloading(false);
        //   setIsAdded(true);
        // if (dummy) dummy.current.scrollIntoView({ behavior: "smooth" });
        //   return isAnimeAdded;
        // });
        setIsAdded(true);
      }
      setisloading(false);
    });
  }, [loader]);
  
  // bg-gradient-to-r from-purple-700 via-purple-600 to-purple-500
  return (
    <div className="h-max z-50 py-4 p-4 mt-24">
      {!isloading ? (
        <>
          <div className="z-40added flex md:flex-row w-full flex-col">
            {/* contains two section img and those other text and title */}
            <div
              className="w-48 md:w-1/6 rounded-md
        h-full overflow-hidden shadow-xl hover:scale-105 transform-gpu  transition-all duration-200 ease-in-out selector select-none "
            >
              <img
                src={
                  eachAnime.posterImage.original ||
                  eachAnime.posterImage.small ||
                  ""
                }
                alt={eachAnime.en || eachAnime.en_jp || ""}
                className="object-contain select-none"
              />
            </div>
            <div className="md:p-4 mt-4 md:mt-0 w-full  flex flex-col pop sm:text-cgray-heavy">
              <h1 className="text-2xl font-semibold  md:mx-2 truncate overflow-ellipsis">
                {`${eachAnime.head.en || eachAnime.head.en_jp}/${
                  eachAnime.head.ja_jp
                }`}
              </h1>

              <div className="flex flex-col mt-6">
                <BtnLight name={"info"} />

                <ul className="text-xl font-medium text-gray-800 list-disc ml-6 mt-3">
                  <li>{eachAnime.ageRating}</li>
                  {eachAnime.episode && <li>{eachAnime.episode}</li>}
                  <li>{eachAnime.status}</li>
                </ul>
              </div>
              <div className="flex flex-col mt-6 h-auto">
                <BtnLight name={"description"} />
                <p className="text-black mt-3">{eachAnime.description}</p>
              </div>
              <div className="flex mt-6 gap-4 text-white-light ">
                <div
                  className="bg-cgray-heavy rounded-md px-2 py-1 w-full sm:w-auto flex flex-nowrap shadow-md hover:bg-opacity-100 bg-opacity-95  whitespace-nowrap items-center
 hover:shadow-lg hover:-translate-y-0.5 transform-gpu transition-all duration-150 cursor-pointer border border-transparent border-opacity-10 relative group"
                  onClick={() => {
                    if (isAdded) {
                      // removeFromWatchList(eachAnime.id);
                      removeFromFireStore(eachAnime.docid);
                      console.log(eachAnime);
                      setIsAdded(false);
                    } else {
                      addToFireStore({ userID: user.uid, data: eachAnime });
                      // setIsAdded(addToWatchList(eachAnime));
                      setIsAdded(true);
                      setShowHint(true);
                    }
                  }}
                >
                  {!isAdded ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                  <p className="px-2 group">
                    {!isAdded ? "Start watching" : "added"}{" "}
                    {/* <span className=" absolute text-gray-800 top-3 -left-32 group-hover:opacity-40 group-hover:translate-y-0 transform transition-all translate-y-full opacity-0 hidden md:block">
                      click to remove
                    </span> */}
                    {isAdded && (
                      <div class="absolute transform -top-10 flex-col items-center hidden mb-6 group-hover:flex">
                        <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap dark:bg-black bg-white-light shadow-lg dark:text-white-light text-gray-900">
                          remove
                        </span>
                        <div class="w-3 h-3 -mt-2 rotate-45 dark:bg-black bg-white-light"></div>
                      </div>
                    )}
                  </p>
                </div>

                <BtnLight
                  name="wishlist"
                  icon={<FaHeart height={6} width={6} />}
                  onClick={() => alert("it dosnt work for now 🙂")}
                />
              </div>
            </div>
          </div>

          <AdditionalComp
            showModel={true}
            userID={user.uid}
            PhotoURL={user.photoURL}
            animeID={eachAnime.animeID}
          />
        </>
      ) : (
        <LoaderNew />
      )}

      <Transition
        as={Fragment}
        show={showHint}
        enter="transform transition duration-[400ms]"
        enterFrom="opacity-0 scale-95 translate-y-full"
        enterTo="opacity-100 scale-100 translate-y-0"
        leave="transform duration-200 transition ease-in-out"
        leaveFrom="opacity-100 scale-100 translate-y-0"
        leaveTo="opacity-0  translate-y-full"
      >
        <div className="w-full z-50 text-white-light fixed bottom-8 left-0 box-border ">
          <div
            className={`flex items-center  w-2/3 mx-auto py-4 px-2  md:w-3/5 bg-gray-800 rounded-md`}
          >
            <div className="bg-yellow-400 mx-2 rounded-sm px-2  text-gray-800">
              hint
            </div>
            <p className="">Added to List</p>
            <button
              className="ml-auto px-2"
              onClick={() => {
                setShowHint(false);
              }}
            >
              💀
            </button>
          </div>
          {setTimeout(() => {
            setShowHint(false);
          }, 6000)}
        </div>
      </Transition>
    
    </div>
  );
}

function BtnLight({ name, icon, onClick }) {
  return (
    <span
      className="w-full sm:w-auto flex items-center justify-center text-gray-800 font-medium bg-gray-800 bg-opacity-20 hover:bg-opacity-30 rounded-lg shadow-sm hover:shadow-lg py-3 px-5 border border-white border-opacity-10 transform-gpu hover:-translate-y-0.5 transition-all duration-150 space-x-2 cursor-pointer"
      onClick={onClick}
    >
      {icon}
      <p>{name}</p>
    </span>
  );
}
