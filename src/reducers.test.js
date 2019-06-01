import reducer from "./reducers/apiReducer";
import * as types from "./actions/types";

describe("Redux reducers: ", () => {
  describe("API reducer", () => {
    it("should return the initial state", () => {
      expect(reducer(undefined, {})).toEqual({
        reqToken: null,
        accessToken: localStorage.getItem("token"),
        account_id: localStorage.getItem("account_id"),
        isAuth: false,
        lists: [],
        topMovies: [],
        listData: null,
        tokenExp: false,
        movies: [],
        itemExist: [],
        genres: {}
      });
    });

    it("should handle SEARCH_MOVIES", () => {
      expect(
        reducer([], {
          type: types.SEARCH_MOVIES,
          payload: "Rambo is the best"
        })
      ).toEqual({
        movies: "Rambo is the best"
      });
    });

    it("should handle ADDED_TO_LIST", () => {
      const state = { itemExist: ["Jack Ass"] };
      expect(
        reducer(state, {
          type: types.ADDED_TO_LIST,
          payload: "Rambo"
        })
      ).toEqual({
        itemExist: ["Jack Ass", "Rambo"]
      });
    });
  });
});
