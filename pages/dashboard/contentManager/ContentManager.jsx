import { useEffect, useRef, useState } from "react";
import { safeGET } from "../../../api/authenticatedApi";
import "./contentManager.scss";
import ContentManagerTable from "../../../components/contentManagerTable/ContentManagerTable";

// TODO -> aggiungere i click ai buttoni avanti e indietro per aggiornare la tabella
// Aggiungere ricerca per film
// Aggiungere toggle tra movie e tv show in quanto ora la ricerca di default è movie
// Fare filtri sulle colonne o sorting
// Aggiungere nuovo movie/tv show
// Cancellare riga
// Al click della penna aprire una modale o pagina dettaglio dove vede info come genere cast ecc... e li può modificare tutti
export default function ContentManager() {
  const [allMovie, setAllMovie] = useState(null);
  const [page, setPage] = useState(0); //Current page of table
  const [toggleFilters, setToggleFilters] = useState(false); //Show modal filter
  const [typeMovie, setTypeMovie] = useState("MOVIE"); //filter
  const [orderBy, setOrderBy] = useState("title"); //filter
  const [toggleOrder, setToggleOrder] = useState(true); //filter
  const [tableRowPage, setTableRowPage] = useState(10); //filter
  const [searchByTitle, setSearchByTitle] = useState(""); //filter
  const typingTimeoutRef = useRef();
  const [toggleShowInsertMovie, setToggleShowInsertMovie] = useState(false);
  const posterUrl = "https://image.tmdb.org/t/p/w500/";

  useEffect(() => {
    safeGET(
      `/content-manager/get-all-movie?page=${page}&typeMovie=${typeMovie}&sortBy=${orderBy}&ascending=${toggleOrder}&size=${tableRowPage}&title=${searchByTitle}`
    )
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
  }, [page, typeMovie, orderBy, toggleOrder, tableRowPage, searchByTitle]);

  return allMovie ? (
    <div className="content-manager-container">
      <div className="content-manager-wrapper">
        <ContentManagerTable
          allMovie={allMovie}
          setToggleFilters={setToggleFilters}
          toggleFilters={toggleFilters}
          setToggleShowInsertMovie={setToggleShowInsertMovie}
          setTypeMovie={setTypeMovie}
          setOrderBy={setOrderBy}
          orderBy={orderBy}
          setToggleOrder={setToggleOrder}
          toggleOrder={toggleOrder}
          setTableRowPage={setTableRowPage}
          tableRowPage={tableRowPage}
          typeMovie={typeMovie}
          setSearchByTitle={setSearchByTitle}
          page={page}
          setPage={setPage}
          posterUrl={posterUrl}
        />

        {toggleShowInsertMovie ? (
          <div className="show-modal-insert-new-movie">
            <h1>ciaoooo</h1>

            <div className="modal-filter-button">
              <button className="modal-filter-button-filter">
                <i className="fa-solid fa-magnifying-glass"></i> Filter
              </button>
              <button
                onClick={() => setToggleShowInsertMovie((prev) => !prev)}
                className="modal-filter-button-close"
              >
                <i className="fa-solid fa-xmark"></i> Close
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}
