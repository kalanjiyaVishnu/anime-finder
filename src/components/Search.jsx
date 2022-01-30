import Project from "./Project";
import { Loader } from "./Loader";
export default function Search({ searchres, isLoading, message }) {
  return (
    <>
    <br />
        <br />
      {!message && !isLoading ? (
        searchres.length > 0 ? (
          <div className="w-full">
            <div className="flex flex-col w-auto md:items-center md:flex-row flex-wrap -z-10`">
              {searchres.length > 0 &&
                searchres.map((each, index) => (
                  <Project details={each} key={index} />
                ))}
            </div>
          </div>
        ) : (
          <div>Try searching for something else..</div>
        )
      ) : message ? (
        <div>{message}</div>
      ) : (
        <Loader />
      )}
    </>
  );
}
