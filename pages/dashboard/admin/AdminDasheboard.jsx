import { safeGET, safePUT, safePOST } from "../../../api/authenticatedApi";
import "./adminDaheboard.scss";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function AdminDasheboard() {
  const [topFavoriteContent, setTopFavoriteContent] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [topNumber, setTopNumber] = useState(5);
  const [typeMovie, setTypeMovie] = useState("MOVIE");

  const [toggleFilters, setToggleFilters] = useState(false);
  const [toggleShowInsertUser, setToggleShowInsertUser] = useState(false);
  const [searchByName, setSearchByName] = useState("");
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState("id");
  const [toggleOrder, setToggleOrder] = useState(true);
  const [tableRowPage, setTableRowPage] = useState(10);
  const [refreshPage, setRefreshPage] = useState(0);
  const [toggleShowPassword, setToggleShowPassword] = useState(false);

  useEffect(() => {
    safeGET(
      `/admin-dashboard/get-top-5-content/${typeMovie}?topNumber=${topNumber}`
    ).then((response) => {
      setTopFavoriteContent(response.data.data);
    });

    safeGET(
      `/admin-dashboard/get-all-users?page=${page}&&size=${tableRowPage}&&sortBy=${orderBy}&&ascending=${toggleOrder}&&username=${searchByName}`
    ).then((response) => {
      setDataUser(response.data.data);
    });
  }, [
    typeMovie,
    topNumber,
    page,
    tableRowPage,
    orderBy,
    toggleOrder,
    searchByName,
    refreshPage,
  ]);

  const hasData = topFavoriteContent && topFavoriteContent.length > 0;

  const data = hasData
    ? {
        labels: topFavoriteContent.map((content) => content.title),
        datasets: [
          {
            label: `Top ${topNumber}`,
            data: topFavoriteContent.map((content) => content.favoriteCount),
            backgroundColor: [
              "#ff4c4c",
              "#ffa534",
              "#34c759",
              "#5ac8fa",
              "#af52de",
            ],
            borderRadius: 5,
          },
        ],
      }
    : null;

  const maxFavorite = hasData
    ? Math.max(...topFavoriteContent.map((content) => content.favoriteCount))
    : 0;

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: maxFavorite * 1.2,
        title: {
          display: true,
          text: "Favorite",
        },
      },
    },
  };

  function populateTable() {
    if (!dataUser || dataUser.length === 0) {
      return (
        <tr>
          <td colSpan="6" style={{ textAlign: "center", padding: "1rem" }}>
            No content found.
          </td>
        </tr>
      );
    }

    return dataUser.map((user) => {
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.role}</td>
          <td>{user.active ? "Active" : "Disabled"}</td>
          <td>
            {user.active ? (
              <button
                className="admin-dashboard-table-disable"
                onClick={() => changeUserStatus(false, user.id)}
              >
                Disable
              </button>
            ) : (
              <button
                className="admin-dashboard-table-enable"
                onClick={() => changeUserStatus(true, user.id)}
              >
                Enable
              </button>
            )}
          </td>
        </tr>
      );
    });
  }

  function changeUserStatus(userStatus, id) {
    safePUT(
      `/admin-dashboard/change-users-status/${id}?userStatus=${userStatus}`
    )
      .then((response) => {
        setRefreshPage((prev) => prev + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function resetFiltersToDefault() {
    setSearchByName("");
    setOrderBy("id");
    setToggleOrder(true);
    setTableRowPage(10);
  }

  function insertNewUser (e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const email = formData.get("email");
    const username = formData.get("username");
    const role = formData.get("role");
    const password = formData.get("password");

    safePOST(
      `/admin-dashboard/register`,
      {email : email,
       username : username,
       role : role,
       password : password
      })
      .then((response) => {
        console.log("Movie updated:", response);
      })
      .catch((error) => {
        console.error("Error updating movie:", error);
      });
  }

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-wrapper">
        <div className="admin-dashboard-container-bar">
          <h1 className="a">Favorite Content</h1>
          <div className="admin-dashboard-bar-filter">
            <select
              id="type-movie"
              name="type-movie"
              value={typeMovie}
              onChange={(e) => setTypeMovie(e.target.value)}
            >
              <option value="MOVIE">Movie</option>
              <option value="TV_SHOW">Tv Show</option>
            </select>

            <div className="admin-ddashboard-bar-filter-top-number">
              <label htmlFor="topNumber">Top</label>
              <select
                id="topNumber"
                name="topNumber"
                value={topNumber}
                onChange={(e) => setTopNumber(e.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
          {hasData ? (
            <Bar data={data} options={options} />
          ) : (
            <p>No data available</p>
          )}
        </div>

        <div className="admin-dashboard-table-user">
          <div className="admin-dashboard-table-title-actions">
            <div className="admin-dashboard-table-title">
              <h1>Users</h1>
            </div>
            <div className="admin-dashboard-table-actions">
              <div
                className="admin-dashboard-table-actions-filter"
                onClick={() => setToggleFilters((prev) => !prev)}
              >
                <i className="fas fa-sliders-h"></i> Filter
              </div>
              <div
                className="admin-dashboard-table-actions-filter"
                onClick={resetFiltersToDefault}
              >
                <i className="fa-solid fa-filter-circle-xmark"></i> Reset
                Filters
              </div>
              <div
                className="admin-dashboard-table-actions-add-new-user"
                onClick={() => setToggleShowInsertUser((prev) => !prev)}
              >
                <i className="fa-solid fa-plus"></i> Add User
              </div>
            </div>
          </div>

          {toggleFilters ? (
            <div className="admin-dashboard-table-filters">
              <div className="admin-dashboard-table-single-filter-search">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  type="search"
                  placeholder="Search User"
                  aria-label="Search"
                  onChange={(e) => {
                    setSearchByName(e.target.value);
                    setPage(0);
                  }}
                />
              </div>

              <div className="admin-dashboard-table-single-filter admin-dashboard-select">
                <label htmlFor="order-by">Order By</label>
                <select
                  id="order-by"
                  name="order-by"
                  value={orderBy}
                  onChange={(e) => setOrderBy(e.target.value)}
                >
                  <option value="id">Id</option>
                  <option value="username">Username</option>
                  <option value="email">Email</option>
                  <option value="role">Role</option>
                </select>
              </div>

              <div className="admin-dashboard-table-single-filter">
                <label htmlFor="orderToggle">
                  Order: {toggleOrder ? "Ascending" : "Descending"}
                </label>
                <label className="switch">
                  <input
                    type="checkbox"
                    id="orderToggle"
                    checked={toggleOrder}
                    onChange={() => setToggleOrder((prev) => !prev)}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="admin-dashboard-table-single-filter admin-dashboard-select">
                <label htmlFor="row">Row Page</label>
                <select
                  id="row"
                  name="row"
                  value={tableRowPage}
                  onChange={(e) => setTableRowPage(e.target.value)}
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>
          ) : null}

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{populateTable()}</tbody>
          </table>

          {toggleShowInsertUser ? (
            <div className="show-modal-insert-new-movie">
              <h1>Add New User</h1>

              <form className="admin-dashboard-form" onSubmit={insertNewUser}>
                <div className="admin-dashboard-form-content-wrapper">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    aria-label="email input"
                    autoComplete="email"
                    required={true}
                  />
                </div>

                <div className="admin-dashboard-form-content-wrapper">
                  <label htmlFor="username">Username</label>
                  <input
                    type="username"
                    name="username"
                    id="username"
                    aria-label="username input"
                    autoComplete="username"
                    required={true}
                  />
                </div>

                <div className="admin-dashboard-form-content-wrapper">
                  <label htmlFor="role">Role</label>
                  <select id="role" name="role">
                    <option value="ADMIN">ADMIN</option>
                    <option value="CONTENT_MANAGER">CONTENT_MANAGER</option>
                  </select>
                </div>

                <div className="admin-dashboard-form-content-wrapper">
                      <label htmlFor="password">Password</label>
                  <div className="wrapper-password-show">
                    <div className="wrapper-password">
                      <input type={toggleShowPassword ? "text" : "password"} name="password" id="password" />
                    </div>
                    <div className="wrapper-show">
                      <i
                        className={
                          toggleShowPassword
                            ? "fa-solid fa-eye"
                            : "fa-solid fa-eye-slash"
                        }
                        onClick={() => setToggleShowPassword(prev => !prev)}
                      />
                    </div>
                  </div>
                </div>

                <button
                type="submit"
                className="modal-filter-button-close blue"
              >
                <i className="fa-solid fa-floppy-disk"></i> Save
              </button>
              </form>

              <button
                onClick={() => setToggleShowInsertUser((prev) => !prev)}
                className="modal-filter-button-close"
              >
                <i className="fa-solid fa-xmark"></i> Close
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
