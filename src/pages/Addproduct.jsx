import React from 'react';

const Addproduct = () => {

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;

        const Name = form.name.value;
        const image = form.image.files[0];
        const description = form.description.value;
        const price = form.price.value;
        const category = form.category.value;
        const brand = form.brand.value;
        const email = userEmail;
        const creatorNames = creatorName;
        const creatorImages = creatorImage;

        try {
            // Step 1: Upload image to image hosting service
            const image_url = await uploadImage(image);

            // Step 2: Submit contest data with image URL
            const contestData = {
                contestName,
                image: image_url, // Use the hosted image URL
                description,
                price,
                prizeMoney,
                taskInstruction,
                selectedTag,
                deadline,
                email,
                creatorNames,
                creatorImages,
            };

            const response = await fetch("", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contestData),
            });

            if (response.ok) {
                Swal.fire({
                    title: "Success!",
                    text: "Contest added successfully",
                    icon: "success",
                    confirmButtonText: "Close",
                });
                form.reset();
                setDeadline(null);
            } else {
                throw new Error("Failed to add contest");
            }
        } catch (error) {
            console.error("Error adding contest:", error);
            Swal.fire({
                title: "Error!",
                text: "An error occurred while adding the contest",
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
            <h1>hi</h1>
            <form className="max-w-lg mx-auto p-8 space-y-6 bg-base-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center">Add New Product</h2>
      <div className="form-control">
        <label className="label font-semibold">Product Name</label>
        <input
          type="text"
          name="name"
          //value={product.name}
          //onChange={handleChange}
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
          //onChange={handleFileChange}
          className="file-input file-input-bordered w-full"
        />
      </div>
      <div className="form-control">
        <label className="label font-semibold">Description</label>
        <textarea
          name="description"
          //value={product.description}
          //onChange={handleChange}
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
          //value={product.price}
          //onChange={handleChange}
          className="input input-bordered w-full"
          min="0"
          required
        />
      </div>
      <div className="form-control">
        <label className="label font-semibold">Category</label>
        <input
          type="text"
          name="category"
          //value={product.category}
          //onChange={handleChange}
          placeholder='Enter price'
          className="input input-bordered w-full"
          required
        />
      </div>
      <div className="form-control">
        <label className="label font-semibold">Brand Name</label>
        <input
          type="text"
          name="brand"
          //value={product.brand}
          //onChange={handleChange}
          placeholder='Enter brand name'
          className="input input-bordered w-full"
          required
        />
      </div>
      <div className="form-control">
        <label className="label font-semibold">Ratings</label>
        <input
          type="number"
          name="ratings"
          //value={product.ratings}
          //onChange={handleChange}
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
          //value={product.creationDate}
          //onChange={handleChange}
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