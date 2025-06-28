import { useState } from "react";
import { safePOST, safeDelete } from "../../api/authenticatedApi";
import "./comments.scss";

export default function Comments(params) {
  const [replyingToId, setReplyingToId] = useState();
  const [commentRowPost, setCommentRowPost] = useState();

  function detailComment(prev, parent) {
    return (
      <div className={`comment-user-photo-info ${parent ? "parent" : "son"}`}>
        <div className="comment-user-photo">
          <img src={params.img_not_found} alt="photo user" />
        </div>

        <div className="comment-user-info">
          <h5 className="comment-user-info-name">{prev.user.username}</h5>
          <p className="comment-user-info-date">{prev.date}</p>
          <p className="comment-user-info-comment">{prev.content}</p>

          <div className="comment-user-actions">
            {prev.parentComment === null && (
              <div
                className="comment-user-action-reply"
                onClick={() =>
                  setReplyingToId(replyingToId === prev.id ? null : prev.id)
                }
              >
                <i className="fa-solid fa-reply"></i> <span>Reply</span>
              </div>
            )}
            <div
              className="comment-user-actions-likes-dislikes"
              onClick={() => params.handCommentLike(prev.id, true)}
            >
              <i
                className={`fa-solid fa-thumbs-up ${
                  prev.likedByCurrentUser &&
                  params.isLogged &&
                  prev.likedByCurrentUser !== null
                    ? "blue-icon"
                    : null
                }`}
              ></i>
              <p>{prev?.likes > 0 ? prev.likes : null}</p>
            </div>
            <div
              className="comment-user-actions-likes-dislikes"
              onClick={() => params.handCommentLike(prev.id, false)}
            >
              <i
                className={`fa-solid fa-thumbs-down ${
                  !prev.likedByCurrentUser &&
                  params.isLogged &&
                  prev.likedByCurrentUser !== null
                    ? "red-icon"
                    : null
                }`}
              ></i>
              <p>{prev.dislike > 0 ? prev.dislike : null}</p>
            </div>

            <div
              className="comment-user-action-delete"
              onClick={() => handleDelete(prev.id)}
            >
              <i className="fa-solid fa-trash"></i>
            </div>
          </div>
          {replyingToId === prev.id ? showReply(prev.id) : null}
        </div>
      </div>
    );
  }

  function handleDelete(idComment) {
    safeDelete(`/comments/delete/${idComment}`)
      .then((response) => {
        params.setRefresh((prev) => prev + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function showComment() {
    if (params.userComments === null || params.userComments.length <= 0) {
      return;
    }

    return params.userComments.map((prev, index) => {
      if (prev.parentComment === null) {
        return (
          <div className="comments-users" key={prev.id}>
            {detailComment(prev, true)}
            {params.userComments.map((prevSon) => {
              if (prev.id === prevSon.parentComment) {
                return (
                  <div className="div-wrapper-son" key={prevSon.id}>
                    {detailComment(prevSon, false)}
                  </div>
                );
              }
            })}
          </div>
        );
      }
    });
  }

  function handleOnChangeTextArea(e) {
    setCommentRowPost(e.target.value);
  }

  function handlePostCommit(id) {
    if (params.isLogged) {
      if (!commentRowPost.trim()) {
        alert("The comment can't be empty");
        setCommentRowPost(""); //When the user add empty space
        return;
      }
      safePOST("/comments/reply", {
        id: id,
        content: commentRowPost,
        movieId: params.movieId,
      })
        .then((response) => {
          params.setRefresh((prev) => prev + 1);
          console.log("Add comment ", response);
        })
        .catch((error) => {
          console.log("Error while adding comment ", error);
        });

      setCommentRowPost("");
    }
  }

  function showReply(id) {
    return (
      <div className="reply-comment">
        <textarea
          name="comment"
          id="comment"
          onChange={(e) => handleOnChangeTextArea(e)}
        ></textarea>
        <button
          onClick={() => handlePostCommit(id)}
          className="comment-post-button"
        >
          Post
        </button>
      </div>
    );
  }

  return <>{showComment()}</>;
}
