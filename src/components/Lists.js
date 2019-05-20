import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAccountLists,
  getListData,
  clearMovies,
  clearList
} from "../actions/apiActions";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Login from "./Login";
import CreateList from "./CreateList";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import ListModal from "./ListModal";

export class Lists extends Component {
  state = {
    create: false,
    open: false,
    listid: null
  };

  // handleClick = event => {
  //   this.setState({ anchorEl: event.currentTarget });
  // };

  // handleClose = () => {
  //   this.setState({ anchorEl: null });
  // };
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

  // listsdata = () => {
  //   const list = this.props.lists.results.map(movie => movie.id);
  //   this.props.getAllMovies(list);
  // };

  toggleCreate = () => {
    this.setState({
      create: !this.state.create
    });
  };

  // componentWillReceiveProps(props) {
  //   if (props.lists) {
  //     const list = props.lists.results.map(movie => movie.id);
  //     this.props.getAllMovies(list);
  //   }
  // }

  //console.log(this.movieRef.current.contains(event.target));

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
    //console.log(localStorage.getItem("token"));
    return (
      <div>
        {/* {this.props.lists ? <p>My Lists [{this.props.lists.length}]</p> : null} */}
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
                  // <a onClick={() => this.props.getListData(item.id)}>
                  //   {item.name}
                  // </a>

                  // <MenuItem onClick={this.handleClose}>{item.name}</MenuItem>
                  // <button onClick={() => this.props.getListData(item.id)}>
                  //   open list: {item.name}
                  // </button>
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

        {/* {this.props.tokenExpired ? <Redirect to={"/login"} /> : null} */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.api.lists,
  tokenExpired: state.api.tokenExp,
  list: state.api.listData,
  moviesLists: state.api.moviesLists,
  isLoading: state.api.isLoading
  //isAuthorised: state.api.isAuth //nes reducer/index.js combinereucer yra posts: postReduceer
  //sessionToken: state.api.sessionToken
});

export default connect(
  mapStateToProps,
  { getAccountLists, getListData, clearList }
)(Lists);

// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { getAccountLists, getListData } from "../actions/apiActions";
// import Button from "@material-ui/core/Button";
// import Menu from "@material-ui/core/Menu";
// import MenuItem from "@material-ui/core/MenuItem";
// import Login from "./Login";
// import CreateList from "./CreateList";

// export class Lists extends Component {
//   state = {
//     create: false
//   };
//   handleClick = event => {
//     this.setState({ anchorEl: event.currentTarget });
//   };

//   handleClose = () => {
//     this.setState({ anchorEl: null });
//   };
//   componentDidMount() {
//     this.props.getAccountLists();
//   }

//   listsdata = () => {
//     const list = this.props.lists.results.map(movie => movie.id);
//     this.props.getAllMovies(list);
//   };

//   toggleCreate = () => {
//     this.setState({
//       create: !this.state.create
//     });
//   };

//   // componentWillReceiveProps(props) {
//   //   if (props.lists) {
//   //     const list = props.lists.results.map(movie => movie.id);
//   //     this.props.getAllMovies(list);
//   //   }
//   // }
//   render() {
//     const { anchorEl } = this.state;
//     //console.log(localStorage.getItem("token"));
//     return (
//       <div
//         style={{
//           marginTop: "15%",
//           float: "right"
//         }}
//       >
//         {/* {this.props.lists ? <p>My Lists [{this.props.lists.length}]</p> : null} */}
//         {this.props.lists ? (
//           <div>
//             <Button
//               aria-owns={anchorEl ? "simple-menu" : undefined}
//               aria-haspopup="true"
//               onClick={this.handleClick}
//               style={{ color: "white" }}
//             >
//               My lists
//             </Button>
//             <Menu
//               id="simple-menu"
//               anchorEl={anchorEl}
//               open={Boolean(anchorEl)}
//               onClose={this.handleClose}
//             >
//               {this.props.lists.map(item => (
//                 <MenuItem onClick={this.handleClose}>{item.name}</MenuItem>
//                 // <button onClick={() => this.props.getListData(item.id)}>
//                 //   open list: {item.name}
//                 // </button>
//               ))}
//             </Menu>
//           </div>
//         ) : (
//           // <h1>
//           //   {this.props.lists.map(item => (
//           //     <button onClick={() => this.props.getListData(item.id)}>
//           //       open list: {item.name}
//           //     </button>
//           //   ))}
//           // </h1>
//           // <div>
//           //   <p>Lists [{this.props.lists.total_results}]</p>
//           //   <ListItems ids={this.props.lists.results} />
//           // </div>
//           <Login />
//         )}
//         {/* <button onClick={() => this.toggleCreate()}>new list</button> */}
//         {/* {this.state.create && <CreateList toggleCreate={this.toggleCreate} />} */}
//         {this.props.list ? (
//           <div>
//             {this.props.list.results.map(res => (
//               <p>{res.original_title}</p>
//             ))}
//           </div>
//         ) : null}

//         {/* {this.props.tokenExpired ? <Redirect to={"/login"} /> : null} */}
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => ({
//   lists: state.api.lists,
//   tokenExpired: state.api.tokenExp,
//   list: state.api.listData,
//   moviesLists: state.api.moviesLists,
//   isLoading: state.api.isLoading
//   //isAuthorised: state.api.isAuth //nes reducer/index.js combinereucer yra posts: postReduceer
//   //sessionToken: state.api.sessionToken
// });

// export default connect(
//   mapStateToProps,
//   { getAccountLists, getListData }
// )(Lists);
