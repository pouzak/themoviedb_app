import React from "react";
import Pagination from "react-paginating";
import { deleteMovie } from "../actions/apiActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const limit = 2;
const pageCount = 3;

class Table extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      data: []
    };
  }

  refactorArray = array => {
    const results = [];
    while (array.length) {
      results.push(array.splice(0, 6));
    }
    this.setState({ data: results });
  };

  componentDidMount() {
    this.refactorArray(this.props.listData.results);
  }

  updateData = movieid => {
    const newData = this.state.data.map(arr =>
      arr.filter(item => {
        return item.id !== movieid;
      })
    );

    this.refactorArray([].concat(...newData));
  };

  handlePageChange = page => {
    this.setState({
      currentPage: page
    });
  };

  render() {
    const { currentPage, data } = this.state;
    return (
      <div>
        {data.length > 0 ? (
          <div>
            <table style={{ width: "100%" }}>
              <tr>
                <th>Movie</th>
                <th>Rating</th>
                <th>Realease Date</th>
                <th>
                  <i className="material-icons icon-cursor">settings</i>
                </th>
              </tr>
              {data[currentPage - 1]
                ? data[currentPage - 1].map((movie, index) => (
                    <tr key={index}>
                      <td>
                        <a
                          href="#"
                          onClick={() => {
                            this.props.handleSelect(movie);
                            this.props.handleClose("");
                          }}
                        >
                          {movie.original_title}
                        </a>
                      </td>
                      <td>{movie.vote_average}</td>
                      <td>{movie.release_date}</td>
                      <td>
                        <i
                          className="material-icons icon-cursor"
                          onClick={() => {
                            if (
                              window.confirm(
                                `Are you sure you wish to delete ${
                                  movie.original_title
                                }?`
                              )
                            ) {
                              this.props.deleteMovie(
                                this.props.listData.id,
                                movie.id
                              );
                              this.updateData(movie.id);
                            }
                          }}
                        >
                          delete
                        </i>
                      </td>
                    </tr>
                  ))
                : null}
            </table>
            <hr />
            <div className="center">
              <Pagination
                total={data.length * limit}
                limit={limit}
                pageCount={pageCount}
                currentPage={currentPage}
              >
                {({
                  pages,
                  currentPage,
                  hasNextPage,
                  hasPreviousPage,
                  previousPage,
                  nextPage,
                  totalPages,
                  getPageItemProps
                }) => (
                  <div>
                    <button
                      className="paginate-button"
                      {...getPageItemProps({
                        pageValue: 1,
                        onPageChange: this.handlePageChange
                      })}
                    >
                      first
                    </button>

                    {hasPreviousPage && (
                      <button
                        className="paginate-button"
                        {...getPageItemProps({
                          pageValue: previousPage,
                          onPageChange: this.handlePageChange
                        })}
                      >
                        {"<"}
                      </button>
                    )}

                    {pages.map(page => {
                      let activePage = null;
                      if (currentPage === page) {
                        activePage = {
                          padding: "5px 12px"
                        };
                      }
                      return (
                        <button
                          className="paginate-button"
                          key={page}
                          style={activePage}
                          {...getPageItemProps({
                            pageValue: page,
                            onPageChange: this.handlePageChange
                          })}
                        >
                          {page}
                        </button>
                      );
                    })}

                    {hasNextPage && (
                      <button
                        className="paginate-button"
                        {...getPageItemProps({
                          pageValue: nextPage,
                          onPageChange: this.handlePageChange
                        })}
                      >
                        {">"}
                      </button>
                    )}

                    <button
                      className="paginate-button"
                      {...getPageItemProps({
                        pageValue: totalPages,
                        onPageChange: this.handlePageChange
                      })}
                    >
                      last
                    </button>
                  </div>
                )}
              </Pagination>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

Table.propTypes = {
  listData: PropTypes.object.isRequired,
  deleteMovie: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired
};
export default connect(
  null,
  { deleteMovie }
)(Table);
