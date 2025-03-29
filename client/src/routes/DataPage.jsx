import SearchBar from "../helperComponents/SearchBar.jsx";
import Table from "../helperComponents/Table.jsx";
import { useEffect, useState, useMemo } from "react";
import { Pagination } from "react-bootstrap";

export default function DataPage() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchQuery, setSearchQuery] = useState(""); // Search query for filtering
    const [sortOrder, setSortOrder] = useState("normal"); // "normal", "asc", or "desc"

    const itemsPerPage = 5;

    // Fetch data on component mount (only once)
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('https://www.freetestapi.com/api/v1/books');
            const response = await res.json();
            if (response) {
                setData(response);
            }
        };
        fetchData();
    }, []); // This effect runs only once when the component is mounted

    // Filter data based on search query
    const filteredData = useMemo(() => 
        data.filter(item =>
            item.author.toLowerCase().includes(searchQuery.toLowerCase())
        ), [data, searchQuery]);

    // Sort data based on sort order
    const sortedData = useMemo(() => {
        return filteredData.sort((a, b) => {
            if (sortOrder === "asc") {
                return a.author.localeCompare(b.author); // Ascending order by author
            } else if (sortOrder === "desc") {
                return b.author.localeCompare(a.author); // Descending order by author
            }
            return 0; // "normal" order (no sorting)
        });
    }, [filteredData, sortOrder]);

    // Paginate sorted data whenever currentPage or sortedData changes
    useEffect(() => {
        if (sortedData.length > 0) {
            const start = currentPage * itemsPerPage;
            const paginatedData = sortedData.slice(start, start + itemsPerPage);
            setPage(paginatedData);
        }
    }, [currentPage, sortedData]); // Only re-run when currentPage or sortedData changes

    // Toggle sort order between normal, ascending, and descending
    const toggleSortOrder = () => {
        if (sortOrder === "normal") {
            setSortOrder("asc");
        } else if (sortOrder === "asc") {
            setSortOrder("desc");
        } else {
            setSortOrder("normal");
        }
    };

    // Calculate number of pages based on the data length
    const pages = Math.ceil(sortedData.length / itemsPerPage);

    return (
        <div className="col-md-10 col-9">
            <div className="d-flex justify-content-between align-items-center">
                <SearchBar setSearchQuery={setSearchQuery} />
                <button onClick={toggleSortOrder} className="btn btn-secondary">
                    {sortOrder === "normal"
                        ? "Sort by Author (Normal)"
                        : sortOrder === "asc"
                        ? "Sort by Author (Ascending)"
                        : "Sort by Author (Descending)"}
                </button>
            </div>
            <div className="mt-3">
                <Table data={page} />
                <div className="d-flex justify-content-between">
                    <Pagination>
                        <Pagination.Prev
                            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                            disabled={currentPage === 0} // Disable Prev if on the first page
                        />
                        {[...Array(pages)].map((_, index) => (
                            <Pagination.Item
                                key={index}
                                active={index === currentPage}
                                onClick={() => setCurrentPage(index)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next
                            onClick={() => setCurrentPage(Math.min(pages - 1, currentPage + 1))}
                            disabled={currentPage === pages - 1} // Disable Next if on the last page
                        />
                    </Pagination>
                </div>
            </div>
        </div>
    );
}
