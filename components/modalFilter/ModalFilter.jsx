import CheckboxItem from "../CheckboxItem/CheckboxItem";
import RadioItem from "../RadioItem/RadioItem";
import "./modalFilter.scss";

export default function ModalFilter(props) {
  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const typeContent = formData.get("type");
    const genres = formData.getAll("genres");
    const language = formData.getAll("language");
    console.log(language)

    props.handleChangeContent(typeContent);
    props.handleChangeGenres(genres);
    props.handleChangeLanguage(language);
  }

  return (
    <div
      className={`modal-filter ${
        props.toggleModalFilter ? "modal-filter-show" : "modal-filter-hide"
      }`}
    >
      <h1>Filter</h1>

      <div className="modal-filter-separator" />

      <form onSubmit={handleSubmit}>
        <div className="modal-filter-type-quality">
          <div className="modal-filter-type">
            <h3>Type</h3>
            <ul>
              <RadioItem name="type" id="movies" value="MOVIE" defaultChecked  />
              <RadioItem name="type" id="tv-show" value="TV_SHOW" />
            </ul>
          </div>
        </div>

        <div className="modal-filter-separator" />

        <div className="modal-filter-genre">
          <h3>Genre:</h3>
          <div className="modal-filter-genres-checkbox">
            <ul>
              <CheckboxItem name="genres" id="action" value="action" />
              <CheckboxItem name="genres" id="adventure" value="adventure" />
              <CheckboxItem name="genres" id="biography" value="biography" />
              <CheckboxItem name="genres" id="fantasy" value="fantasy" />
              <CheckboxItem name="genres" id="drama" value="drama" />
              <CheckboxItem name="genres" id="kids" value="kids" />
              <CheckboxItem name="genres" id="mistery" value="mistery" />
              <CheckboxItem name="genres" id="history" value="history" />
              <CheckboxItem name="genres" id="reality" value="reality" />
              <CheckboxItem name="genres" id="war" value="war" />
              <CheckboxItem name="genres" id="horror" value="horror" />
            </ul>
          </div>
        </div>

        <div className="modal-filter-separator" />

        <div className="modal-filter-language">
          <h3>Languages:</h3>
          <div className="modal-filter-language-checkbox">
            <ul>
              <CheckboxItem name="language" id="argentina" value="es" />
              <CheckboxItem name="language" id="australia" value="en" />
              <CheckboxItem name="language" id="belgium" value="nl" />
              <CheckboxItem name="language" id="belgium-fr" value="fr" />
              <CheckboxItem name="language" id="belgium-de" value="de" />
              <CheckboxItem name="language" id="brazil" value="pt" />
              <CheckboxItem name="language" id="canada" value="en" />
              <CheckboxItem name="language" id="canada-fr" value="fr" />
              <CheckboxItem name="language" id="china" value="zh" />
              <CheckboxItem name="language" id="denmark" value="da" />
              <CheckboxItem name="language" id="russia" value="ru" />
              <CheckboxItem name="language" id="morocco" value="fr" />
              <CheckboxItem name="language" id="morocco-ar" value="ar" />
              <CheckboxItem name="language" id="thailand" value="th" />
              <CheckboxItem name="language" id="usa" value="en" />
            </ul>
          </div>
        </div>

        <div className="modal-filter-button">
          <button
            type="submit"
            className="modal-filter-button-filter"
            onClick={props.handleToggleModalFilter}
          >
            <i className="fa-solid fa-magnifying-glass"></i> Filter
          </button>
        </div>
      </form>
      <button
        onClick={props.handleToggleModalFilter}
        className="modal-filter-button-close"
      >
        <i className="fa-solid fa-xmark"></i> Close
      </button>
    </div>
  );
}
