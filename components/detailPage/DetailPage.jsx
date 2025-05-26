import { useLocation, Link } from "react-router-dom";
import { nanoid } from "nanoid";
import "./detailPage.scss";
import img_not_found from "../../src/images/img_not_found.png";

export default function DetailPage() {
  const { state } = useLocation();
  const posterUrl = "https://image.tmdb.org/t/p/original/";
  const imgCastUrl = "https://image.tmdb.org/t/p/original/";
  console.log(state);

  function getGenres() {
    const genresArray = [];
    for (let i = 0; i < state.data.genres.length; i++) {
      genresArray.push(state.data.genres[i].name);
    }
    return (
      <>
        {genresArray.map((genre, id) => {
          return (
            <Link key={nanoid()} className="detail-page-info-genres-link">
              {genre}
            </Link>
          );
        })}
      </>
    );
  }

  function getCast() {
    const movieCastArray = [];
    for (let i = 0; i < state.data.movieCast.length; i++) {
      movieCastArray.push(state.data.movieCast[i]);
    }

    return movieCastArray.map((movieCast) => {
      return (
        <div key={movieCast.id} className="cast-card">
          <div className="cast-card-wrapper">
            <div className="cast-card-img">
              <img
                src={
                  movieCast.cast.profile_path != null
                    ? imgCastUrl + movieCast.cast.profile_path
                    : img_not_found
                }
                alt="image cast"
              />
            </div>
            <div className="cast-card-info">
              <h5 className="cast-card-info-titles">{movieCast.cast.name}</h5>
              <h6 className="cast-card-info-titles">{movieCast.characterName}</h6>
            </div>
          </div>
        </div>
      );
    });
  }
  return (
    <div className="detail-page-container">
      <div className="detail-page-wrapper">
        <section className="detail-page-wrapper-image-info">
          <img
            className="detail-page-principal-img"
            src={posterUrl + state.data.backdropPath}
            alt="image background detail content"
          />

          <div className="detail-page-wrapper-info">
            <h1>{state.data.title}</h1>
            <p>{state.data.description}</p>

            <div className="detail-page-info-button-wrapper">
              <button className="detail-page-info-button">
                {state.data.typeMovie}
              </button>
              <button className="detail-page-info-button">
                {state.data.language.toUpperCase()}
              </button>
              <button className="detail-page-info-button">
                {state.data.runtime + " h"}
              </button>
              <button className="detail-page-info-button">
                {new Date(state.data.releaseDate).getFullYear()}
              </button>
            </div>
            <div className="detail-page-wrapper-links">{getGenres()}</div>

            <div className="detail-page-wrapper-button">
              <div className="detail-page-wrapper-button-circle">
                <i className="fa-solid fa-circle-play"></i>
              </div>
              <div className="detail-page-wrapper-button-circle">
                <i className="fa-solid fa-thumbs-up"></i>
              </div>
              <div className="detail-page-wrapper-button-circle">
                <i className="fa-solid fa-thumbs-down"></i>
              </div>
              <div className="detail-page-wrapper-button-circle">
                <i className="fa-solid fa-star"></i>
              </div>
            </div>
          </div>
        </section>

        <section className="detail-page-cast">
          <h1>Cast</h1>
          <div className="detail-page-cast-image-role-scroll-horizontal">
            {getCast()}
          </div>
        </section>

        <section>
          <h1>Section comment</h1>
        </section>
      </div>
    </div>
  );
}
