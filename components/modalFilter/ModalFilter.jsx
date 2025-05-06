import CheckboxItem from "../CheckboxItem/CheckboxItem";
import RadioItem from "../RadioItem/RadioItem";
import "./modalFilter.scss";

export default function ModalFilter(props) {
  return (
    <div
      className={`modal-filter ${
        props.toggleModalFilter ? "modal-filter-show" : "modal-filter-hide"
      }`}
    >
      <h1>Filter</h1>

      <div className="modal-filter-separator" />

      <div className="modal-filter-type-quality">
        <div className="modal-filter-type">
          <h3>Type</h3>
          <ul>
            <RadioItem name="type" id="all-type" value="all" />
            <RadioItem name="type" id="movies" value="movies" />
            <RadioItem name="type" id="tv-show" value="tv show" />
          </ul>
        </div>

        <div className="modal-filter-quality">
          <h3>Quality</h3>
          <ul>
            <RadioItem name="quality" id="all-quality" value="all" />
            <RadioItem name="quality" id="hd" value="hd" />
            <RadioItem name="quality" id="sd" value="sd" />
            <RadioItem name="quality" id="cam" value="cam" />
          </ul>
        </div>
      </div>

      <div className="modal-filter-separator" />

      <div className="modal-filter-released">
        <h3>Released:</h3>
        <ul>
          <RadioItem name="released" id="all-released" value="all" />
          <RadioItem name="released" id="2025" value="2025" />
          <RadioItem name="released" id="2024" value="2024" />
          <RadioItem name="released" id="2023" value="2023" />
          <RadioItem name="released" id="2022" value="2022" />
          <RadioItem name="released" id="2021" value="2021" />
          <RadioItem name="released" id="older" value="older" />
        </ul>
      </div>

      <div className="modal-filter-separator" />

      <div className="modal-filter-genre">
        <h3>Genre:</h3>
        <div className="modal-filter-genres-checkbox">
          <ul>
            <CheckboxItem name="action" id="action" />
            <CheckboxItem name="adventure" id="adventure" />
            <CheckboxItem name="biography" id="biography" />
            <CheckboxItem name="fantasy" id="fantasy" />
            <CheckboxItem name="drama" id="drama" />
            <CheckboxItem name="kids" id="kids" />
            <CheckboxItem name="mistery" id="mistery" />
            <CheckboxItem name="history" id="history" />
            <CheckboxItem name="reality" id="reality" />
            <CheckboxItem name="war" id="war" />
            <CheckboxItem name="horror" id="horror" />
          </ul>
        </div>
      </div>

      <div className="modal-filter-separator" />

      <div className="modal-filter-country">
        <h3>Country:</h3>
        <div className="modal-filter-country-checkbox">
          <ul>
            <CheckboxItem name="argentina" id="argentina" />
            <CheckboxItem name="australia" id="australia" />
            <CheckboxItem name="belgium" id="belgium" />
            <CheckboxItem name="brazil" id="brazil" />
            <CheckboxItem name="canada" id="canada" />
            <CheckboxItem name="china" id="china" />
            <CheckboxItem name="denmark" id="denmark" />
            <CheckboxItem name="russia" id="russia" />
            <CheckboxItem name="morocco" id="morocco" />
            <CheckboxItem name="thailand" id="thailand" />
            <CheckboxItem name="usa" id="usa" />
          </ul>
        </div>
      </div>

      <div className="modal-filter-button">
        <button className="modal-filter-button-filter">
          <i className="fa-solid fa-magnifying-glass"></i> Filter
        </button>
        <button onClick={props.handleToggleModalFilter} className="modal-filter-button-close">
          <i className="fa-solid fa-xmark"></i> Close
        </button>
      </div>
    </div>
  );
}
