import React, { Component } from "react";
import { connect } from "react-redux";
import { getAccountLists, clearList } from "../actions/apiActions";
import Login from "./Login";
import CreateList from "./CreateList";
import Dialog from "@material-ui/core/Dialog";
import ListModal from "./ListModal";
import PropTypes from "prop-types";

export class Lists extends Component {
  state = {
    create: false,
    open: false,
    listid: null
  };

  componentDidMount() {
    this.props.getAccountLists();
  }

  handleClose = id => {
    this.props.clearList();
    this.setState({ listid: id, open: !this.state.open });
  };

  componentWillReceiveProps(newProps) {
    const oldProps = this.props;
    if (oldProps.tokenExpired !== newProps.tokenExpired) {
      this.props.getAccountLists();
    }
  }

  toggleCreate = () => {
    this.setState({
      create: !this.state.create
    });
  };
  renderModal() {
    return (
      <div style={{ overflow: "hidden" }}>
        {this.props.list ? (
          <Dialog
            onClose={this.handleClose}
            aria-labelledby="customized-dialog-title"
            open={this.state.open}
            maxWidth="lg"
          >
            <div className="black movie-modal">{this.props.list.name}</div>
          </Dialog>
        ) : null}
      </div>
    );
  }
  render() {
    return (
      <div>
        {!this.props.tokenExpired ? (
          <div
            style={{
              marginTop: "15%",
              float: "right"
            }}
          >
            <div className="dropdown">
              <p className="dropbtn">My lists</p>
              <div className="dropdown-content">
                {this.props.lists.map((item, index) => (
                  <a
                    key={index}
                    onClick={() => {
                      this.handleClose(item.id);
                    }}
                  >
                    {item.name}
                  </a>
                ))}
                <div className="dropdown-create-new">
                  <CreateList />
                </div>
              </div>
            </div>
            {this.state.open && (
              <ListModal
                handleSelect={this.props.handleSelect}
                handleClose={this.handleClose}
                list={this.state.listid}
              />
            )}
          </div>
        ) : (
          <div style={{ marginTop: "30px" }}>
            <Login />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.api.lists,
  tokenExpired: state.api.tokenExp
});

Lists.propTypes = {
  lists: PropTypes.array.isRequired,
  clearList: PropTypes.func.isRequired,
  getAccountLists: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
  tokenExpired: PropTypes.bool.isRequired
};

export default connect(
  mapStateToProps,
  { getAccountLists, clearList }
)(Lists);
