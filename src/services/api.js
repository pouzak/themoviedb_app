import axios from "axios";
const read_access_token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWU0MzQ0YmY3NTE2ZTQ5YTUxOWY3YjZmMmRmYjM5ZSIsInN1YiI6IjVjY2U3N2Q0MGUwYTI2MDk4MWZlYTM4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6gPt6m7QPQhdpLML4kqyfcM4okrelNYvwIsJyu1JasA";
const api_key = "cae4344bf7516e49a519f7b6f2dfb39e";

const req = [];
export const fetchListsItems = query => {
  console.log(query);

  req.push(`https://api.themoviedb.org/4/list/${query}?page=1`);
};
