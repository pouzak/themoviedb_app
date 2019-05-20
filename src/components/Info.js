import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchitem } from "../actions/postActions";

function Info(props) {
  useEffect(() => {
    props.fetchitem({ name: props.meter });
  }, []);
  console.log(props);
  return (
    <div style={{ padding: "50px" }}>
      <div>
        {!props.loading && props.meterstats.plc ? (
          <div>
            {props.meterstats.plc.map(item => (
              <p>{item}</p>
            ))}
          </div>
        ) : (
          <p>Loading..</p>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  //nes reducer/index.js combinereucer yra posts: postReduceer
  meterstats: state.posts.meterInfo
});

export default connect(
  mapStateToProps,
  { fetchitem }
)(Info);
