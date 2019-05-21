import axios from "axios";
export const read_access_token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWU0MzQ0YmY3NTE2ZTQ5YTUxOWY3YjZmMmRmYjM5ZSIsInN1YiI6IjVjY2U3N2Q0MGUwYTI2MDk4MWZlYTM4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6gPt6m7QPQhdpLML4kqyfcM4okrelNYvwIsJyu1JasA";
export const api_key = "cae4344bf7516e49a519f7b6f2dfb39e";

// export const update = (obj, list_id) => getState =>
//   axios.put(
//     `https://api.themoviedb.org/4/list/${list_id}
// `,
//     obj
//   );

export const updateListAPI = (obj, list_id, getState) => {
  return axios(`https://api.themoviedb.org/4/list/${list_id}`, {
    method: "PUT",
    headers: {
      Authorization: `bearer ${getState().api.accessToken}`,
      "Content-Type": "application/json"
    },
    data: obj
  }).catch(error => {
    throw error;
  });
};

export const deleteListAPI = (list_id, getState) => {
  return axios(`https://api.themoviedb.org/4/list/${list_id}`, {
    method: "DELETE",
    headers: {
      Authorization: `bearer ${getState().api.accessToken}`,
      "Content-Type": "application/json"
    }
  }).catch(error => {
    throw error;
  });
};

export const getGenresAPI = () => {
  return axios(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-US`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
  ).catch(error => {
    throw error;
  });
};

export const getTopMoviesAPI = () => {
  return axios(
    `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
  ).catch(error => {
    throw error;
  });
};

export const createListAPI = (name, desc, getState) => {
  return axios(`https://api.themoviedb.org/4/list`, {
    method: "POST",
    headers: {
      Authorization: `bearer ${getState().api.accessToken}`,
      "Content-Type": "application/json"
    },
    data: {
      name: name,
      description: desc,
      iso_639_1: "en"
    }
  }).catch(error => {
    throw error;
  });
};

export const deleteMovieAPI = (listid, movie, getState) => {
  return axios(`https://api.themoviedb.org/4/list/${listid}/items`, {
    method: "DELETE",
    headers: {
      Authorization: `bearer ${getState().api.accessToken}`,
      "Content-Type": "application/json"
    },
    data: {
      items: [
        {
          media_type: "movie",
          media_id: movie
        }
      ]
    }
  }).catch(error => {
    throw error;
  });
};

export const addMovieAPI = (listid, movie, getState) => {
  return axios(`https://api.themoviedb.org/4/list/${listid}/items`, {
    method: "POST",
    headers: {
      Authorization: `bearer ${getState().api.accessToken}`,
      "Content-Type": "application/json"
    },
    data: {
      items: [
        {
          media_type: "movie",
          media_id: movie
        }
      ]
    }
  }).catch(error => {
    throw error;
  });
};

export const searchMoviesAPI = query => {
  return axios(
    `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&page=1&include_adult=false&query=${query}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
  ).catch(error => {
    throw error;
  });
};

export const getRequestTokenAPI = () => {
  return axios(`https://api.themoviedb.org/4/auth/request_token`, {
    method: "POST",
    headers: {
      Authorization: `bearer ${read_access_token}`,
      "Content-Type": "application/json"
    },
    data: {}
  }).catch(error => {
    throw error;
  });
};

export const getAccessTokenAPI = getState => {
  return axios(`https://api.themoviedb.org/4/auth/access_token`, {
    method: "POST",
    headers: {
      Authorization: `bearer ${read_access_token}`,
      "Content-Type": "application/json"
    },
    data: {
      request_token: getState().api.reqToken.request_token
    }
  }).catch(error => {
    throw error;
  });
};

export const getAccountListsAPI = getState => {
  return axios(
    `https://api.themoviedb.org/4/account/${
      getState().api.account_id
    }/lists?page=1`,
    {
      method: "GET",
      headers: {
        Authorization: `bearer ${getState().api.accessToken}`,
        "Content-Type": "application/json"
      }
    }
  ).catch(error => {
    throw error;
  });
};

export const getListDataAPI = (id, getState) => {
  return axios(`https://api.themoviedb.org/4/list/${id}?page=1`, {
    method: "GET",
    headers: {
      Authorization: `bearer ${getState().api.accessToken}`,
      "Content-Type": "application/json"
    }
  }).catch(error => {
    throw error;
  });
};
