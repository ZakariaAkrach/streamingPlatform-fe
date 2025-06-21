import { useEffect, useState } from "react";
import { safeGET } from "../../../api/authenticatedApi";
import "./contentManager.scss";
import ContentManagerTable from "../../../components/contentManagerTable/ContentManagerTable";
import { useLocation } from "react-router-dom";
import AddMovie from "../../../components/addMovie/AddMovie";

export default function ContentManager() {
  const { state } = useLocation();

  const [allMovie, setAllMovie] = useState(null);
  const [page, setPage] = useState(state?.page ?? 0); //Current page of table
  const [toggleFilters, setToggleFilters] = useState(state?.toggleFilters ?? false); //Show modal filter
  const [typeMovie, setTypeMovie] = useState(state?.typeMovie ?? "MOVIE"); //filter
  const [orderBy, setOrderBy] = useState(state?.orderBy ?? "title"); //filter
  const [toggleOrder, setToggleOrder] = useState(state?.toggleOrder ?? true); //filter
  const [tableRowPage, setTableRowPage] = useState(state?.tableRowPage ?? 10); //filter
  const [searchByTitle, setSearchByTitle] = useState(state?.searchByTitle ?? ""); //filter
  const [toggleShowInsertMovie, setToggleShowInsertMovie] = useState(false);
  const posterUrl = "https://image.tmdb.org/t/p/w500/";

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

    function resetFiltersToDefault() {
    setPage(0);
    setToggleFilters(false);
    setTypeMovie("MOVIE");
    setOrderBy("title");
    setToggleOrder(true);
    setTableRowPage(10);
    setSearchByTitle("");
  }

  useEffect(() => {
    safeGET(
      `/content-manager/get-all-movie?page=${page}&typeMovie=${typeMovie}&sortBy=${orderBy}&ascending=${toggleOrder}&size=${tableRowPage}&title=${searchByTitle}`
    )
      .then((response) => {
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
          setAllMovie={setAllMovie}
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
          searchByTitle={searchByTitle}
          page={page}
          setPage={setPage}
          posterUrl={posterUrl}
          resetFiltersToDefault={resetFiltersToDefault}
          languageMap={languageMap}
        />

        {toggleShowInsertMovie ? (
          <AddMovie 
          setToggleShowInsertMovie={setToggleShowInsertMovie}
          posterUrl={posterUrl} 
          languageMap={languageMap} />
        ) : null}
      </div>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}
