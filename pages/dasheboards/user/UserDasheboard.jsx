import { useLocation } from "react-router-dom";

export default function UserDasheboard() {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  if (token !== null) {
    localStorage.setItem("token", token);
  }

  return <h1>User UserDasheboard</h1>;
}
