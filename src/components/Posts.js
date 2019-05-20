import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPosts, setItemsLoading } from "../actions/postActions";
import PropTypes from "prop-types";
import Info from "./Info";

class Post extends Component {
  state = {
    current: null
  };
  componentDidMount() {
    this.props.fetchPosts();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newPost) {
      this.props.posts.unshift(nextProps.newPost);
    }
  }

  setCurrent = name => {
    this.props.setItemsLoading();
    this.setState({
      current: name
    });
  };
  render() {
    //console.log(this.props);
    const postItems = this.props.posts.map(post => (
      <div key={post.name}>
        <h3>{post.name}</h3>
        <p>
          {post.mac}, {post.lnid}
        </p>
        <button onClick={() => this.setCurrent(post.name)}>
          Click me, fuck yeah
        </button>
        {this.state.current === post.name ? <Info meter={post.name} /> : null}
        <hr />
      </div>
    ));
    return <div>{postItems}</div>;
  }
}

Post.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  newPost: PropTypes.object
};

const mapStateToProps = state => ({
  posts: state.posts.items, //nes reducer/index.js combinereucer yra posts: postReduceer
  newPost: state.posts.item
});

export default connect(
  mapStateToProps,
  { fetchPosts, setItemsLoading }
)(Post);
