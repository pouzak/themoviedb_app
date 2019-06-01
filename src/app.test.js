import React from "react";
import { shallow, mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Search from "./components/Search";
import { Movie } from "./components/Movie";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import App from "./app";

configure({ adapter: new Adapter() });

describe("Main App component: ", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it("should render", () => {
    expect(wrapper.length).toEqual(1);
  });

  it("should have Search component", () => {
    expect(wrapper.find(Search).length).toEqual(1);
  });
});

describe("Movie component: ", () => {
  const testMovie = {
    vote_average: 6.6,
    vote_count: 13,
    id: 84762,
    video: false,
    media_type: "movie",
    title: "Dumb-Hounded",
    popularity: 1.137,
    poster_path: "/jRvX26Y02qCarIdIabiecku7OUn.jpg",
    original_language: "en",
    original_title: "Dumb-Hounded",
    genre_ids: [16],
    backdrop_path: "/kVBRSNI8ba4bidqEChdWCwCica7.jpg",
    adult: false,
    overview:
      "The wolf escapes from prison but can't get away from police dog Droopy no matter how hard he tries. This is the first cartoon starring Droopy.",
    release_date: "1943-03-20"
  };

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
  const baseProps = {
    movie: testMovie,
    lists: [],
    genres: {
      16: { id: 16, name: "Animation" }
    },
    exist: [],
    addMovie: jest.fn(),
    checkAllLists: jest.fn(),
    clearCheckList: jest.fn(),
    deleteMovie: jest.fn(),
    handleSelect: jest.fn()
  };
  const mockStore = configureStore();
  let store, wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <Movie movie={testMovie} {...baseProps} />
      </Provider>
    );
  });

  it("should render", () => {
    expect(wrapper.length).toEqual(1);
  });

  it("should have movie release date", () => {
    expect(
      wrapper
        .find("p")
        .at(1)
        .equals(<p>Release date: 1943-03-20</p>)
    ).toEqual(true);
  });
});
