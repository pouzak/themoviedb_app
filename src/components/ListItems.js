import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllMovies } from "../actions/apiActions";

class ListItems extends Component {
  listsdata = () => {
    const list = this.props.ids.map(movie => movie.id);
    console.log(list);
    this.props.getAllMovies(list);
  };
  componentDidMount() {
    this.listsdata();
  }

  render() {
    // const { movies } = this.props.movies;
    // console.log(this.props);
    return (
      <div>{this.props.movies.length > 0 ? <div>ok</div> : <p>Loading</p>}</div>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.api.moviesLists //nes reducer/index.js combinereucer yra posts: postReduceer
  //sessionToken: state.api.sessionToken
});

export default connect(
  mapStateToProps,
  { getAllMovies }
)(ListItems);
