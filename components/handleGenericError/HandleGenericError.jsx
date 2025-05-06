import { useRouteError } from "react-router-dom";
import "./handleGenericError.scss";

export default function HandleGenericError() {
  const error = useRouteError();

  return (
    <>
      <h1>Errore generico : {error.message}</h1>
      <pre>
        {error.status} - {error.statusText}
      </pre>
    </>
  );
}
