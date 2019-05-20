import React, { Component } from "react";
//import Login from "./components/Login";
import Lists from "./components/Lists";
import Search from "./components/Search";
import Movie from "./components/Movie";
import TopRatedMovies from "./components/TopRatedMovies";
//import { BrowserRouter, Route, Switch } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

import "./App.css";
import { Provider } from "react-redux";

import store from "./store";
import Fade from "@material-ui/core/Fade";
import "material-design-icons/iconfont/material-icons.css";
const imagepath = "https://image.tmdb.org/t/p/w1280";

export class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedMovie: null
    };
  }

  handleSelect = movie => {
    this.setState({
      selectedMovie: movie
    });
  };

  render() {
    const { selectedMovie } = this.state;
    const image = selectedMovie
      ? `${imagepath + selectedMovie.backdrop_path} `
      : "https://images3.alphacoders.com/551/thumb-1920-551456.jpg";
    return (
      <Provider store={store}>
        <div
          style={{
            backgroundImage: `linear-gradient(
      to bottom,
      rgba(0, 0, 0, 1) 10%,
      rgba(0, 0, 0, 0.7) 50%
    ),
    url(${image})`,
            height: "100%",
            width: "100%",

            display: "block",
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
            backgroundSize: "cover",
            overflowX: "hidden"
          }}
        >
          <Grid
            container
            spacing={24}
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid
              container
              spacing={24}
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={4}>
                <Search handleSelect={this.handleSelect} />
              </Grid>
              <Grid item xs={2}>
                <Lists handleSelect={this.handleSelect} />
              </Grid>
            </Grid>
            <Fade in={true}>
              <Grid item xs={12} sm={10}>
                <div className="movies-container">
                  {selectedMovie ? (
                    <Movie
                      movie={selectedMovie}
                      handleSelect={this.handleSelect}
                    />
                  ) : (
                    <TopRatedMovies handleSelect={this.handleSelect} />
                  )}
                </div>
              </Grid>
            </Fade>
          </Grid>
        </div>
      </Provider>
    );
  }
}

export default App;

/* <BrowserRouter>
          <div>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/login" component={Login} />
            </Switch>
          </div>
        </BrowserRouter>
        
        
        
        
        backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",*/
