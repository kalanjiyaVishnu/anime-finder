import {
  useReducer,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";
import { db } from "../lib/firebase";
import appReducer from "./appReducer";

import { UserContext } from "./userContext";
import { collection, onSnapshot, query, where } from "firebase/firestore";
const initialState = {
  watched: [],
  watchList: [],
};

export const GlobalContext = createContext(initialState);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [loader, setLoader] = useState(true);
  const { user } = useContext(UserContext);
  useEffect(() => {
    //  getUserAnimes().then((anime_data) => {
    //   if (anime_data.length > 0) {
    //     setLoader(true);
    //     anime_data.map((each) => {
    //       addToWatchList(each.data);
    //     });
    //     setLoader(false);
    //   }
    // });
    if (user) {
      const q = query(collection(db, "anime"), where("userID", "==", user.uid));
      onSnapshot(q, (snapShot) => {
        getFirst(
          snapShot.docs.map((doc) => ({
            docid: doc.id,
            ...doc.data().data,
            userID: doc.data().userID,
          }))
        );
      });
    }
  }, []);
  const getFirst = (snapDATA) => {
    console.log("snapDATA", snapDATA);
    dispatch({ type: "GET_FIRST", payload: snapDATA });
    setLoader(false);
  };
  const addToWatchList = (anime) => {
    console.log(anime);
    dispatch({ type: "ADD_MOVIES_TO_WATCHLIST", payload: anime });
    return true;
  };
  const removeFromWatchList = (id) => {
    return dispatch({ type: "REMOVE_FROM_WATCHLIST", payload: id });
  };
  return (
    <GlobalContext.Provider
      value={{
        addToWatchList,
        removeFromWatchList,
        watchList: state.watchList,
        loader,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
