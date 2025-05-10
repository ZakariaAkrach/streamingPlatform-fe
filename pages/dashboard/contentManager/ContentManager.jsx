import "./contentManager.scss";

export default function ContentManager() {
  return (
    <div className="content-manager-container">
      <div className="content-manager-wrapper">
        <section className="content-manager-header">
          <div className="content-manager-title-subtitle">
            <h1>Movies Management</h1>
            <p>Manage your movie catalog</p>
          </div>
          <button>+ Add New Movie</button>
        </section>

        <section className="content-manager-filter-table-pagination">
          <div className="content-manager-filter">
            <div className="content-manager-search">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search movies..."
              />
            </div>
            <div className="content-manager-filter-buttons">
              <button>Filter</button>
              <button>Sort</button>
            </div>
          </div>

          <div className="content-manager-table">
            <table>
              <thead>
                <tr>
                  <th>Movie Title</th>
                  <th>Genre</th>
                  <th>Release Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>[IMG] The Dark Knight</td>
                  <td>Action</td>
                  <td>2025-01-12</td>
                  <td>Published</td>
                  <td>[Pen modify] [Cestino delete]</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="content-manager-pagination">
            <div className="content-manager-pagination-info">
              <p>Showing 1 to 10 of 50 entries</p>
            </div>

            <div className="content-manager-pagination-button">
              <p>Here buttons for pagination</p>
            </div>
          </div>
        </section>

        <h1>solo per ora</h1>
        <button>Aggiungi film da api prima volta</button>
      </div>
    </div>
  );
}
