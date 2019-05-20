import {
  GET_REQ_TOKEN,
  START_SESSION,
  FETCH_POSTS,
  NEW_POST,
  FETCH_CFG,
  FETCH_METER,
  ITEMS_LOADING,
  GET_ACCESS_TOKEN,
  GET_ACC_LISTS,
  TOKEN_EXPIRED,
  GET_LIST_DATA,
  SEARCH_MOVIES,
  CLEAR_MOVIES,
  GET_ALL_LISTS_DATA,
  ITEM_EXIST,
  CREATE_NEW_LIST,
  CLEAR_CHECK_LIST,
  ADDED_TO_LIST,
  DELETED_FROM_LIST,
  LOADING_DATA,
  GET_TOP_MOVIES,
  SET_GENRES,
  UPDATE_LOCAL_TITLE,
  DELETE_LIST,
  CLEAR_LIST
} from "../actions/types";

const initialState = {
  reqToken: null,
  sessionToken: null,
  accessToken: localStorage.getItem("token"),
  account_id: localStorage.getItem("account_id"),
  isAuth: false,
  tempToekn: null,
  lists: [],
  topMovies: null,
  listData: null,
  moviesLists: [],
  tokenExp: false,
  movies: [],
  itemExist: [],
  isLoading: false,
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
    case LOADING_DATA:
      return {
        ...state,
        isLoading: action.payload
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
      console.log("clean");
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
    case GET_ALL_LISTS_DATA:
      return {
        ...state,
        moviesLists: [...state.moviesLists, action.payload.data]
      };
    case CLEAR_MOVIES:
      return {
        ...state,
        movies: []
        // itemExist: [],
        //listData: null
      };
    case CLEAR_LIST:
      return {
        ...state,

        listData: null
      };
    case SEARCH_MOVIES:
      //console.log(action.payload);
      return {
        ...state,
        movies: action.payload
      };
    case GET_REQ_TOKEN:
      return {
        ...state,
        reqToken: action.payload
      };
    case START_SESSION:
      return {
        ...state,
        sessionToken: action.payload
      };
    case GET_ACCESS_TOKEN:
      console.log(action.payload);
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
        lists: data,
        isLoading: false
      };
    case TOKEN_EXPIRED:
      //console.log("reducer paima fetchposts payload");
      return {
        ...state,
        tokenExp: true
      };
    case GET_LIST_DATA:
      console.log(action.payload);
      return {
        ...state,
        tokenExp: false,
        listData: action.payload,
        isLoading: false
      };
    case FETCH_CFG:
      return {
        ...state,
        cfg: action.payload
      };
    case FETCH_METER:
      return {
        ...state,
        meterInfo: action.payload,
        loading: false
      };
    case ITEMS_LOADING:
      return {
        ...state,
        meterInfo: [],
        loading: true
      };
    default:
      return state;
  }
}
