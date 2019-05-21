import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getRequestToken,
  getAccessToken,
  getAccountLists
} from "../actions/apiActions";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";

export class Login extends Component {
  state = {
    access: false
  };
  approveHandle = () => {
    this.setState({
      session: true
    });
    window.open(
      `https://www.themoviedb.org/auth/access?request_token=${
        this.props.reqToken.request_token
      }`,
      "_blank"
    );
    this.setState({
      access: true
    });
  };

  componentDidMount() {
    this.props.getRequestToken();
  }
  render() {
    console.log(this.props);
    return (
      <div className="container">
        {this.props.reqToken && !this.state.access ? (
          <Button
            onClick={() => this.approveHandle()}
            variant="contained"
            color="primary"
          >
            approve request
          </Button>
        ) : null}
        {this.state.access ? (
          <Button
            onClick={() => this.props.getAccessToken()}
            variant="contained"
            color="secondary"
          >
            get access token
          </Button>
        ) : null}
        {this.props.isAuthorised ? this.props.getAccountLists() : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  reqToken: state.api.reqToken,
  isAuthorised: state.api.isAuth
});

Login.propTypes = {
  isAuthorised: PropTypes.bool.isRequired,
  getAccessToken: PropTypes.func.isRequired,
  getAccountLists: PropTypes.func.isRequired,
  getRequestToken: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { getRequestToken, getAccessToken, getAccountLists }
)(Login);
