import { useContext, useEffect, useState } from "react";
import { safeGET, safePUT, safeDelete } from "../../../api/authenticatedApi";

import "./userDashboard.scss";
import { Link } from "react-router-dom";
import { LoginContext } from "../../../context/LoginContext";

export default function UserDasheboard() {
  const TAB = {
    FAVORITE: "favorite",
    COMMENT: "comment",
  };

  const [favoriteMovieData, setFavoriteMovieData] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const posterUrl = "https://image.tmdb.org/t/p/w500/";
  const [refresh, setRefresh] = useState(0);
  const [tab, setTab] = useState(TAB.FAVORITE);
  const { isLogged, setIsLogged } = useContext(LoginContext);

  function handleRemoveFavorite(movieId) {
    handleRedirectLogin();
    safePUT("/movie/favorite", {
      movieId: movieId,
      favorite: false,
    })
      .then((response) => {
        setRefresh((prev) => prev + 1);
      })
      .catch((error) => {
        console.log("Error while removing favorite to movie ", error);
      });
  }

  function handleDeleteComment(idComment) {
    safeDelete(`/comments/delete/${idComment}`)
      .then((response) => {
        setRefresh((prev) => prev + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function populateSingleComment() {
    const cards = [];
    for (let i = 0; i < commentData.length; i++) {
      const comment = commentData[i];
      cards.push(
        <div className="user-dashboard-comment" key={comment.id}>
          <div className="user-dashboard-comment-info">
            <div className="user-dashboard-comment-title-date">
              <h4>{comment.movieTitle}</h4>
              <span>{comment.date}</span>
            </div>
            <p>{comment.content}</p>
          </div>
          <button
            className="user-dashboard-comment-delete-button"
            onClick={() => handleDeleteComment(comment.id)}
          >
            Delete
          </button>
        </div>
      );
    }
    return cards.length > 0 ? cards : <p>No favorite movies found</p>;
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

  function populateSingleCard() {
    const cards = [];
    for (let i = 0; i < favoriteMovieData.length; i++) {
      const movie = favoriteMovieData[i];
      cards.push(
        <div className="home-view-single-card-link-wrapper" key={movie.id}>
          <div className="home-view-single-card">
            <div className="poster-rate-title">
              <img src={posterUrl + movie.posterPath} alt="slider-photo" />
              <h4 className="home-view-single-title-card">{movie.title}</h4>
            </div>

            <Link to={`/content-detail/${movie.id}`} state={{ data: movie }}>
              <div className="home-view-card-button">
                <i className="fa-solid fa-play"></i>
                <button>Watch now</button>
              </div>
            </Link>
            <div
              className="home-view-card-button"
              onClick={() => handleRemoveFavorite(movie.id)}
            >
              <i className="fa-solid fa-xmark"></i>
              <button>Remove</button>
            </div>
          </div>
        </div>
      );
    }
    return cards.length > 0 ? cards : <p>No favorite movies found</p>;
  }

  useEffect(() => {
    safeGET("/user-dashboard/get-all-favorite")
      .then((response) => {
        console.log(response);
        setFavoriteMovieData(response.data.data);
      })
      .catch((error) => {
        console.log(
          "Error while import favorite from user dashboard get-all-favorite ",
          error
        );
      })
      .finally(() => {
        setLoading(false);
      });

    safeGET("/user-dashboard/get-all-comment")
      .then((response) => {
        console.log(response);
        setCommentData(response.data.data);
      })
      .catch((error) => {
        console.log(
          "Error while import comment from user dashboard get-all-comment ",
          error
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refresh]);

  const nameUser =
    localStorage.getItem("username") !== null
      ? localStorage.getItem("username")
      : "Not logged";

  return !loading ? (
    <div className="user-dashboard">
      <h1>Hi {nameUser}!</h1>
      <div className="user-dashboard-tabs">
        <h3
          className={tab === TAB.FAVORITE ? "user-dashboard-tabs-active" : null}
          onClick={() => setTab(TAB.FAVORITE)}
        >
          Favorite
        </h3>
        <h3
          className={tab === TAB.COMMENT ? "user-dashboard-tabs-active" : null}
          onClick={() => setTab(TAB.COMMENT)}
        >
          Comments
        </h3>
      </div>
      {tab === TAB.FAVORITE ? (
        <div className="user-dashboard-favorite">{populateSingleCard()}</div>
      ) : null}

      {tab === TAB.COMMENT ? (
        <div className="user-dashboard-comment-wrapper">
          {populateSingleComment()}
        </div>
      ) : null}
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}
