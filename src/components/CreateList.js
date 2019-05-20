import React, { Component } from "react";
import { createList } from "../actions/apiActions";
import { connect } from "react-redux";
import { ReactComponent as AddIcon } from "./icons/add.svg";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";

class CreateList extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      descr: "",
      open: false
    };
    this.movieRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleClickOutside = event => {
    if (this.movieRef && !this.movieRef.current.contains(event.target)) {
      this.setState({
        open: false
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

  handleOpen = () => {
    this.setState({
      open: !this.state.open
    });
  };

  handleUserInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  submitForm = e => {
    //console.log("submit");
    e.preventDefault();
    this.props.createList(this.state.name, this.state.descr);
    this.handleOpen();
  };

  render() {
    //console.log(this.state);
    //ref={this.movieRef}

    return (
      <div ref={this.movieRef}>
        {this.state.open ? (
          <div>
            {" "}
            <form onSubmit={e => this.submitForm(e)}>
              <input
                onChange={event => this.handleUserInput(event)}
                name="name"
                placeholder="Name..."
              />
              <input
                onChange={event => this.handleUserInput(event)}
                name="descr"
                placeholder="Description ..."
              />

              <Fab
                variant="extended"
                size="small"
                color="secondary"
                aria-label="Add"
                style={{ width: "100%" }}
                type="submit"
              >
                create
              </Fab>
            </form>{" "}
          </div>
        ) : (
          <div className="center">
            <Fab
              variant="extended"
              size="small"
              color="default"
              aria-label="Add"
              style={{ width: "100%" }}
              onClick={() => this.handleOpen()}
            >
              <i class="material-icons">playlist_add</i>
            </Fab>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  null,
  { createList }
)(CreateList);

{
  /* <form onSubmit={e => this.submitForm(e)}>
            <input
              onChange={event => this.handleUserInput(event)}
              name="name"
            />
            <input
              onChange={event => this.handleUserInput(event)}
              name="descr"
            />
            <button type="submit">Submit</button>
          </form> */
}
