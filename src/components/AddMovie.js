import React, { Component } from "react";
import { connect } from "react-redux";
import { checkIfExists, addMovie, deleteMovie } from "../actions/apiActions";

import Checkbox from "@material-ui/core/Checkbox";
class AddMovie extends Component {
  componentDidMount() {
    this.props.checkIfExists(this.props.list.id, this.props.movieid);
  }

  handleChange = () => {
    console.log("changing");
  };

  render() {
    return (
      <div>
        {this.props.exist ? (
          !this.props.exist.find(id => id === this.props.list.id) ? (
            <div>
              <Checkbox
                checked={false}
                onChange={() =>
                  this.props.addMovie(this.props.list.id, this.props.movieid)
                }
                //value="checkedA"
              />
              <a> {this.props.list.name}</a>
            </div>
          ) : (
            <div>
              <Checkbox
                checked={true}
                onChange={() =>
                  this.props.deleteMovie(this.props.list.id, this.props.movieid)
                }
                //value="checkedA"
              />{" "}
              <a> {this.props.list.name}</a>
            </div>
          )
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  exist: state.api.itemExist //nes reducer/index.js combinereucer yra posts: postReduceer
  //sessionToken: state.api.sessionToken
});

export default connect(
  mapStateToProps,
  { checkIfExists, addMovie, deleteMovie }
)(AddMovie);

// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { checkIfExists, addMovie, deleteMovie } from "../actions/apiActions";

// class AddMovie extends Component {
//   componentDidMount() {
//     this.props.checkIfExists(this.props.list.id, this.props.movieid);
//   }

//   render() {
//     return (
//       <div>
//         {this.props.exist ? (
//           !this.props.exist.find(id => id === this.props.list.id) ? (
//             <button
//               onClick={() => {
//                 this.props.addMovie(this.props.list.id, this.props.movieid);
//               }}
//             >
//               add
//             </button>
//           ) : (
//             <button
//               onClick={() =>
//                 this.props.deleteMovie(this.props.list.id, this.props.movieid)
//               }
//             >
//               remove from list
//             </button>
//           )
//         ) : null}
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => ({
//   exist: state.api.itemExist //nes reducer/index.js combinereucer yra posts: postReduceer
//   //sessionToken: state.api.sessionToken
// });

// export default connect(
//   mapStateToProps,
//   { checkIfExists, addMovie, deleteMovie }
// )(AddMovie);

// {this.props.exist ? (
//   <div className="center" style={{ float: "left" }}>
//     <Checkbox
//       checked={!!this.props.exist.find(id => id === this.props.list.id)}
//       onChange={() => this.handleChange("checkedA")}
//       //value="checkedA"
//     />
//     <p>{this.props.list.name}</p>
//   </div>
// ) : null}
