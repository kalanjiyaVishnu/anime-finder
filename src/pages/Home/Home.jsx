import { Link } from "react-router-dom";
import * as ROUTES from "../../constansts/routes";
import Projects from "../../components/Projects";
import { useFetch } from "../../hooks/use-fetch";
import { useContext, useEffect, useState } from "react";
import Mock from "../../components/Mock";
import { GlobalContext } from "../../context/GlobalContext";

export const Home = () => {
  const { name } = useContext(GlobalContext);
  console.log(name);
  return (
    <>
      <HomeTop />
      <Catagories type="trending" />
    </>
  );
};

const HomeTop = () => {
  return (
    <div className="w-full flex flex-col mb-4">
      <Link to={ROUTES.CREATE_NEW_PROJECT}>
        <div className="w-full rounded-md  border-2 border-black border-opacity-40 h-16 p-4 text-center text-cgray-heavy text-opacity-80 text-lg  hover:bg-cgray-700  hover:text-white-light font-medium overflow-hidden transform transition duration-200 hover:scale-105 antialiased">
          Add new
        </div>
      </Link>
      <div className="flex flex-nowrap  py-2 w-full ">
        <p className="ml-auto px-1 text-xs text-opacity-30 italic">
          import <strong className="text-sm ">{"{cowBoy}"}</strong> from Anime
        </p>
      </div>
    </div>
  );
};

const Catagories = ({ type }) => {
  const { State, loading, error } = useFetch(
    `https://kitsu.io/api/edge/${type.toLowerCase()}/anime`
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 text-opacity-90 my-4">
        Trending
      </h1>
      {loading ? (
        <Mock limit={[0, 1, 2]} />
      ) : (
        <Projects
          data={{ feed: State, type: "live" }}
          refLink={ROUTES.Live_fet}
          isLoading={loading}
        />
      )}
    </div>
  );
};
