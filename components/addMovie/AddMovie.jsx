import "./addMovie.scss";
import { safeGET, safePOST } from "../../api/authenticatedApi";
import { useEffect, useState } from "react";

export default function AddMovie(params) {
  const [allMovieTheMovieDb, setAllMovieTheMovieDb] = useState(null);
  const [loading, setLoading] = useState(true);
  const [typeMovie, setTypeMovie] = useState("movie"); //filter
  const [searchByLanguage, setSearchByLanguage] = useState(""); //filter
  const [refreshData, setRefreshData] = useState(0); //to refresh the table data i increment the number
  const [theMovieDBIdAddedFromBE, setTheMovieDBIdAddedFromBE] = useState([]);

  function getLanguageName(code) {
    return params.languageMap[code] || "Unknown language";
  }

  useEffect(() => {
    safeGET(
      `/content-manager/get-movie-from-the-movie-db?typeMovie=${typeMovie}&language=${searchByLanguage}`
    )
      .then((response) => {
        console.log(response);
        setAllMovieTheMovieDb(response);
      })
      .catch((error) => {
        console.log(
          "Error while import table from content manager get-movie-from-the-movie-db ",
          error
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [typeMovie, searchByLanguage, refreshData]);

  function handleAddMovie(id) {
    safePOST(
      `/content-manager/add-movie-from-the-movie-db-id?id=${id}&typeMovie=${typeMovie}`
    )
      .then((response) => {
        console.log(response);
        setTheMovieDBIdAddedFromBE((prev) => [...prev, id]);
      })
      .catch((error) => {
        console.log("Error while adding single movie", error);
      });
  }

  function populateTableTheMovieDb() {
    if (!allMovieTheMovieDb?.data || allMovieTheMovieDb.data.length === 0) {
      return (
        <tr>
          <td colSpan="4" style={{ textAlign: "center", padding: "1rem" }}>
            No content found.
          </td>
        </tr>
      );
    }

    return allMovieTheMovieDb.data.map((singleMovie) => {
      return (
        <tr key={singleMovie.id}>
          <td>
            <div className="content-manager-title-img">
              <img
                src={params.posterUrl + singleMovie.poster_path}
                alt="img content"
              />
              {typeMovie === "movie" ? singleMovie.title : singleMovie.name}
            </div>
          </td>
          <td>{getLanguageName(singleMovie.original_language)}</td>
          <td>
            {typeMovie === "movie"
              ? singleMovie.release_date
              : singleMovie.first_air_date}
          </td>
          <td>
            {theMovieDBIdAddedFromBE.includes(singleMovie.id) ? (
              <i className="fa-solid fa-check"></i>
            ) : (
              <i
                className="fa-solid fa-download"
                onClick={() => handleAddMovie(singleMovie.id)}
              ></i>
            )}
          </td>
        </tr>
      );
    });
  }

  return !loading ? (
    <div className="show-modal-insert-new-movie">
      <h1>Add New Movie</h1>

      <p className="information">
        <i>
          You might notice that sometimes more rows are displayed, and other
          times fewer. This is because the data is fetched from The Movie
          Database (TMDb) API, and I filter the results to show only entries
          with complete information—such as available photos and other essential
          fields. This ensures that only high-quality, fully detailed data is
          presented.
        </i>
      </p>
      <div className="show-modal-table-filters">
        <div className="insert-movie-type-language">
          <div className="content-manager-table-single-filter content-manager-select">
            <label htmlFor="type-movie">Type Movie</label>
            <select
              id="type-movie"
              name="type-movie"
              value={typeMovie}
              onChange={(e) => setTypeMovie(e.target.value)}
            >
              <option value="movie">Movie</option>
              <option value="tv">Tv Show</option>
            </select>
          </div>

          <div className="content-manager-table-single-filter content-manager-select">
            <label htmlFor="language">Language</label>
            <select
              name="language"
              id="language"
              defaultValue={params.language}
              onChange={(e) => {
                setSearchByLanguage(e.target.value);
              }}
            >
              {Object.entries(params.languageMap).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div
          className="insert-movie-refresh"
          onClick={() => setRefreshData((prev) => prev + 1)}
        >
          <div className="content-manager-table-single-filter content-manager-select rounded-button-refresh">
            <i className="fa-solid fa-arrows-rotate"></i> Refresh
          </div>
        </div>
      </div>

      <div className="model-insert-content-table">
        <table>
          <thead>
            <tr>
              <th>Movie Title</th>
              <th>Language</th>
              <th>Release Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{populateTableTheMovieDb()}</tbody>
        </table>
      </div>

      <div className="modal-filter-button">
        <button
          onClick={() => params.setToggleShowInsertMovie((prev) => !prev)}
          className="modal-filter-button-close"
        >
          <i className="fa-solid fa-xmark"></i> Close
        </button>
      </div>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}
