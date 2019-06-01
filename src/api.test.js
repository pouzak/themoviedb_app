import request from "supertest";
import { getTopMoviesAPI, searchMoviesAPI } from "./services/connection";

describe("The Movie Database API", () => {
  describe("searchMovies", () => {
    let response;
    beforeAll(async () => {
      const query = "Rambo";
      response = await searchMoviesAPI(query);
    });
    it("API request should return search query results", async () => {
      expect(response.status).toBe(200);
      expect(response).toBeDefined();
    });

    it("API request with 'Rambo' movie query should return more then 0 results", async () => {
      const count = response.data.total_results;
      expect(count).toBeGreaterThan(0);
    });
  });
  describe("getTopMovies", () => {
    it("API request should respond with 200 status and return defined data", async () => {
      const res = await getTopMoviesAPI();
      expect(res.status).toBe(200);
      expect(res).toBeDefined();
    });

    it("Without api_key, API request should respond with 401 status", async () => {
      const res = await request(`https://api.themoviedb.org`).get(
        `/3/movie/popular?api_key=&language=en-US&page=1`
      );
      expect(res.statusCode).toBe(401);
    });
  });
});
