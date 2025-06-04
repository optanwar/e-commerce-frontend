import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

const categories = ['Immunity', 'Sleep', 'Daily Vitamins', 'Brain Health', 'Digestive Health'];

const CreateProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in product) formData.append(key, product[key]);
    images.forEach((img) => formData.append('images', img));
    // Send formData to your backend with Axios or fetch
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow space-y-6">
      <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
        <PlusCircle /> Create New Product
      </h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            required
            value={product.name}
            onChange={handleChange}
            className="mt-1 w-full border rounded-lg px-4 py-2"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Price ($)</label>
          <input
            type="number"
            name="price"
            required
            value={product.price}
            onChange={handleChange}
            className="mt-1 w-full border rounded-lg px-4 py-2"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            required
            value={product.category}
            onChange={handleChange}
            className="mt-1 w-full border rounded-lg px-4 py-2"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Stock */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Stock</label>
          <input
            type="number"
            name="stock"
            required
            value={product.stock}
            onChange={handleChange}
            className="mt-1 w-full border rounded-lg px-4 py-2"
          />
        </div>

        {/* Description (full width) */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            required
            value={product.description}
            onChange={handleChange}
            className="mt-1 w-full border rounded-lg px-4 py-2"
            rows={4}
          />
        </div>

        {/* Images Upload (full width) */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Upload Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="mt-1"
          />

          {/* Preview */}
          <div className="flex gap-4 mt-4 flex-wrap">
            {imagePreviews.map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`Preview ${i}`}
                className="w-20 h-20 object-cover rounded shadow"
              />
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition"
          >
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
