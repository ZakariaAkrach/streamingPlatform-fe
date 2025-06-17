import { Link, useLocation } from "react-router-dom";
import { safePUT } from "../../api/authenticatedApi";
import "./editContent.scss";

export default function EditContent() {
  const { state } = useLocation();

  console.log(state.data);

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const id = state.data.id;
    const titleValue = formData.get("title");
    const descriptionValue = formData.get("description");
    const activeValue = formData.get("active") === "on";
    const languageValue = formData.get("language");
    const releaseDateValue = formData.get("releaseDate");
    const runtimeValue = formData.get("runtime");
    const typeMovieValue = formData.get("typeMovie");

    const movieDTO = {
      id: id,
      title: titleValue,
      description: descriptionValue,
      active: activeValue,
      language: languageValue,
      releaseDate: releaseDateValue,
      runtime: runtimeValue,
      typeMovie: typeMovieValue,
    };

    safePUT("/content-manager/modify", movieDTO)
      .then((response) => {
        console.log("Movie updated:", response);
      })
      .catch((error) => {
        console.error("Error updating movie:", error);
      });
  }

  function linkReturnBack() {
    return (
      <Link
        className="edit-content-return"
        state={{
          page: state.page,
          tableRowPage: state.tableRowPage,
          orderBy: state.orderBy,
          toggleOrder: state.toggleOrder,
          typeMovie: state.typeMovie,
          searchByTitle: state.searchByTitle,
        }}
        to={"/content-manager"}
      >
        🡐 Return Back
      </Link>
    );
  }

  return (
    <div className="edit-content">
      {linkReturnBack()}
      <br />
      <br />
      <p>
        You can't mofied the poster photo since i use the path from the movie db
      </p>
      <form onSubmit={handleSubmit}>
        <div className="edit-content-single-form">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={state.data.title}
          />
        </div>

        <div className="edit-content-single-form">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            rows={5}
            defaultValue={state.data.description}
          />
        </div>

        <div className="edit-content-single-form">
          <label htmlFor="active">Active</label>
          <input
            type="checkbox"
            name="active"
            id="active"
            defaultChecked={state.data.active}
          />
        </div>

        <div className="edit-content-single-form">
          <label htmlFor="language">Language</label>
          <select
            name="language"
            id="language"
            defaultValue={state.data.language}
          >
            {Object.entries(state.languageMap).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="edit-content-single-form">
          <label htmlFor="releaseDate">Release Date</label>
          <input
            type="date"
            name="releaseDate"
            id="releaseDate"
            defaultValue={state.data.releaseDate}
          />
        </div>

        <div className="edit-content-single-form">
          <label htmlFor="runtime">Runtime (minutes)</label>
          <input
            type="number"
            name="runtime"
            id="runtime"
            defaultValue={state.data.runtime}
            min={0}
          />
        </div>

        <div className="edit-content-single-form">
          <label htmlFor="typeMovie">Type Movie</label>
          <select
              id="typeMovie"
              name="typeMovie"
              defaultValue={state.data.typeMovie}
            >
              <option value="MOVIE">Movie</option>
              <option value="TV_SHOW">Tv Show</option>
            </select>
        </div>

        <button type="submit">Save</button>
        {linkReturnBack()}
      </form>
    </div>
  );
}
