import React, { Component } from "react";
import { connect } from "react-redux";
import { searchMovies, clearMovies } from "../actions/apiActions";
import debounce from "lodash.debounce";
import PropTypes from "prop-types";

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
    if (input.length === 2) {
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
    const { movies, handleSelect } = this.props;
    return (
      <div>
        {movies.map(movie => (
          <div key={movie.id} e2e="autocomplete__list__item">
            <p
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
    return (
      <div ref={this.movieRef}>
        <div className="input-container center" style={{ paddingTop: "7%" }}>
          <i className="material-icons">search</i>
          <input
            e2e="autocomplete__input"
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
          <div className="search-container" e2e="autocomplete__list">
            {this.renderResults()}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.api.movies
});

Search.propTypes = {
  movies: PropTypes.array.isRequired,
  clearMovies: PropTypes.func.isRequired,
  searchMovies: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { searchMovies, clearMovies }
)(Search);
