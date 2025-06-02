import { useLocation, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { safeGET, safePOST, safePUT } from "../../api/authenticatedApi";
import api from "../../api/axiosConfig";
import "./detailPage.scss";
import img_not_found from "../../src/images/img_not_found.png";
import { LoginContext } from "../../context/LoginContext";
import Comments from "../comments/Comments";

export default function DetailPage() {
  const { state } = useLocation();
  const [commentPost, setCommentPost] = useState("");
  const [userComments, setUserComments] = useState([]);
  const { isLogged, setIsLogged } = useContext(LoginContext);
  const navigate = useNavigate();
  const posterUrl = "https://image.tmdb.org/t/p/original/";
  const imgCastUrl = "https://image.tmdb.org/t/p/w500/";

  function getGenres() {
    const genresArray = [];
    for (let i = 0; i < state.data.genres.length; i++) {
      genresArray.push(state.data.genres[i].name);
    }
    return (
      <>
        {genresArray.map((genre) => {
          return (
            <Link key={genre} className="detail-page-info-genres-link">
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
              <h6 className="cast-card-info-titles">
                {movieCast.characterName}
              </h6>
            </div>
          </div>
        </div>
      );
    });
  }

  function handleOnChangeTextArea(e) {
    setCommentPost(e.target.value);
  }

  function handlePostCommit() {
    if (isLogged) {
      if (!commentPost.trim()) {
        alert("The comment can't be empty");
        setCommentPost(""); //When the user add empty space
        return;
      }
      safePOST("/comments/add", {
        content: commentPost,
        movieId: state.data.id,
      })
        .then((response) => {
          alert("Comment added");
          console.log("Add comment ", response);
        })
        .catch((error) => {
          console.log("Error while adding comment ", error);
        });

      setCommentPost("");
    }
  }

  function handLike(commentId, liked) {
    if (isLogged) {
      safePUT("/comments/like", {
        commentId: commentId,
        liked: liked,
      })
        .then((response) => {
          console.log("zaaaak ",userComments)
          setUserComments((prev) =>
            prev.map((singleComment) => {
              if (singleComment.id === response.data.data?.commentId) {
                return {
                  ...singleComment,
                  likedByCurrentUser: response.data.data.liked,
                };
              }
              return singleComment;
            })
          );
        })
        .catch((error) => {
          console.log("Error while adding like to the comment ", error);
        });
    }
  }

  useEffect(() => {
    api
      .get(`/comments/get-all-by-content/${state.data.id}`)
      .then((response) => {
        setUserComments(response.data.data);
      })
      .catch((error) => {
        console.log("get-all-by-content error: " + error);
      });
  }, [state.data.id]);

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
          <h1>Comments</h1>
          <div className="comment-container">
            <div className="comment-wrapper">
              <div className="comment-add">
                <div className="comment-add-photo-input">
                  <div className="comment-add-photo">
                    <img src={img_not_found} alt="photo user" />
                  </div>
                  <div className="comment-add-input">
                    <h4>{localStorage.getItem("username") !== null ? localStorage.getItem("username") : "Not logged"}</h4>
                    <textarea
                      name="comment"
                      id="comment"
                      placeholder={
                        isLogged
                          ? "Leave a comment"
                          : "You need to be logged in to post."
                      }
                      value={commentPost}
                      onChange={(e) => handleOnChangeTextArea(e)}
                      disabled={!isLogged}
                    ></textarea>
                    <button
                      onClick={() => handlePostCommit()}
                      className="comment-post-button"
                    >
                      {isLogged ? "Post" : "Log in"}
                    </button>
                  </div>
                </div>
              </div>

              {
                <Comments
                  userComments={userComments}
                  img_not_found={img_not_found}
                  isLogged={isLogged}
                  handLike={handLike}
                  movieId={state.data.id}
                />
              }
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
