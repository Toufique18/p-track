import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const Addproduct = () => {
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        // Fetch brands and categories (or set them statically if they don't change)
        setBrands(["TechWave", "SoundMaster", "BrightSmile", "PureBreeze", "SafeGuard", "PowerFix"]);
        setCategories(["Electronics", "Wearables", "Personal Care", "Home Appliances", "Tools", "Home Security", "Home Automation"]);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;

        const name = form.name.value;
        const image = form.image.files[0];
        const description = form.description.value;
        const price = form.price.value;
        const category = selectedCategory;
        const brand = selectedBrand;
        const ratings = form.ratings.value;
        const creationDateTime = form.creationDate.value;
        

        try {
            // Step 1: Upload image to image hosting service
            const image_url = await uploadImage(image);

            // Step 2: Submit product data with image URL
            const productData = {
                productName: name,
                productImage: image_url, // Use the hosted image URL
                description,
                price,
                category,
                brandName: brand,
                ratings,
                creationDateTime,
                
            };

            const response = await fetch("https://p-track-server.vercel.app/product", { 
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            if (response.ok) {
                Swal.fire({
                    title: "Success!",
                    text: "Product added successfully",
                    icon: "success",
                    confirmButtonText: "Close",
                });
                form.reset();
            } else {
                throw new Error("Failed to add product");
            }
        } catch (error) {
            console.error("Error adding product:", error);
            Swal.fire({
                title: "Error!",
                text: "An error occurred while adding the product",
                icon: "error",
                confirmButtonText: "Close",
            });
        }
    };

    // Function to upload image to image hosting service
    const uploadImage = async (imageFile) => {
        try {
            const formData = new FormData();
            formData.append("image", imageFile);

            const response = await fetch(`https://api.imgbb.com/1/upload?key=e04b2c2c85ddbc2b9379722536771dca`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                return data.data.display_url; // Return the hosted image URL
            } else {
                throw new Error("Failed to upload image");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            throw error;
        }
    };

    return (
        <div>
            <h1>Add New Product</h1>
            <form className="max-w-lg mx-auto p-8 space-y-6 bg-base-200 rounded-lg shadow-md" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold text-center">Add New Product</h2>
                <div className="form-control">
                    <label className="label font-semibold">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder='Enter product name'
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div className="form-control">
                    <label className="label font-semibold">Product Image</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="file-input file-input-bordered w-full"
                    />
                </div>
                <div className="form-control">
                    <label className="label font-semibold">Description</label>
                    <textarea
                        name="description"
                        placeholder='Description'
                        className="textarea textarea-bordered w-full"
                        rows="4"
                    />
                </div>
                <div className="form-control">
                    <label className="label font-semibold">Price</label>
                    <input
                        type="number"
                        name="price"
                        placeholder='Enter price'
                        className="input input-bordered w-full"
                        min="0"
                        required
                    />
                </div>
                <div className="form-control">
                    <label className="label font-semibold">Category</label>
                    <select
                        name="category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="select select-bordered w-full"
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <div className="form-control">
                    <label className="label font-semibold">Brand Name</label>
                    <select
                        name="brand"
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        className="select select-bordered w-full"
                        required
                    >
                        <option value="">Select a brand</option>
                        {brands.map((brand) => (
                            <option key={brand} value={brand}>{brand}</option>
                        ))}
                    </select>
                </div>
                <div className="form-control">
                    <label className="label font-semibold">Ratings</label>
                    <input
                        type="number"
                        name="ratings"
                        className="input input-bordered w-full"
                        min="0"
                        max="5"
                        step="0.1"
                        required
                    />
                </div>
                <div className="form-control">
                    <label className="label font-semibold">Product Creation Date and Time</label>
                    <input
                        type="datetime-local"
                        name="creationDate"
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div className="form-control">
                    <button type="submit" className="btn btn-primary w-full mt-4">
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Addproduct;
