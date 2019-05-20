import React, { Component, useRef } from "react";
import { connect } from "react-redux";
//import PropTypes from 'prop-types'
import {
  clearCheckList,
  createList,
  checkAllLists,
  addMovie,
  deleteMovie
} from "../actions/apiActions";
//import AddMovie from "./AddMovie";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CreateList from "./CreateList";

import Checkbox from "@material-ui/core/Checkbox";

const image = "https://image.tmdb.org/t/p/w500";

class Movie extends Component {
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
    //console.log(this.movieRef.current.contains(event.target));
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

  // componentWillUnmount() {
  //   this.props.clearCheckList();
  // }

  showlist = () => {
    // this.props.clearCheckList();
    this.setState({
      list: !this.state.list
    });
  };

  // componentWillUnmount() {
  //   this.setState({
  //     list: false
  //   });
  // }

  renderList() {
    const { lists } = this.props;

    return (
      <div>
        {lists.map(list => (
          <div className="1">
            {/* <AddMovie list={list} movieid={this.props.movie.id} /> */}
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
                    //value="checkedA"
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
                    //value="checkedA"
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
    //const btn = this.props.list.length > 0 ? false : true;
    return (
      <div style={{ padding: "0.1px" }}>
        <Grid container spacing={2} direction="row">
          <Grid item className="movie-image" xs={6} sm={5}>
            <img
              src={`${image}${movie.poster_path}`}
              alt={movie.original_title}
            />
          </Grid>
          <Grid item xs xs={12} sm={7}>
            <div className="movie-info">
              <h1>{movie.title}</h1>
              <h2>Vote average: {movie.vote_average}/10</h2>
              <hr />
              <p>Genres: {this.renderGenres(movie.genre_ids)}</p>
              <p>Release date: {movie.release_date}</p>
              <hr />

              {/* <img src={`${image}${movie.poster_path}`} alt={movie.original_title} /> */}

              <p className="movie-review">{movie.overview}</p>

              <div>
                <div className="center">
                  <Button
                    variant="outlined"
                    color="secondary"
                    disabled={!this.props.lists.length ? true : false}
                    onClick={this.showlist}
                  >
                    Add to list{" "}
                    <i style={{ paddingLeft: "1rem" }} class="material-icons">
                      favorite_border
                    </i>
                  </Button>
                  <Button
                    onClick={() => this.props.handleSelect("")}
                    variant="outlined"
                    color="primary"
                    size="sm"
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
  list: state.api.list,
  genres: state.api.genres,
  exist: state.api.itemExist
  //isAuthorised: state.api.isAuth //nes reducer/index.js combinereucer yra posts: postReduceer
  //sessionToken: state.api.sessionToken
});

export default connect(
  mapStateToProps,
  { clearCheckList, checkAllLists, addMovie, deleteMovie }
)(Movie);
