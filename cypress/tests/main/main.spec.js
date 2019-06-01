/// <reference types="cypress" />

describe("MovieDB Search App", function() {
  let window;

  before(function() {
    cy.visit("/", {
      onBeforeLoad(win) {
        window = win;
      }
    });
  });

  beforeEach(function() {
    cy.fixture("prefils.json").then(prefil => {
      this.prefil = prefil;
    });

    cy.get('input[e2e="autocomplete__input"]').as("input");

    // cy.stub(window, "fetch")
    //   .withArgs(
    //     "https://api.themoviedb.org/3/genre/movie/list?api_key=cab2afe8b43cf5386e374c47aeef4fca&language=en-US"
    //   )
    //   .returns(
    //     Promise.resolve({
    //       json() {
    //         return { genres: [{ id: 28, name: "Action" }] };
    //       },
    //       ok: true
    //     })
    //   )
    //   .withArgs(
    //     "https://api.themoviedb.org/3/search/movie?api_key=cab2afe8b43cf5386e374c47aeef4fca&language=en-US&query=Harry"
    //   )
    //   .returns(
    //     Promise.resolve({
    //       json() {
    //         return {
    //           page: 1,
    //           total_results: 1,
    //           total_pages: 1,
    //           results: [
    //             {
    //               vote_count: 345,
    //               id: 2639,
    //               video: false,
    //               vote_average: 7.3,
    //               title: "Deconstructing Harry",
    //               popularity: 20.486,
    //               poster_path: "/krKRthefSZlUjnzDvN4isqty0R7.jpg",
    //               original_language: "en",
    //               original_title: "Deconstructing Harry",
    //               genre_ids: [35, 18],
    //               backdrop_path: "/1KC0Td0TfHuHEIzZ0dTGsEOkYcs.jpg",
    //               adult: false,
    //               overview:
    //                 "This film tells the story of a successful writer called Harry Block, played by Allen himself, who draws inspiration from people he knows in real-life, and from events that happened to him, sometimes causing these people to become alienated from him as a result.",
    //               release_date: "1997-12-12"
    //             },
    //             {
    //               vote_count: 1024,
    //               id: 984,
    //               video: false,
    //               vote_average: 7.5,
    //               title: "Dirty Harry",
    //               popularity: 12.707,
    //               poster_path: "/4j2tBAusIVev4ZaScncIHknP7eV.jpg",
    //               original_language: "en",
    //               original_title: "Dirty Harry",
    //               genre_ids: [28, 80, 53],
    //               backdrop_path: "/t3OZS8yMs0NL4YgWWc04eXHTn1X.jpg",
    //               adult: false,
    //               overview:
    //                 "When a madman dubbed 'Scorpio' terrorizes San Francisco, hard-nosed cop, Harry Callahan – famous for his take-no-prisoners approach to law enforcement – is tasked with hunting down the psychopath. Harry eventually collars Scorpio in the process of rescuing a kidnap victim, only to see him walk on technicalities. Now, the maverick detective is determined to nail the maniac himself.",
    //               release_date: "1971-12-21"
    //             }
    //           ]
    //         };
    //       },
    //       ok: true
    //     })
    //   );
  });

  it("should have clear initial state", function() {
    cy.get('p[e2e="movie-card__article"]').should("not.be.visible");

    // cy.window()
    //   .its("__store__")
    //   .then(store => {
    //     store.dispatch({ type: "SEARCH_MOVIES", payload: "rambo" });
    //   });

    cy.get("@input").focus();
  });

  it("should not open autocomplete if input lenth is less than 3", function() {
    cy.get("@input").type(this.prefil.short, { delay: 500 });

    cy.get('div[e2e="autocomplete__list"]').should("not.be.visible");
  });

  it("should open a valid autocomplete if input lenght is more or equal to 3", function() {
    cy.get("@input")
      .clear()
      .type(this.prefil.long, { delay: 200 });

    cy.get('div[e2e="autocomplete__list"]')
      .should("be.visible")
      .get('div[e2e="autocomplete__list__item"]')
      .then($items => {
        expect($items.length).to.equal(9);
      });
  });

  it("should close autocomplete list on outside click", function() {
    cy.get(
      'div[class="MuiGrid-item-2 MuiGrid-grid-xs-6-35 MuiGrid-grid-sm-4-47"]'
    )
      .eq(0)
      .click("bottomLeft");

    cy.get('div[e2e="autocomplete__list"]').should("not.be.visible");
  });

  it("should be able to select movie from autocomplete list", function() {
    cy.get("@input")
      .clear()
      .type(this.prefil.long, { delay: 100 });

    cy.get('div[e2e="autocomplete__list__item"]')
      .last()
      .click();
  });

  it("should be able to get back Top Movies screen", function() {
    cy.get('button[e2e="button__back"]').click();
  });
});
