import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { safePOST, safePUT } from "../../api/authenticatedApi";
import "./infoMovie.scss";
import api from "../../api/axiosConfig";
export default function InfoMovie({ posterUrl, state, isLogged }) {
  const [isFavorite, setIsFavorite] = useState();
  const [isLiked, setIsLiked] = useState();
  const navigate = useNavigate();

  function handleFavorite() {
    handleRedirectLogin();
    safePUT("/movie/favorite", {
      movieId: state.data.id,
      favorite: !isFavorite,
    })
      .then((response) => {
        setIsFavorite(response.data.data.favorite);
      })
      .catch((error) => {
        console.log("Error while adding like to the comment ", error);
      });
  }

  useEffect(() => {
    api
      .get(`/movie/isFavorite/${state.data.id}`)
      .then((response) => {
        setIsFavorite(response.data.data.favorite);
      })
      .catch((error) => {
        console.log(error);
      });

    api
      .get(`/movie/isLiked/${state.data.id}`)
      .then((response) => {
        setIsLiked(response.data.data.liked);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [state.data.id]);

  function getGenres() {
    const genresArray = [];
    for (let i = 0; i < state.data.genres.length; i++) {
      genresArray.push(state.data.genres[i].name);
    }
    return (
      <>
        {genresArray.map((genre) => {
          return (
            <a onClick={() => alert("I plan to implement it")} key={genre} to="." className="detail-page-info-genres-link">
              {genre}
            </a>
          );
        })}
      </>
    );
  }

  function handleRedirectLogin() {
    if (!isLogged) {
      alert("Redirect to login page");
      navigate("/login", {
        state: {
          redirectToContentDetailUrl: `/content-detail/${state.data.id}`,
          redirectData: state.data,
        },
      });
    }
  }

  function handleLikeMovie(isLiked) {
    handleRedirectLogin();
    safePUT("/movie/like", {
      movieId: state.data.id,
      liked: isLiked,
    }).then((response) => {
      setIsLiked(response.data.data.liked);
    });
  }

  return (
    <>
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
          <div
            className="detail-page-wrapper-button-circle"
            onClick={handleRedirectLogin}
          >
            <i className="fa-solid fa-circle-play"></i>
          </div>
          <div
            className="detail-page-wrapper-button-circle"
            onClick={() => handleLikeMovie(true)}
          >
            <i
              className={`fa-solid fa-thumbs-up ${
                isLiked === true ? "favorite-green" : null
              }`}
            ></i>
          </div>
          <div
            className="detail-page-wrapper-button-circle"
            onClick={() => handleLikeMovie(false)}
          >
            <i
              className={`fa-solid fa-thumbs-down ${
                isLiked === false ? "favorite-red" : null
              }`}
            ></i>
          </div>
          <div
            className="detail-page-wrapper-button-circle"
            onClick={() => handleFavorite()}
          >
            <i
              className={`fa-solid fa-star ${
                isFavorite ? "favorite-green" : null
              }`}
            ></i>
          </div>
        </div>
      </div>
    </>
  );
}
