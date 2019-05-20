import React, { Component } from "react";
import { connect } from "react-redux";
import { searchMovies, clearMovies } from "../actions/apiActions";
import debounce from "lodash.debounce";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      dropdown: false
    };
    this.handleSearch = debounce(this.handleSearch, 300);
    this.movieRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  handleClickOutside = event => {
    if (this.movieRef && !this.movieRef.current.contains(event.target)) {
      this.setState({
        dropdown: false
      });
    }
    //console.log(this.movieRef.current.contains(event.target));
  };
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  hendleInput = event => {
    const { input } = this.state;

    this.setState({
      input: event.target.value
    });

    this.handleSearch();
    if (input.length < 4) {
      this.props.clearMovies();
    }
  };

  handleSearch() {
    this.props.searchMovies(this.state.input);
  }

  dropdownHandle = () => {
    this.setState({
      dropdown: true
    });
  };
  dropdownFalse = () => {
    this.setState({
      dropdown: false
    });
  };

  renderResults() {
    //console.log(this.props);
    const { movies, handleSelect } = this.props;
    return (
      <div>
        {movies.map(movie => (
          <div>
            <p
              key={movie.id}
              //className={`item ${movie.favorite ? "favoriteItem" : ""}`}
              onClick={() => {
                handleSelect(movie);
                // this.props.clearMovies();
                this.dropdownFalse();
              }}
            >{`${movie.original_title} (${movie.release_date})`}</p>
          </div>
        ))}
      </div>
    );
  }
  render() {
    const { input, dropdown } = this.state;
    //const { movies } = this.props;
    //console.log(this.props);
    // /className="container"
    return (
      <div ref={this.movieRef}>
        <div className="input-container center" style={{ paddingTop: "7%" }}>
          <i class="material-icons">search</i>
          <input
            className="input"
            onChange={this.hendleInput}
            onFocus={this.dropdownHandle}
            value={input}
            id="movies-autocomplete"
            type="text"
            autoComplete="off"
            name="q"
            placeholder="Serch for movie title, e.g Rambo III"
            aria-label="Search through app content"
          />
        </div>

        {dropdown && (
          <div className="search-container">{this.renderResults()}</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.api.movies //nes reducer/index.js combinereucer yra posts: postReduceer
  //sessionToken: state.api.sessionToken
});

export default connect(
  mapStateToProps,
  { searchMovies, clearMovies }
)(Search);
