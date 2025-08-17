import "./radioItem.scss";

export default function RadioItem(props) {
  return (
    <li>
      <input type="radio" name={props.name} id={props.id} value={props.value} defaultChecked={props.defaultChecked} />{" "}
      <label className="cursor" htmlFor={props.id}>
        {props.value.slice(0,1).toUpperCase() + props.value.slice(1)}
      </label>
    </li>
  );
}
