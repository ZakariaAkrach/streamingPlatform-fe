import { Link } from "react-router-dom";
import { safeDelete } from "../../api/authenticatedApi";
import "./contentManagerTable.scss";

export default function ContentManagerTable(params) {
  const languageMap = {
    en: "English",
    es: "Spanish",
    nl: "Dutch",
    fr: "French",
    de: "German",
    pt: "Portuguese",
    zh: "Chinese",
    da: "Danish",
    ru: "Russian",
    ar: "Arabic",
    th: "Thai",
  };

  function getLanguageName(code) {
    return languageMap[code] || "Unknown language";
  }


  function handleDelete(id) {
    safeDelete(`/content-manager/delete/${id}`)
      .then((response) => {
        console.log(response);
        alert("movie deleted successfully");

        params.setAllMovie((prev) => ({
          ...prev,
          data: prev.data.filter((movie) => movie.id !== id),
          totalElemenets: prev.totalElemenets - 1,
        }));
      })
      .catch((error) => {
        console.error("Error deleting movie:", error);
      });
  }

  function populateTable() {
    if (!params.allMovie?.data || params.allMovie.data.length === 0) {
      return (
        <tr>
          <td colSpan="5" style={{ textAlign: "center", padding: "1rem" }}>
            No content found.
          </td>
        </tr>
      );
    }

    return params.allMovie.data.map((singleMovie) => {
      return (
        <tr key={singleMovie.id}>
          <td>
            <div className="content-manager-title-img">
              <img
                src={params.posterUrl + singleMovie.posterPath}
                alt="img content"
              />
              {singleMovie.title}
            </div>
          </td>
          <td>{getLanguageName(singleMovie.language)}</td>
          <td>{singleMovie.releaseDate}</td>
          <td style={{ color: singleMovie.active ? "green" : "red" }}>
            {singleMovie.active ? "Published" : "Unpublished "}
          </td>
          <td>
            <div className="content-manager-button-action">
              <Link
                to="edit"
                state={{
                  data: singleMovie,
                  languageMap: languageMap,
                  page: params.page,
                  tableRowPage: params.tableRowPage,
                  orderBy: params.orderBy,
                  toggleOrder: params.toggleOrder,
                  typeMovie: params.typeMovie,
                  searchByTitle: params.searchByTitle, //Can be empty
                }}
              >
                {" "}
                <i className="fa-solid fa-pen content-manager-pen"></i>{" "}
              </Link>
              <i
                className="fa-solid fa-trash content-manager-trash"
                onClick={() => handleDelete(singleMovie.id)}
              ></i>
            </div>
          </td>
        </tr>
      );
    });
  }

  return (
    <section className="content-manager-table-pagination">
      <div className="content-manager-table-title-actions">
        <div className="content-manager-table-title">
          <h1>Content Manager Dashboard</h1>
        </div>
        <div className="content-manager-table-actions">
          <div
            className="content-manager-table-actions-filter"
            onClick={() => params.setToggleFilters((prev) => !prev)}
          >
            <i className="fas fa-sliders-h"></i> Filter
          </div>
          <div
            className="content-manager-table-actions-filter"
            onClick={params.resetFiltersToDefault}
          >
            <i className="fa-solid fa-filter-circle-xmark"></i> Reset Filters
          </div>
          <div
            className="content-manager-table-actions-add-new-movie"
            onClick={() => params.setToggleShowInsertMovie((prev) => !prev)}
          >
            <i className="fa-solid fa-plus"></i> Add Movie
          </div>
        </div>
      </div>

      {params.toggleFilters ? (
        <div className="content-manager-table-filters">
          <div className="content-manager-table-single-filter-search">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="search"
              placeholder="Search Movie"
              aria-label="Search"
              onChange={(e) => {
                params.setSearchByTitle(e.target.value);
                params.setPage(0);
              }}
            />
          </div>

          <div className="content-manager-table-single-filter content-manager-select">
            <label htmlFor="type-movie">Type Movie</label>
            <select
              id="type-movie"
              name="type-movie"
              value={params.typeMovie}
              onChange={(e) => params.setTypeMovie(e.target.value)}
            >
              <option value="MOVIE">Movie</option>
              <option value="TV_SHOW">Tv Show</option>
            </select>
          </div>

          <div className="content-manager-table-single-filter content-manager-select">
            <label htmlFor="order-by">Order By</label>
            <select
              id="order-by"
              name="order-by"
              value={params.orderBy}
              onChange={(e) => params.setOrderBy(e.target.value)}
            >
              <option value="title">Movie Title</option>
              <option value="language">Language</option>
              <option value="releaseDate">Release Date</option>
              <option value="active">Status</option>
            </select>
          </div>

          <div className="content-manager-table-single-filter">
            <label htmlFor="orderToggle">
              Order: {params.toggleOrder ? "Ascending" : "Descending"}
            </label>
            <label className="switch">
              <input
                type="checkbox"
                id="orderToggle"
                checked={params.toggleOrder}
                onChange={() => params.setToggleOrder((prev) => !prev)}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="content-manager-table-single-filter content-manager-select">
            <label htmlFor="row">Row Page</label>
            <select
              id="row"
              name="row"
              value={params.tableRowPage}
              onChange={(e) => params.setTableRowPage(e.target.value)}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
      ) : null}

      <div className="content-manager-table">
        <table>
          <thead>
            <tr>
              <th>Movie Title</th>
              <th>Language</th>
              <th>Release Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{populateTable()}</tbody>
        </table>
      </div>

      <div className="content-manager-pagination">
        <div className="content-manager-pagination-info">
          <p>{`Showing ${params.allMovie.page + 1} to ${
            params.allMovie.size
          } of ${params.allMovie.totalPages} pages`}</p>
        </div>
        <div className="content-manager-pagination-button">
          <div
            title="Previous"
            onClick={() =>
              params.page > 0 ? params.setPage((prev) => prev - 1) : null
            }
          >
            <i className="fa-solid fa-left-long"></i>
          </div>
          <div
            title="Next"
            onClick={() =>
              !params.allMovie.lastPage
                ? params.setPage((prev) => prev + 1)
                : null
            }
          >
            <i className="fa-solid fa-right-long"></i>
          </div>
        </div>
      </div>
    </section>
  );
}
