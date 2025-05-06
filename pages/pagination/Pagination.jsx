import { useState } from "react";
import SingleCard from "../../components/singleCard/SingleCard";
import ModalFilter from "../../components/modalFilter/ModalFilter"
import "./pagination.scss";
import PaginationControl from "../../components/paginationControl/PaginationControl";

export default function Pagination() {
  const [toggleModalFilter, setToggleModalFilter] = useState(false);
  const [actualPage, setActualPage] = useState(1);
  const [loopStart, setLoopStart] = useState(1);

  function handleToggleModalFilter() {
    setToggleModalFilter((prev) => !prev);
  }

  return (
    <div className="pagination-container">
      <div className="pagination-title-and-filter">
        <h1 className="pagination-title">Popular Tv Shows</h1>
        <i onClick={handleToggleModalFilter} className="fa-solid fa-filter"></i>
      </div>

      <PaginationControl actualPage={actualPage} setActualPage={setActualPage} loopStart={loopStart} setLoopStart={setLoopStart} />
      
      <section className="pagination-views-movies">
        <div className="pagination-view-cards">
          <SingleCard />
          <SingleCard />
          <SingleCard />
          <SingleCard />
          <SingleCard />
          <SingleCard />
          <SingleCard />
          <SingleCard />
          <SingleCard />
        </div>
      </section>

      <PaginationControl actualPage={actualPage} setActualPage={setActualPage} loopStart={loopStart} setLoopStart={setLoopStart} />
      

      <ModalFilter
        toggleModalFilter={toggleModalFilter}
        handleToggleModalFilter={handleToggleModalFilter}
      />
    </div>
  );
}
