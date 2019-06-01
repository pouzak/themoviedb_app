import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  clearCheckList,
  checkAllLists,
  addMovie,
  deleteMovie
} from "../actions/apiActions";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CreateList from "./CreateList";
import Checkbox from "@material-ui/core/Checkbox";

const image = "https://image.tmdb.org/t/p/w500";

export class Movie extends Component {
  constructor() {
    super();
    this.state = {
      list: false
    };
    this.movieRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleClickOutside = event => {
    if (this.movieRef && !this.movieRef.current.contains(event.target)) {
      this.setState({
        list: false
      });
    }
  };
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    if (this.props.lists) {
      const ids = this.props.lists.map(list => list.id);
      this.props.clearCheckList();
      this.props.checkAllLists(ids, this.props.movie.id);
    }
  }

  componentWillReceiveProps(newProps) {
    const oldProps = this.props;
    if (oldProps.movie !== newProps.movie) {
      this.props.clearCheckList();
      const ids = this.props.lists.map(list => list.id);
      this.props.checkAllLists(ids, newProps.movie.id);
    }
  }

  showlist = () => {
    // this.props.clearCheckList();
    this.setState({
      list: !this.state.list
    });
  };

  renderList() {
    const { lists } = this.props;
    return (
      <div>
        {lists.map((list, index) => (
          <div key={index} className="1">
            {this.props.exist ? (
              !this.props.exist.find(id => id === list.id) ? (
                <div>
                  <Checkbox
                    checked={false}
                    style={{
                      color: "#b71c1c"
                    }}
                    onChange={() =>
                      this.props.addMovie(list.id, this.props.movie.id)
                    }
                  />
                  <a> {list.name}</a>
                </div>
              ) : (
                <div>
                  <Checkbox
                    checked={true}
                    onChange={() =>
                      this.props.deleteMovie(list.id, this.props.movie.id)
                    }
                  />{" "}
                  <a> {list.name}</a>
                </div>
              )
            ) : null}
          </div>
        ))}
      </div>
    );
  }

  renderGenres(ids) {
    const { genres } = this.props;
    const matchedGenres = ids.map(id => genres[id]);
    return matchedGenres.map(genre => (
      <span style={{ marginRight: 3 }} key={genre.name}>
        | {genre.name}
      </span>
    ));
  }
  render() {
    const { movie } = this.props;
    const { list } = this.state;
    return (
      <div style={{ padding: "0.1px" }}>
        <Grid container spacing={0} direction="row">
          <Grid item className="movie-image" xs={6} sm={5}>
            <img
              src={`${image}${movie.poster_path}`}
              alt={movie.original_title}
            />
          </Grid>
          <Grid item xs sm={7}>
            <div className="movie-info">
              <h1>{movie.title}</h1>
              <h2>Vote average: {movie.vote_average}/10</h2>
              <hr />
              <p>Genres: {this.renderGenres(movie.genre_ids)}</p>
              <p>Release date: {movie.release_date}</p>
              <hr />
              <p className="movie-review" e2e="movie-card__article">
                {movie.overview}
              </p>
              <div>
                <div className="center">
                  <Button
                    variant="outlined"
                    color="secondary"
                    disabled={!this.props.lists.length ? true : false}
                    onClick={this.showlist}
                  >
                    Add to list{" "}
                    <i
                      style={{ paddingLeft: "1rem" }}
                      className="material-icons"
                    >
                      favorite_border
                    </i>
                  </Button>
                  <Button
                    e2e="button__back"
                    onClick={() => this.props.handleSelect("")}
                    variant="outlined"
                    color="primary"
                    size="small"
                  >
                    back
                  </Button>
                </div>
                <div className="center">
                  <div ref={this.movieRef} className="movie-add">
                    {list && (
                      <div className="create-new">
                        {this.renderList()} <CreateList />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.api.lists,
  // list: state.api.list, ???
  genres: state.api.genres,
  exist: state.api.itemExist
});

Movie.propTypes = {
  movie: PropTypes.object.isRequired,
  lists: PropTypes.array.isRequired,
  genres: PropTypes.object.isRequired,
  exist: PropTypes.array.isRequired,
  addMovie: PropTypes.func.isRequired,
  checkAllLists: PropTypes.func.isRequired,
  clearCheckList: PropTypes.func.isRequired,
  deleteMovie: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { clearCheckList, checkAllLists, addMovie, deleteMovie }
)(Movie);
