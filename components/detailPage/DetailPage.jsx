import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
import api from "../../api/axiosConfig";
import "./detailPage.scss";
import img_not_found from "../../src/images/img_not_found.png";

export default function DetailPage() {
  const { state } = useLocation();
  const [comment, setComment] = useState("");
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
    setComment(e.target.value);
  }

  function handlePostCommit() {
    if (!comment.trim()) {
      alert("The comment can't be empty");
      setComment(""); //When the user add empty space
      return;
    }
    api
      .post("http://192.168.1.10:8080/comments/add", {
        content: comment,
      })
      .then((response) => {
        alert("Comment added");
        console.log("Add comment ", response);
      })
      .catch((error) => {
        console.log("Error while adding comment ", error);
      });

    setComment("");
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
          <h1>Comments</h1>
          <div className="comment-container">
            <div className="comment-wrapper">
              <div className="comment-add">
                <div className="comment-add-photo-input">
                  <div className="comment-add-photo">
                    <img src={img_not_found} alt="photo user" />
                  </div>
                  <div className="comment-add-input">
                    <h4>Mario Rossi</h4>
                    <textarea
                      name="comment"
                      id="comment"
                      placeholder="Leave a comment"
                      value={comment}
                      onChange={(e) => handleOnChangeTextArea(e)}
                    ></textarea>
                    <button
                      onClick={() => handlePostCommit()}
                      className="comment-post-button"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>

              <div className="comments-users">
                <div className="comment-user-photo-info">

                  <div className="comment-user-photo">
                    <img src={img_not_found} alt="photo user" />
                  </div>

                  <div className="comment-user-info">
                    <h5>Mario rossi</h5>
                    <p>4 Days ago</p>
                    <p>Commento bellissimo film</p>
                  </div>

                  <div className="comment-user-actions">
                    <div className="comment-user-action-reply">
                      <i class="fa-solid fa-reply"></i> <span>Reply</span>
                    </div>
                    <i class="fa-solid fa-thumbs-up"></i>
                    <i class="fa-solid fa-thumbs-down"></i>
                    <p>More</p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
