import axios from "axios";
import {
  GET_REQ_TOKEN,
  FETCH_POSTS,
  NEW_POST,
  FETCH_CFG,
  FETCH_METER,
  ITEMS_LOADING,
  START_SESSION,
  GET_ACCESS_TOKEN,
  GET_ACC_LISTS,
  TOKEN_EXPIRED,
  GET_LIST_DATA,
  SEARCH_MOVIES,
  CLEAR_MOVIES,
  GET_ALL_LISTS_DATA,
  ITEM_EXIST,
  ADD_MOVIE,
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
} from "./types";

const read_access_token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWU0MzQ0YmY3NTE2ZTQ5YTUxOWY3YjZmMmRmYjM5ZSIsInN1YiI6IjVjY2U3N2Q0MGUwYTI2MDk4MWZlYTM4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6gPt6m7QPQhdpLML4kqyfcM4okrelNYvwIsJyu1JasA";
const api_key = "cae4344bf7516e49a519f7b6f2dfb39e";
// export function fetchPosts(){
//     return function(dispatch){
//         fetch("https://jsonplaceholder.typicode.com/posts")
//         .then(res => res.json())
//         .then(data => dispatch({
//             type: FETCH_POSTS,
//             payload: data
//         }));
//     }
// }

// axios.defaults.headers.common = {
//   Authorization: `bearer ${read_access_token}`

// };

// export const updateLocalTitle = title => dispatch => {
//   dispatch({
//     action: UPDATE_LOCAL_TITLE,
//     payload: title
//   });
// };
export const deleteList = list_id => (dispatch, getState) => {
  const config = {
    headers: {
      Authorization: `bearer ${getState().api.accessToken}`,
      "Content-Type": "application/json"
    }
  };

  axios
    .delete(
      `https://api.themoviedb.org/4/list/${list_id}
      `,
      config
    )
    .then(
      dispatch({
        type: DELETE_LIST,
        payload: list_id
      })
    );
};

export const updateList = (obj, list_id) => (dispatch, getState) => {
  const config = {
    headers: {
      Authorization: `bearer ${getState().api.accessToken}`,
      "Content-Type": "application/json"
    }
  };

  axios
    .put(
      `https://api.themoviedb.org/4/list/${list_id}
      `,
      obj,
      config
    )
    .then(
      dispatch({
        type: UPDATE_LOCAL_TITLE,
        payload: [obj.name, list_id]
      })
    );
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
      .catch(function(error) {
        // return { success: false };
      });
  }
};

export const getGenres = () => dispatch => {
  axios
    .get(
      // `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=en-US&page=1`
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-US`
    )
    .then(res =>
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

// export const loading = item => dispatch => {
//   dispatch({
//     type: CLEAR_CHECK_LIST,
//     payload: item
//   });
// };
// function loading(item) {
//   return {
//     type: LOADING_DATA,
//     payload: item
//   };
// }

export const getTopRatedMovies = () => (dispatch, getState) => {
  axios
    .get(
      // `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=en-US&page=1`
      `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`
    )
    .then(res =>
      dispatch({
        type: GET_TOP_MOVIES,
        payload: res.data.results
      })
    );
};

export const createList = (name, desc) => (dispatch, getState) => {
  //console.log("adding movie");
  // console.log("access tokenas: ", getState().api.accessToken);
  // console.log("acc id: ", getState().api.account_id);
  const config = {
    headers: {
      Authorization: `bearer ${getState().api.accessToken}`,
      "Content-Type": "application/json"
    }
  };
  ///console.log(getState().api.account_id);
  //console.log(getState().api.reqToken.request_token);
  axios
    .post(
      `https://api.themoviedb.org/4/list`,
      {
        name: name,
        description: desc,
        iso_639_1: "en"
      },
      config
    )
    .then(
      res => {
        if (res.status === 201) {
          dispatch({
            type: CREATE_NEW_LIST,
            payload: [name, res.data.id]
          });
        }
        //console.log(res);
      }

      // dispatch({
      //   type: ADD_MOVIE,
      //   payload: movie.original_title
      // })
    );
};

