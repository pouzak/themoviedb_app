import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import { connect } from "react-redux";
import {
  getAccountLists,
  getListData,
  clearMovies,
  updateList,
  deleteList
} from "../actions/apiActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Table from "./Table";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import PropTypes from "prop-types";

class ListModal extends Component {
  state = {
    edit: false,
    name: "",
    desc: "",
    anchorEl: null,
    sort: null
  };
  componentDidMount() {
    this.props.getListData(this.props.list);
  }
  toggleEdit = () => {
    this.setState({
      edit: !this.state.edit
    });
  };
  submitForm = () => {
    const obj = {
      name: this.state.name,
      description: this.state.desc,
      sort_by: this.state.sort
    };

    this.props.updateList(obj, this.props.list);
  };

  handleUserInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentWillReceiveProps(props) {
    if (props.listData) {
      this.setState({
        name: props.listData.name,
        desc: props.listData.description,
        sort: props.listData.sort_by
      });
    }
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  render() {
    const { listData } = this.props;
    const { anchorEl } = this.state;
    return (
      <div style={{ overflow: "hidden" }}>
        <Dialog
          onClose={this.props.handleClose}
          aria-labelledby="customized-dialog-title"
          open={true}
          maxWidth="lg"
        >
          <i
            style={{ position: "absolute", right: "2rem", top: "2rem" }}
            className="material-icons icon-cursor"
            onClick={() => this.props.handleClose("")}
          >
            clear
          </i>
          <div className="black movie-modal" style={{ positiom: "relative" }}>
            {listData ? (
              <Grid
                container
                spacing={0}
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={this.handleClose}
                >
                  <MenuItem>
                    {" "}
                    <input
                      value={this.state.name}
                      onChange={event => this.handleUserInput(event)}
                      name="name"
                      placeholder="Name..."
                    />
                  </MenuItem>
                  <MenuItem>
                    <input
                      value={this.state.desc}
                      onChange={event => this.handleUserInput(event)}
                      name="desc"
                      placeholder="Description ..."
                    />
                  </MenuItem>
                  <MenuItem>
                    <FormControl>
                      <Select
                        value={this.state.sort}
                        onChange={this.handleUserInput}
                        name="sort"
                        style={{ minWidth: "150px" }}
                      >
                        <InputLabel htmlFor="age-simple">Sort by</InputLabel>
                        <MenuItem value={"original_order.asc"}>
                          Original order
                        </MenuItem>
                        <MenuItem value={"title.asc"}>Title A-Z</MenuItem>
                        <MenuItem value={"title.desc"}>Title Z-A</MenuItem>
                        <MenuItem value={"vote_average.asc"}>
                          Vote <i class="material-icons">arrow_upward</i>
                        </MenuItem>
                        <MenuItem value={"vote_average.desc"}>
                          Vote{"  "}
                          <i class="material-icons">arrow_downward</i>
                        </MenuItem>
                        <MenuItem value={"primary_release_date.asc"}>
                          Release Date{" "}
                          <i class="material-icons">arrow_upward</i>
                        </MenuItem>
                        <MenuItem value={"primary_release_date.desc"}>
                          Release Date{" "}
                          <i class="material-icons">arrow_downward</i>
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </MenuItem>
                  <MenuItem
                    type="submit"
                    onClick={e => {
                      this.submitForm(e);
                      this.handleClose();
                    }}
                  >
                    Update
                  </MenuItem>
                  <MenuItem
                    style={{ color: "red" }}
                    onClick={() => {
                      if (
                        window.confirm(
                          `Are you sure you wish to delete ${this.props.list}?`
                        )
                      ) {
                        this.props.deleteList(this.props.list);
                        this.props.handleClose("");
                      }
                    }}
                  >
                    Delete List <i class="material-icons">delete_forever</i>
                  </MenuItem>
                </Menu>

                <Grid item xs={12}>
                  <div>
                    <div className="center">
                      <h1>{this.state.name}</h1>
                      <i
                        className="material-icons icon-cursor"
                        onClick={this.handleClick}
                      >
                        edit
                      </i>
                    </div>
                    <div style={{ display: "flex" }}>
                      <p>
                        <em>Description: {this.state.desc}</em>
                      </p>
                      <p>
                        <em>
                          Average Rating:{" "}
                          {String(listData.average_rating).slice(0, 3)}
                        </em>
                      </p>
                      <p>
                        <em>
                          Total runtime:{" "}
                          {String(listData.runtime / 60).slice(0, 5)} hours
                        </em>
                      </p>
                      <p>
                        <em>Total items: {listData.results.length}</em>
                      </p>
                      <p />
                    </div>
                    <hr />
                    <Table
                      listData={listData}
                      handleSelect={this.props.handleSelect}
                      handleClose={this.props.handleClose}
                    />
                  </div>
                </Grid>
              </Grid>
            ) : (
              <div className="center-div center">
                <CircularProgress color="secondary" />
              </div>
            )}
          </div>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  listData: state.api.listData
});

ListModal.propTypes = {
  list: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  listData: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.oneOf([null]).isRequired
  ]),
  clearMovies: PropTypes.func.isRequired,
  deleteList: PropTypes.func.isRequired,
  getListData: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  updateList: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { getAccountLists, getListData, clearMovies, updateList, deleteList }
)(ListModal);
