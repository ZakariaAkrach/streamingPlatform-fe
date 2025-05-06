import "./checkboxItem.scss";

export default function CheckboxItem(props) {
  return (
    <li>
      <input type="checkbox" name={props.name} id={props.id} />{" "}
      <label className="cursor" htmlFor={props.id}>
        {props.id.slice(0,1).toUpperCase() + props.id.slice(1)}
      </label>
    </li>
  );
}