export const deleteMovie = (listid, movie) => (dispatch, getState) => {
  // const data = {
  //   items: [
  //     {
  //       media_type: "movie",
  //       media_id: movie
  //     }
  //   ]
  // };
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${getState().api.accessToken}`,
  //     "Content-Type": "application/json;charset=utf-8"
  //   }
  // };

  // ///console.log(getState().api.account_id);
  // //console.log(getState().api.reqToken.request_token);
  // axios
  //   .delete(
  //     `https://api.themoviedb.org/4/list/${listid}/items
  //   `,

  //     {
  //       items: [
  //         {
  //           media_type: "movie",
  //           media_id: movie
  //         }
  //       ]
  //     },
  //     config
  //   )
  //   .then(res =>
  //     // dispatch({
  //     //   type: ADD_MOVIE,
  //     //   payload: movie.original_title
  //     // })

  //     console.log(res)
  //   );
  // console.log(data);

  fetch(`https://api.themoviedb.org/4/list/${listid}/items`, {
    method: "DELETE", // 'GET', 'PUT', 'DELETE', etc.
    body: `{
      "items": [
        {
          "media_type": "movie",
          "media_id": ${movie}
        }
      ]
    }`,
    headers: {
      Authorization: `Bearer ${getState().api.accessToken}`,
      "Content-Type": "application/json;charset=utf-8"
    }
  })
    .then(response => response.json())
    .then(
      /* res => console.log(res) */
      dispatch({
        type: DELETED_FROM_LIST,
        payload: listid
      })
    );
};

export const checkIfExists = (listid, movieid) => (dispatch, getState) => {
  //console.log("adding movie");
  // console.log("access tokenas: ", getState().api.accessToken);
  // console.log("acc id: ", getState().api.account_id);
  const config = {
    headers: {
      Authorization: `bearer ${getState().api.accessToken}`,
      "Content-Type": "application/json"
    }
  };
  ///console.log(getState().api.account_id);
  //console.log(getState().api.reqToken.request_token);
  axios
    .get(
      `https://api.themoviedb.org/4/list/${listid}/item_status?media_id=${movieid}&media_type=movie
      `,

      config
    )
    .then(res => {
      if (res.status === 200) {
        dispatch({
          type: ITEM_EXIST,
          payload: listid
        });
      }
    });

  // dispatch({
  //   type: ITEM_EXIST,
  //   payload: listid
  // })
};

///

export const getAllMovies = query => (dispatch, getState) => {
  const config = {
    headers: {
      Authorization: `bearer ${getState().api.accessToken}`,
      "Content-Type": "application/json"
    }
  };

  let URLPromises = query.map(URL => {
    return getData(`https://api.themoviedb.org/4/list/${URL}?page=1`);
  });

  let response = Promise.all(URLPromises);

  function getData(URL) {
    return axios
      .get(URL, config)
      .then(function(response) {
        dispatch({
          type: GET_ALL_LISTS_DATA,
          payload: response
        });
      })
      .catch(function(error) {
        console.log(error);
        return { success: false };
      });
  }
};

//

export const addMovie = (listid, movie) => (dispatch, getState) => {
  //console.log("adding movie");
  // console.log("access tokenas: ", getState().api.accessToken);
  // console.log("acc id: ", getState().api.account_id);
  const config = {
    headers: {
      Authorization: `bearer ${getState().api.accessToken}`,
      "Content-Type": "application/json"
    }
  };
  ///console.log(getState().api.account_id);
  //console.log(getState().api.reqToken.request_token);
  axios
    .post(
      `https://api.themoviedb.org/4/list/${listid}/items`,

      {
        items: [
          {
            media_type: "movie",
            media_id: movie
          }
        ]
      },
      config
    )
    .then(
      res =>
        dispatch({
          type: ADDED_TO_LIST,
          payload: listid
        })

      //console.log(res)
    );
};

export const clearMovies = () => ({
  type: CLEAR_MOVIES
});

