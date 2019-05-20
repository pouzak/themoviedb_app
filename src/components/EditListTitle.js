import React, { Component } from "react";
import Fab from "@material-ui/core/Fab";

class EditListTitle extends Component {
  submitForm = e => {
    //console.log("submit");
    e.preventDefault();
    // this.props.createList(this.state.name, this.state.descr);
    // this.handleOpen();
    console.log("submited");
  };
  render() {
    //console.log(this.props);
    return (
      <div>
        <form onSubmit={e => this.submitForm(e)} className="black edit-title">
          <input
            onChange={event => this.props.handleUserInput(event)}
            name="name"
            placeholder="Name..."
          />
          <input
            onChange={event => this.props.handleUserInput(event)}
            name="desc"
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
            update
          </Fab>
        </form>
      </div>
    );
  }
}

export default EditListTitle;
