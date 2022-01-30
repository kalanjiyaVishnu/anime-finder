import { Fragment, useEffect, useState } from "react";
import { Transition, Listbox } from "@headlessui/react";
import { db } from "../lib/firebase";
import { SelectorIcon, ReplyIcon } from "@heroicons/react/solid";
import {
  ChevronDoubleUpIcon,
  ChevronDoubleDownIcon,
} from "@heroicons/react/outline";

import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import Tooltips from "./Tooltips";
import { addToComments } from "../services/firebase";

const AdditionalComp = ({ showModel, userID, animeID, PhotoURL }) => {
  const [episodeName, setEpisodeName] = useState("");
  const [desc, setDesc] = useState("");
  const [rating, setRating] = useState("");
  const [showCMT, setShowCMT] = useState(false);
  let isInValidComment = !episodeName || !desc || !rating;
  const handleComment = (e) => {
    e.preventDefault();
    if (isInValidComment) {
      alert("fill the fields");
    } else {
      const comment = {
        userID,
        PhotoURL,
        animeID,
        episodeName,
        desc,
        rating,
        repllies: [],
      };
      addToComments(comment);
    }
  };
  return (
    <Transition
      as={Fragment}
      show={showModel}
      enter="transform transition duration-[400ms]"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transform duration-200 transition ease-in-out"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="h-max mb-28 md:mb-40 mt-4 ">
        <div className="flex items-center ">
          <h1 className="font-semibold text-xl ">
            {"Comments" || "How was the anime"}
          </h1>

          <Tooltips content={"add comment"}>
            <button className="ml-4" onClick={() => setShowCMT(!showCMT)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </Tooltips>
        </div>

        {showCMT && (
          <form
            className="flex gap-4 flex-col md:flex-row md:items-center mt-4 text-black w-full py-2"
            onSubmit={handleComment}
          >
            <div className="md:w-1/5  border-2 border-dotted border-gray-600 border-opacity-50 rounded-md">
              <input
                type="text"
                className="bg-transparent text-gray-800 focus:outline-none outline-none py-2 px-4"
                placeholder="episode"
                onChange={({ target: { value } }) => setEpisodeName(value)}
              />
            </div>
            <div className="w-full">
              <input
                type="text"
                placeholder="something about that episode"
                className="text-white-light rounded-md shadow-md py-2 px-4 bg-gradient-to-r from-purple-700 via-purple-600 to-purple-500 bg-opacity-40 placeholder-white-light
              focus:outline-none outline-none border-none hover:bg-opacity-5 w-full"
                onChange={({ target: { value } }) => setDesc(value)}
              />
            </div>
            <div className="flex w-full md:w-1/4">
              <div className="  w-full makeItTop">
                <ListBox on_Change={({ short }) => setRating(short)} />
              </div>
              <button onClick={handleComment} className="ml-4">
                <ChevronDoubleDownIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </form>
        )}
        <CommentSection
          animeID={animeID}
          showCMT={() => {
            setShowCMT(true);
          }}
        />
      </div>
    </Transition>
  );
};
export default AdditionalComp;
function ListBox({ on_Change }) {
  const ratings = [
    { name: "Awesome", short: "🙆‍♀️" },
    { name: "super cool", short: "💥" },
    { name: "animated as fuck", short: "🤐" },
    { name: "god tier", short: "😮" },
    { name: "first aid", short: "😖" },
    { name: "romantic", short: "🌹" },
  ];
  const [selected, setSelected] = useState(ratings[0]);

  return (
    <div className="w-full">
      <Listbox
        value={selected}
        onChange={(ratingName) => {
          setSelected(ratingName);
          on_Change(ratingName);
        }}
      >
        <div className="relative mt-1 ">
          <Listbox.Button className="relative bg-gray-100 w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 border border-opacity-25 border-gray-800 sm:text-sm ">
            <span className="whitespace-nowrap min- fit">{selected.name}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className="absolute bg-gray-100 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm
              border border-opacity-25 border-gray-800 
              "
            >
              {ratings.map((rating, index) => (
                <Listbox.Option
                  key={index + rating.name}
                  className={({ active }) =>
                    `${
                      active
                        ? "text-amber-900 bg-amber-100 bg-gray-200"
                        : "text-gray-900"
                    }
                            cursor-default select-none relative py-2 px-4`
                  }
                  value={rating}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? "font-medium" : "font-normal"
                        } block w-full h-full min-w-fit truncate`}
                      >
                        {rating.name}
                      </span>
                      {/* {selected ? (
                          <span
                            className={`${
                              active ? "text-amber-600" : "text-amber-600"
                            }
                                  absolute inset-y-0 left-0 flex items-center pl-3`}
                          >
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null} */}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

function CommentSection({ animeID, showCMT }) {
  const [comments, setComments] = useState([]);
  const [showReply, setshowReply] = useState(false);
  const [reply, setreplie] = useState("");
  useEffect(() => {
    const q = query(
      collection(db, "comments"),
      where("animeID", "==", animeID)
    );
    onSnapshot(q, (snapShot) => {
      setComments(
        snapShot.docs.map((doc) => ({
          docid: doc.id,
          ...doc.data(),
        }))
      );
    });
    if (!(comments.length > 0)) {
      showCMT();
    }
  }, []);

  return (
    <div className="h-max">
      {comments.length > 0 ? (
        <main className="mb-32">
          {comments.map((comment) => (
            <Comment {...comment} sendReply={() => {}} />
          ))}
        </main>
      ) : (
        <div></div>
      )}
    </div>
  );
}

const Comment = ({
  episodeName,
  desc,
  rating,
  PhotoURL,
  docid,
  repllies,
  sendReply,
  userID,
}) => {
  const [showReply, setshowReply] = useState(false);
  const [reply, setrepliy] = useState("");
  const handleReply = async ({ key }) => {
    if (reply && key == "Enter") {
      if (!reply.trim) {
        return;
      } else {
        setrepliy("");
        await updateDoc(doc(db, "comments", docid), {
          repllies: [...repllies, { reply, userID }],
        });
      }
    }
  };
  return (
    <div
      className={`flex gap-4  flex-col items-center mt-4 text-black w-full py-2 justify-center h-auto relative ${
        repllies.length > 0 && "group"
      }`}
      key={docid}
    >
      <div className="w-full">
        <div className="w-full flex items-center">
          <div className="w-1/5 border-opacity-40 bg-gray-800 text-white-light shadow-sm   rounded-md py-2 px-4 border-b border-gray-800 ">
            {episodeName}
          </div>
          <div className="flex-1 py-2 px-4">{`${desc} - ${rating}`}</div>

          <div className="ml-auto items-center flex h-8 w-8 rounded-full overflow-hidden shadow-sm border-0 border-gray-700">
            {PhotoURL && (
              <img
                src={PhotoURL}
                alt="user PRofile "
                draggable={false}
                className="object-cover"
              />
            )}
          </div>
          <ReplyIcon
            onClick={() => setshowReply(!showReply)}
            className="w-5 h-5 cursor-pointer
          "
            aria-hidden="true"
          />
        </div>
        <div className="flex justify-between md:justify-center items-center w-full flex-1 flex-nowrap">
          {showReply && (
            <input
              type="text"
              className="bg-transparent border-b  md:flex block py-1 px-2 rounded-md border-gray-600 border-opacity-30 text-gray-800 font-normal cursor-text focus:outline-none outline-none "
              placeholder="you suck"
              onChange={({ target: { value } }) => {
                setrepliy(value);
              }}
              value={reply}
              onKeyUp={handleReply}
            />
          )}
        </div>
      </div>

      {repllies.length > 0 && (
        <div className="flex flex-shrink p-3 flex-col h-auto w-full  overflow-scroll bg-gray-300  group-hover:flex rounded-md border-0 border-gray-700 border-opacity-10 shadow-md md:mb-4 md:w-full">
          {repllies.map(({ reply }) => (
            <div className=" ">{"- " + reply}</div>
          ))}
        </div>
      )}
    </div>
  );
};
