import React, { useState, useEffect } from "react";
import Card from "../components/Card";

const Home = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/products?page=${currentPage}&limit=10&search=${searchTerm}`);
                const result = await response.json();

                setData(result.data);
                setTotalPages(result.totalPages);
            } catch (error) {
                console.error("Failed to load products:", error);
            }
        };

        fetchData();
    }, [currentPage, searchTerm]);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to the first page on new search
    };

    return (
        <div className="container mx-auto lg:px-12">
            <div className="mb-4">
                <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map((card) => (
                    <Card key={card._id} card={card} />
                ))}
            </div>
            <div className="flex justify-center mt-4">
                <div className="btn-group">
                    <button
                        className="btn"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    {[...Array(totalPages).keys()].map((page) => (
                        <button
                            key={page + 1}
                            className={`btn ${page + 1 === currentPage ? "btn-active" : ""}`}
                            onClick={() => handlePageChange(page + 1)}
                        >
                            {page + 1}
                        </button>
                    ))}
                    <button
                        className="btn"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
