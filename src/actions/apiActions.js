import axios from "axios";
import {
  updateListAPI,
  deleteListAPI,
  getGenresAPI,
  getTopMoviesAPI,
  createListAPI,
  deleteMovieAPI,
  addMovieAPI,
  searchMoviesAPI,
  getRequestTokenAPI,
  getAccessTokenAPI,
  getAccountListsAPI,
  getListDataAPI
} from "../services/connection";
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
} from "./types";

export const deleteList = list_id => (dispatch, getState) => {
  return deleteListAPI(list_id, getState).then(
    dispatch({
      type: DELETE_LIST,
      payload: list_id
    })
  );
};

export const updateList = (obj, list_id) => (dispatch, getState) => {
  return updateListAPI(obj, list_id, getState).then(
    dispatch({
      type: UPDATE_LOCAL_TITLE,
      payload: [obj.name, list_id]
    })
  );
};

export const getGenres = () => dispatch => {
  getGenresAPI().then(res =>
    dispatch({
      type: SET_GENRES,
      payload: res.data
    })
  );
};
export const clearCheckList = () => dispatch => {
  dispatch({
    type: CLEAR_CHECK_LIST
  });
};
export const clearList = () => dispatch => {
  dispatch({
    type: CLEAR_LIST
  });
};

export const getTopRatedMovies = () => dispatch => {
  getTopMoviesAPI().then(res =>
    dispatch({
      type: GET_TOP_MOVIES,
      payload: res.data.results
    })
  );
};

export const createList = (name, desc) => (dispatch, getState) => {
  createListAPI(name, desc, getState).then(res => {
    if (res.status === 201) {
      dispatch({
        type: CREATE_NEW_LIST,
        payload: [name, res.data.id]
      });
    }
  });
};

export const deleteMovie = (listid, movie) => (dispatch, getState) => {
  deleteMovieAPI(listid, movie, getState).then(
    dispatch({
      type: DELETED_FROM_LIST,
      payload: listid
    })
  );
};

export const addMovie = (listid, movie) => (dispatch, getState) => {
  addMovieAPI(listid, movie, getState).then(res =>
    dispatch({
      type: ADDED_TO_LIST,
      payload: listid
    })
  );
};

export const clearMovies = () => ({
  type: CLEAR_MOVIES
});

export const searchMovies = query => (dispatch, getState) => {
  if (query.length > 2) {
    searchMoviesAPI(query).then(res =>
      dispatch({
        type: SEARCH_MOVIES,
        payload: res.data.results.slice(0, 9)
      })
    );
  }
};

export const getRequestToken = () => dispatch => {
  getRequestTokenAPI().then(res =>
    dispatch({
      type: GET_REQ_TOKEN,
      payload: res.data
    })
  );
};

export const getAccessToken = () => (dispatch, getState) => {
  getAccessTokenAPI(getState).then(res =>
    dispatch({
      type: GET_ACCESS_TOKEN,
      payload: res.data
    })
  );
};

export const getAccountLists = () => (dispatch, getState) => {
  getAccountListsAPI(getState)
    .then(res =>
      dispatch({
        type: GET_ACC_LISTS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: TOKEN_EXPIRED
      });
    });
};

export const getListData = id => (dispatch, getState) => {
  getListDataAPI(id, getState).then(res => {
    dispatch({
      type: GET_LIST_DATA,
      payload: res.data
    });
  });
};

export const checkAllLists = (query, movieid) => (dispatch, getState) => {
  const config = {
    headers: {
      Authorization: `bearer ${getState().api.accessToken}`,
      "Content-Type": "application/json"
    }
  };

  let URLPromises = query.map(listid => {
    return getData(
      `https://api.themoviedb.org/4/list/${listid}/item_status?media_id=${movieid}&media_type=movie`
    );
  });

  let response = Promise.all(URLPromises);

  function getData(URL) {
    return axios
      .get(URL, config)
      .then(res => {
        if (res.status === 200) {
          dispatch({
            type: ITEM_EXIST,
            payload: res.data.id
          });
        }
      })
      .catch(function(error) {});
  }
};
