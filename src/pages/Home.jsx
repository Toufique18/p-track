import React, { useState, useEffect } from "react";
import Card from "../components/Card";

const Home = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState('');
    const [sortOption, setSortOption] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://p-track-server.vercel.app/products?page=${currentPage}&limit=10&search=${searchTerm}&brands=${selectedBrands.join(',')}&categories=${selectedCategories.join(',')}&priceRange=${priceRange}&sort=${sortOption}`);
                const result = await response.json();

                setData(result.data);
                setTotalPages(result.totalPages);
            } catch (error) {
                console.error("Failed to load products:", error);
            }
        };

        fetchData();
    }, [currentPage, searchTerm, selectedBrands, selectedCategories, priceRange, sortOption]);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleBrandChange = (e) => {
        const { value, checked } = e.target;
        setSelectedBrands((prev) =>
            checked ? [...prev, value] : prev.filter((brand) => brand !== value)
        );
    };

    const handleCategoryChange = (e) => {
        const { value, checked } = e.target;
        setSelectedCategories((prev) =>
            checked ? [...prev, value] : prev.filter((category) => category !== value)
        );
    };

    const handlePriceRangeChange = (e) => {
        setPriceRange(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const applyFilters = () => {
        setIsModalOpen(false);
        setCurrentPage(1);
    };

    return (
        <div className="container mx-auto lg:px-12 px-5">
            <div className="mb-4 lg:flex flex-1">
                <input
                    type="text"
                    className="input input-bordered w-full mb-2"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button
                    className="btn ml-2"
                    onClick={() => setIsModalOpen(true)}
                >
                    Filter Products
                </button>
                <select
                    className="select select-bordered ml-2"
                    value={sortOption}
                    onChange={handleSortChange}
                >
                    <option value="">Sort By</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="date-desc">Date Added: Newest First</option>
                </select>
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

            {/* Modal for Filtering */}
            {isModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h2 className="text-xl font-bold mb-4">Filter Products</h2>

                        <div className="mb-4">
                            <h3 className="text-lg font-semibold">Brands</h3>
                            <div className="flex flex-col">
                                {["TechWave", "SoundMaster", "BrightSmile", "PureBreeze", "SafeGuard", "PowerFix"].map((brand) => (
                                    <label key={brand} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value={brand}
                                            checked={selectedBrands.includes(brand)}
                                            onChange={handleBrandChange}
                                            className="checkbox"
                                        />
                                        <span className="ml-2">{brand}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-lg font-semibold">Categories</h3>
                            <div className="flex flex-col">
                                {["Electronics", "Wearables", "Personal Care", "Home Appliances", "Tools", "Home Security", "Home Automation", "Home Entertainment", "Home Decor", "Outdoor"].map((category) => (
                                    <label key={category} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value={category}
                                            checked={selectedCategories.includes(category)}
                                            onChange={handleCategoryChange}
                                            className="checkbox"
                                        />
                                        <span className="ml-2">{category}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-lg font-semibold">Price Range</h3>
                            <select
                                value={priceRange}
                                onChange={handlePriceRangeChange}
                                className="select select-bordered w-full"
                            >
                                <option value="">Select Price Range(All)</option>
                                <option value="0-100">$0 - $100</option>
                                <option value="101-200">$101 - $200</option>
                                <option value="201-500">$201 - $500</option>
                                <option value="500+">$500+</option>
                            </select>
                        </div>

                        <div className="modal-action">
                            <button
                                className="btn"
                                onClick={applyFilters}
                            >
                                Apply Filters
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
