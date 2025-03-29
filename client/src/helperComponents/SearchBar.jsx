export default function SearchBar({ setSearchQuery }) {
  return (
      <div className="mb-3" style={{ width: "auto" }}>
          <input
              type="text"
              className="form-control"
              placeholder="Search by Author"
              onChange={(e) => setSearchQuery(e.target.value)} // Update the search query
          />
      </div>
  );
}
