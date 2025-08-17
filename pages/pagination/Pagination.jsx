import { useEffect, useState } from "react";
import SingleCard from "../../components/singleCard/SingleCard";
import ModalFilter from "../../components/modalFilter/ModalFilter";
import "./pagination.scss";
import PaginationControl from "../../components/paginationControl/PaginationControl";
import api from "../../api/axiosConfig";

export default function Pagination() {
  const [toggleModalFilter, setToggleModalFilter] = useState(false);
  const [actualPage, setActualPage] = useState(1);
  const [loopStart, setLoopStart] = useState(1);

  const [typeMovie, setTypeMovie] = useState("MOVIE"); //filter
  const [tableRowPage, setTableRowPage] = useState(40); //filter
  const [searchByTitle, setSearchByTitle] = useState(""); //filter

  const [searchByGenre, setSearchByGenre] = useState([]); //filter content
  const [searchByLanguages, setSearchByLanguages] = useState([]); //filter content

  const [allContent, setAllContent] = useState([]);

  function handleToggleModalFilter() {
    setToggleModalFilter((prev) => !prev);
  }

  function handleChangeContent(type) {
    setTypeMovie(type);
  }

  function handleChangeGenres(type) {
    setSearchByGenre(type);
  }

  function handleChangeLanguage(type) {
    setSearchByLanguages(type);
  }

  useEffect(() => {
    const params = new URLSearchParams();

    params.append("page", actualPage);
    params.append("typeMovie", typeMovie);
    params.append("size", tableRowPage);
    params.append("title", searchByTitle);

    searchByGenre.forEach((g) => params.append("genres", g));
    searchByLanguages.forEach((l) => params.append("languages", l));

    const queryString = params.toString();
    const url = "/movie/get-all-movie" + (queryString ? `?${queryString}` : "");

    api
      .get(url)
      .then((response) => {
        setAllContent(response.data.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(
          "Error while import table from content manager get-all-movie ",
          error
        );
      });
  }, [actualPage, typeMovie, tableRowPage, searchByTitle, searchByGenre, searchByLanguages]);

  function showCardFromAllContent() {
    return allContent && allContent.length > 0 ? (
      allContent.map((content) => (
        <SingleCard key={content.id} id={content.id} data={content} />
      ))
    ) : (
      <p className="no-data-present">No data present</p>
    );
  }

  return (
    <div className="pagination-container">
      <div className="pagination-title-and-filter">
        <h1 className="pagination-title">Popular Tv Shows</h1>
        <i onClick={handleToggleModalFilter} className="fa-solid fa-filter"></i>
      </div>

      <PaginationControl
        actualPage={actualPage}
        setActualPage={setActualPage}
        loopStart={loopStart}
        setLoopStart={setLoopStart}
      />

      <section className="pagination-views-movies">
        <div className="pagination-view-cards">{showCardFromAllContent()}</div>
      </section>

      <PaginationControl
        actualPage={actualPage}
        setActualPage={setActualPage}
        loopStart={loopStart}
        setLoopStart={setLoopStart}
      />

      <ModalFilter
        toggleModalFilter={toggleModalFilter}
        handleToggleModalFilter={handleToggleModalFilter}
        handleChangeContent={handleChangeContent}
        handleChangeGenres={handleChangeGenres}
        handleChangeLanguage={handleChangeLanguage}
      />
    </div>
  );
}
