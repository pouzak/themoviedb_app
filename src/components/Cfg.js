import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchcfg } from "../actions/postActions";

const Cfg = props => {
  useEffect(() => {
    props.fetchcfg(props.name);
  }, []);
  //console.log(props);
  return (
    <div>
      {props.cfg ? (
        <p>{props.cfg.config.settings.date_time.datetime}</p>
      ) : (
        <p>loading..</p>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  posts: state.posts.items, //nes reducer/index.js combinereucer yra posts: postReduceer
  cfg: state.posts.cfg
});

export default connect(
  mapStateToProps,
  { fetchcfg }
)(Cfg);
