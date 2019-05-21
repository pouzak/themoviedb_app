import React, { Component } from "react";
import { createList } from "../actions/apiActions";
import { connect } from "react-redux";
import Fab from "@material-ui/core/Fab";
import PropTypes from "prop-types";

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

  handleUserInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submitForm = e => {
    e.preventDefault();
    this.props.createList(this.state.name, this.state.descr);
    this.handleOpen();
  };

  render() {
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
              <i className="material-icons">playlist_add</i>
            </Fab>
          </div>
        )}
      </div>
    );
  }
}
CreateList.propTypes = {
  createList: PropTypes.func.isRequired
};

export default connect(
  null,
  { createList }
)(CreateList);
