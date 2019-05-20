import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getRequestToken,
  getAccessToken,
  getAccountLists
} from "../actions/apiActions";
import Button from "@material-ui/core/Button";

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
    //console.log(this.props);
    return (
      <div className="container">
        {this.props.reqToken && !this.state.access ? (
          <Button
            onClick={() => this.approveHandle()}
            variant="contained"
            color="primary"
          >
            approve req
          </Button>
        ) : null}
        {this.state.access ? (
          <Button
            onClick={() => this.props.getAccessToken()}
            variant="contained"
            color="secondary"
          >
            get acces token
          </Button>
        ) : null}
        {/* {this.props.isAuthorised ? <Redirect to={"/"} /> : null} */}
        {this.props.isAuthorised ? this.props.getAccountLists() : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  reqToken: state.api.reqToken,
  isAuthorised: state.api.isAuth //nes reducer/index.js combinereucer yra posts: postReduceer
  //sessionToken: state.api.sessionToken
});

export default connect(
  mapStateToProps,
  { getRequestToken, getAccessToken, getAccountLists }
)(Login);
