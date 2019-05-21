import {
  GET_REQ_TOKEN,
  GET_ACCESS_TOKEN,
  GET_ACC_LISTS,
  TOKEN_EXPIRED,
  GET_LIST_DATA,
  SEARCH_MOVIES,
  CLEAR_MOVIES,
  ITEM_EXIST,
  CREATE_NEW_LIST,
  CLEAR_CHECK_LIST,
  ADDED_TO_LIST,
  DELETED_FROM_LIST,
  GET_TOP_MOVIES,
  SET_GENRES,
  UPDATE_LOCAL_TITLE,
  DELETE_LIST,
  CLEAR_LIST
} from "../actions/types";

const initialState = {
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
};

export default function(state = initialState, action) {
  switch (action.type) {
    case DELETE_LIST:
      const newLists = state.lists.filter(item => {
        return item.id !== action.payload;
      });
      return {
        ...state,
        lists: newLists
      };
    case UPDATE_LOCAL_TITLE:
      const updatedLists = state.lists;
      updatedLists[
        updatedLists.findIndex(el => el.id === action.payload[1])
      ].name = action.payload[0];
      return {
        ...state,
        lists: updatedLists
      };
    case SET_GENRES:
      const genresMap = {};
      action.payload.genres.forEach(genre => {
        genresMap[genre.id] = genre;
      });
      return {
        ...state,
        genres: genresMap
      };
    case GET_TOP_MOVIES:
      return {
        ...state,
        topMovies: action.payload
      };
    case DELETED_FROM_LIST:
      const newList = state.itemExist.filter(item => {
        return item !== action.payload;
      });
      return {
        ...state,
        itemExist: newList
      };
    case ADDED_TO_LIST:
      return {
        ...state,
        itemExist: [...state.itemExist, action.payload]
      };
    case CLEAR_CHECK_LIST:
      return {
        ...state,
        itemExist: []
      };
    case CREATE_NEW_LIST:
      const newitem = {
        name: action.payload[0],
        id: action.payload[1],
        items: 0
      };
      return {
        ...state,
        lists: [...state.lists, newitem]
      };
    case ITEM_EXIST:
      return {
        ...state,
        itemExist: [...state.itemExist, action.payload]
      };
    case CLEAR_MOVIES:
      return {
        ...state,
        movies: []
      };
    case CLEAR_LIST:
      return {
        ...state,
        listData: null
      };
    case SEARCH_MOVIES:
      return {
        ...state,
        movies: action.payload
      };
    case GET_REQ_TOKEN:
      return {
        ...state,
        reqToken: action.payload
      };
    case GET_ACCESS_TOKEN:
      localStorage.setItem("token", action.payload.access_token);
      localStorage.setItem("account_id", action.payload.account_id);
      return {
        ...state,
        tokenExp: false,
        accessToken: action.payload.access_token,
        account_id: action.payload.account_id,
        isAuth: true
      };
    case GET_ACC_LISTS:
      const data = action.payload.results.map(item => ({
        name: item.name,
        id: item.id,
        items: item.number_of_items
      }));
      return {
        ...state,
        lists: data
      };
    case TOKEN_EXPIRED:
      return {
        ...state,
        tokenExp: true
      };
    case GET_LIST_DATA:
      return {
        ...state,
        tokenExp: false,
        listData: action.payload
      };

    default:
      return state;
  }
}