export const searchMovies = query => (dispatch, getState) => {
  if (query.length > 3) {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&page=1&include_adult=false&query=${query}`
      )
      .then(res =>
        dispatch({
          type: SEARCH_MOVIES,
          payload: res.data.results.slice(0, 9)
        })
      );
  }
};

export const getRequestToken = () => (dispatch, getState) => {
  const config = {
    headers: {
      Authorization: `bearer ${read_access_token}`,
      "Content-Type": "application/json"
    }
  };
  //console.log(getState().api.lol);
  //console.log("fetching data");
  axios
    .post("https://api.themoviedb.org/4/auth/request_token", {}, config)
    .then(res =>
      dispatch({
        type: GET_REQ_TOKEN,
        payload: res.data
      })
    );
};

export const getAccessToken = () => (dispatch, getState) => {
  const config = {
    headers: {
      Authorization: `bearer ${read_access_token}`,
      "Content-Type": "application/json"
    }
  };
  //console.log(getState().api.reqToken.request_token);
  axios
    .post(
      "https://api.themoviedb.org/4/auth/access_token",
      {
        request_token: getState().api.reqToken.request_token
      },
      config
    )
    .then(res =>
      dispatch({
        type: GET_ACCESS_TOKEN,
        payload: res.data
      })
    );
};

export const getAccountLists = () => (dispatch, getState) => {
  //dispatch(loading("list"));
  // console.log("access tokenas: ", getState().api.accessToken);
  // console.log("acc id: ", getState().api.account_id);
  const config = {
    headers: {
      Authorization: `bearer ${getState().api.accessToken}`,
      "Content-Type": "application/json"
    }
  };
  ///console.log(getState().api.account_id);
  //console.log(getState().api.reqToken.request_token);
  axios
    .get(
      `https://api.themoviedb.org/4/account/${
        getState().api.account_id
      }/lists?page=1`,
      config
    )
    .then(res =>
      dispatch({
        type: GET_ACC_LISTS,
        payload: res.data
      })
    )

    // {const data = res.data.results.map(item => item.name)
    //   dispatch({
    //   type: GET_ACC_LISTS,
    //   payload: data
    // })}

    .catch(err => {
      //console.log("tokenas netinka");
      dispatch({
        type: TOKEN_EXPIRED
      });
    });
};

export const getListData = id => (dispatch, getState) => {
  // console.log("access tokenas: ", getState().api.accessToken);
  // console.log("acc id: ", getState().api.account_id);
  const config = {
    headers: {
      Authorization: `bearer ${getState().api.accessToken}`,
      "Content-Type": "application/json"
    }
  };

  //console.log(getState().api.reqToken.request_token);
  axios
    .get(`https://api.themoviedb.org/4/list/${id}?page=1`, config)
    .then(res => {
      dispatch({
        type: GET_LIST_DATA,
        payload: res.data
      });
    });
};

export const startSession = token => dispatch => {
  console.log("ok");
  axios
    .post("https://api.themoviedb.org/4/auth/access_token", {
      request_token: token
    })
    .then(res => console.log(res));
  // .then(res =>
  //   dispatch({
  //     type: START_SESSION,
  //     payload: res.data
  //   })
  // );
};

export const fetchPosts = () => dispatch => {
  //console.log("fetching data");
  axios
    .get("api/meterslist")
    //.then(res => console.log(res))
    .then(res =>
      dispatch({
        type: FETCH_POSTS,
        payload: res.data
      })
    );
};

export const fetchcfg = () => dispatch => {
  axios
    .get("api/cfg")
    //.then(res => console.log(res.data))
    .then(res =>
      dispatch({
        type: FETCH_CFG,
        payload: res.data
      })
    );
};

export const fetchitem = item => dispatch => {
  dispatch(setItemsLoading());
  axios
    .post("api/listitem", item)
    //.then(res => console.log(res))
    .then(res =>
      dispatch({
        type: FETCH_METER,
        payload: res.data
      })
    );
};

export const createPost = postData => dispatch => {
  console.log("create post action fired");
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(postData)
  })
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: NEW_POST,
        payload: data
      })
    );
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};

//dispatchina i postReduceri

// export const getRequestToken = () => dispatch => {
//   //console.log("fetching data");
//   axios
//     .get(
//       "https://api.themoviedb.org/3/authentication/token/new?api_key=cae4344bf7516e49a519f7b6f2dfb39e"
//     )
//     //.then(res => console.log(res))
//     .then(res =>
//       dispatch({
//         type: GET_REQ_TOKEN,
//         payload: res.data
//       })
//     );
// };

// export const startSession = token => dispatch => {
//   axios
//     .post(
//       "https://api.themoviedb.org/3/authentication/session/new?api_key=cae4344bf7516e49a519f7b6f2dfb39e",
//       token
//     )
//     //.then(res => console.log(res))
//     .then(res =>
//       dispatch({
//         type: START_SESSION,
//         payload: res.data
//       })
//     );
// };
