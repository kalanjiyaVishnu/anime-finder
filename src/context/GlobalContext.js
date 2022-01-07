import { useReducer, useEffect, useState, createContext } from "react";
import appReducer from "./appReducer";
const initialState = {
  watched: localStorage.getItem("watched")
    ? JSON.parse(localStorage.getItem("watched"))
    : [],
  watchList: localStorage.getItem("watchList")
    ? JSON.parse(localStorage.getItem("watchList"))
    : [],
};
// watchList: localStorage.getItem("watchList")
//   ? JSON.parse(localStorage.getItem("watchList"))
//   : [],

export const GlobalContext = createContext(initialState);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(state.watchList));
    localStorage.setItem("watched", JSON.stringify(state.watched));
  }, [state]);
  const addToWatchList = (anime) => {
    dispatch({ type: "ADD_MOVIES_TO_WATCHLIST", payload: anime });
    return true;
  };
  const removeFromWatchList = (id) => {
    return dispatch({ type: "REMOVE_FROM_WATCHLIST", payload: id });
  };
  return (
    <GlobalContext.Provider
      value={{
        name: "shit",
        addToWatchList,
        removeFromWatchList,
        watchList: state.watchList,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
