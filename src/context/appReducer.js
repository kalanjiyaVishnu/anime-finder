export default (state, action) => {
  switch (action.type) {
    case "GET_FIRST":
      return {
        ...state,
        watchList: action.payload,
      };
    case "ADD_MOVIES_TO_WATCHLIST":
      console.log("added to state");
      return { ...state, watchList: [action.payload, ...state.watchList] };
    case "REMOVE_FROM_WATCHLIST":
      console.log("removed from state");
      return {
        ...state,
        watchList: state.watchList.filter(
          (anime) => anime.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
