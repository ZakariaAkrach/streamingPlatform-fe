import { useEffect, useState } from "react";
import { safeGET } from "../../../api/authenticatedApi";
import "./contentManager.scss";

// TODO -> aggiungere i click ai buttoni avanti e indietro per aggiornare la tabella
// Aggiungere ricerca per film
// Aggiungere toggle tra movie e tv show in quanto ora la ricerca di default è movie
// Fare filtri sulle colonne o sorting
// Aggiungere nuovo movie/tv show
// Cancellare riga
// Al click della penna aprire una modale o pagina dettaglio dove vede info come genere cast ecc... e li può modificare tutti
export default function ContentManager() {
  const [allMovie, setAllMovie] = useState(null);
  const [page, setPage] = useState(0);
  const posterUrl = "https://image.tmdb.org/t/p/w500/";

  useEffect(() => {
    safeGET(`/content-manager/get-all-movie?page=${page}`)
      .then((response) => {
        console.log(response.data);
        setAllMovie(response.data);
      })
      .catch((error) => {
        console.log(
          "Error while import table from content manager get-all-movie ",
          error
        );
      });
  }, [page]);

  function populateTable() {
    return allMovie.data.map((singleMovie) => {
      return (
        <tr key={singleMovie.id}>
          <td>
            <div className="content-manager-title-img">
              <img src={posterUrl + singleMovie.posterPath} alt="img content" />
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
              <i className="fa-solid fa-pen content-manager-pen"></i>{" "}
              <i className="fa-solid fa-trash content-manager-trash"></i>
            </div>
          </td>
        </tr>
      );
    });
  }

  function getLanguageName(code) {
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

    return languageMap[code] || "Unknown language";
  }

  return allMovie ? (
    <div className="content-manager-container">
      <div className="content-manager-wrapper">
        <section className="content-manager-table-pagination">
          <div className="content-manager-table-title-actions">
            <div className="content-manager-table-title">
              <h1>Content Manager Dashboard</h1>
            </div>
            <div className="content-manager-table-actions">
              <div>
                <i class="fas fa-sliders-h"></i> Filter
              </div>
              <div>+Add Movie</div>
            </div>
          </div>
          <div className="content-manager-table-filters">
            <form>
              <div className="content-manager-table-single-filter">
                <label htmlFor="type-movie">Type Movie</label>
                <select id="type-movie" name="type-movie">
                  <option value="MOVIE">Movie</option>
                  <option value="TV_SHOW">Tv Show</option>
                </select>
              </div>

              <div className="content-manager-table-single-filter">
                <label htmlFor="order-by">Order By</label>
                <select id="order-by" name="order-by">
                  <option value="title">Movie Title</option>
                  <option value="language">Language</option>
                  <option value="releaseDate">Release Date</option>
                  <option value="status">Status</option>
                </select>
              </div>

              <div className="content-manager-table-single-filter">
                <label for="orderToggle">Order: Asceng/desceng</label>
                <label class="switch">
                  <input type="checkbox" id="orderToggle" />
                  <span class="slider"></span>
                </label>
              </div>

              <div className="content-manager-table-single-filter">
                <label htmlFor="row">Row Page</label>
                <select id="row" name="row">
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  <option value="50">50</option>
                </select>
              </div>
            </form>
          </div>
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
              <p>{`Showing ${allMovie.page + 1} to ${allMovie.size} of ${
                allMovie.totalPages
              } pages`}</p>
            </div>
            <div className="content-manager-pagination-button">
              <div
                title="Previous"
                onClick={() => (page > 0 ? setPage((prev) => prev - 1) : null)}
              >
                <i className="fa-solid fa-left-long"></i>
              </div>
              <div
                title="Next"
                onClick={() =>
                  page < allMovie.totalPages
                    ? setPage((prev) => prev + 1)
                    : null
                }
              >
                <i className="fa-solid fa-right-long"></i>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}
