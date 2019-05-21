import React, { Component } from "react";
import { connect } from "react-redux";
import { getTopRatedMovies, getGenres } from "../actions/apiActions";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";

const image = "https://image.tmdb.org/t/p/w500";

class TopRatedMovies extends Component {
  componentDidMount() {
    if (!this.props.topMovies.length) {
      this.props.getGenres();
      this.props.getTopRatedMovies();
    }
  }

  renderGenres(ids) {
    const { genres } = this.props;

    const matchedGenres = ids.map(id => genres[id]);

    return matchedGenres.map(genre => (
      <span style={{ marginRight: 3 }} key={genre.name}>
        {genre.name}
      </span>
    ));
  }
  render() {
    const { topMovies } = this.props;
    return (
      <div>
        {topMovies ? (
          <Grid
            container
            spacing={24}
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={4}>
              <h1>TOP MOVIES</h1>
            </Grid>

            <Grid item xs>
              <Grid
                container
                spacing={24}
                direction="row"
                justify="center"
                alignItems="center"
              >
                {topMovies.map((movie, index) => (
                  <Grid
                    item
                    xs={6}
                    sm={4}
                    key={index}
                    onClick={() => this.props.handleSelect(movie)}
                  >
                    <Card className="movie-card">
                      <CardActionArea>
                        <CardMedia
                          style={{ height: "350px" }}
                          image={`${image}${movie.poster_path}`}
                          title={movie.original_title}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {movie.original_title}
                          </Typography>
                          <Typography>
                            {this.props.genres.length > 0
                              ? this.renderGenres(movie.genre_ids)
                              : null}
                          </Typography>
                          <Typography component="p">
                            Release Date: {movie.release_date}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <div style={{ position: "absolute" }} className="center-div center">
            <CircularProgress color="secondary" />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  topMovies: state.api.topMovies,
  genres: state.api.genres
});

TopRatedMovies.propTypes = {
  genres: PropTypes.object.isRequired,
  topMovies: PropTypes.array.isRequired,
  getGenres: PropTypes.func.isRequired,
  getTopRatedMovies: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { getTopRatedMovies, getGenres }
)(TopRatedMovies);
