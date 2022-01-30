import { Outlet, useLocation, useNavigate } from "react-router-dom";
import * as ROUTES from "../../constansts/routes";

import { useFetch } from "../../hooks/use-fetch";
import Projects from "../../components/Projects";
import Mock from "../../components/Mock";
import NavBar from "../../components/Navbar";

import addNew from "./addNew.png";
import { Transition } from "@headlessui/react";
export const Home = ({ handleSearch }) => {
  const loc = useLocation();

  let showMain = loc.pathname === "/";

  return (
    <div className="">
      <NavBar handleSearch={handleSearch} />

      <main className="h-screen  min-h-screen container md:max-w-screen-2xl w-5/6 mx-auto overflow-scroll">
        <Transition
          as={"div"}
          show={showMain}
          enter="transition-opacity duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <HomeTop />
          <Catagories
            type="trending"
            url="https://kitsu.io/api/edge/trending/anime"
          />
          <Catagories
            type="adventure"
            url="https://kitsu.io/api/edge/anime?filter[categories]=adventure"
          />
          <Catagories
            type="romance"
            url="https://kitsu.io/api/edge/anime?filter[categories]=romance"
          />
          <Catagories
            type="comedy"
            url="https://kitsu.io/api/edge/anime?filter[categories]=comedy"
          />
        </Transition>

        {!showMain && <Outlet />}
      </main>
    </div>
  );
};

const HomeTop = () => {
  const navigateTo = useNavigate();
  return (
    <div className="flex flex-col mb-4 w-full">
      <br />
      <main className="mx-auto text-center flex items-center justify-center max-h-40 group hover:scale-105 transform-gpu transition-all duration-150 shadow md:h-32 overflow-hidden rounded-md relative w-60  h-20 md:w-8/12 hover:cursor-pointer">
        <div
          className=" border-none bg-black absolute"
          onClick={() => {
            navigateTo(ROUTES.CREATE_NEW_PROJECT);
          }}
        >
          {/* <img src={addNew} alt="..." className="shadow rounded max-w-full h-auto align-middle border-none" /> */}
          {/* change the image i added just for the scale ++ -mt-16 for going bottom without margin it show the top part*/}
          <img
            src={addNew}
            alt="..."
            className="object-contain mt-0 opacity-75 sm:object-cover sm:-mt-20 group-hover:opacity-60 transform-gpu transition-opacity duration-150"
          />
        </div>
        <span className="text-white-light group-hover:text-sm text-xl transform transition-all duration-150">
          new Anime
        </span>
      </main>
      <div className="flex flex-nowrap  py-2 w-full  items-center">
        <p className="ml-auto px-1 text-xs text-opacity-30 italic">
          create <strong className="text-sm ">{"{your}"}</strong> own anime
        </p>
        {/* <Link to={"/create"} className="text-xs text-red-700 italic font-bold">
          join
        </Link> */}
      </div>
    </div>
  );
};
const Catagories = ({ type, url }) => {
  const [data, loading, error] = useFetch(url);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 text-opacity-90 my-4">
        {type}
      </h1>
      {loading ? (
        <Mock limit={[...new Array(8)].map(() => 0)} />
      ) : (
        <Projects
          data={{ feed: data, type: "live" }}
          refLink={ROUTES.Live_fet}
          isLoading={loading}
        />
      )}
    </div>
  );
};
