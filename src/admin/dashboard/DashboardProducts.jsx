import React, { useState } from 'react';
import { Pencil, Trash2, Plus, X } from 'lucide-react';

const initialProducts = [
  {
    id: 101,
    name: 'Strawberry Gummies',
    image:
      'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=40&q=80',
    category: 'Immunity',
    stock: 120,
    price: 9.99,
  },
  {
    id: 102,
    name: 'Vitamin C Bears',
    image:
      'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=40&q=80',
    category: 'Daily Vitamins',
    stock: 30,
    price: 12.49,
  },
  {
    id: 103,
    name: 'Melatonin Sleep Gummies',
    image:
      'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=40&q=80',
    category: 'Sleep',
    stock: 15,
    price: 14.99,
  },
  {
    id: 104,
    name: 'Omega-3 Fishies',
    image:
      'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=40&q=80',
    category: 'Brain Health',
    stock: 5,
    price: 11.99,
  },
];

export default function DashboardProducts() {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function openEditModal(product) {
    setEditProduct({ ...product }); // clone to edit safely
    setIsEditing(true);
  }

  function closeEditModal() {
    setIsEditing(false);
    setEditProduct(null);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setEditProduct((prev) => ({
      ...prev,
      [name]: name === 'stock' || name === 'price' ? Number(value) : value,
    }));
  }

  function saveChanges() {
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === editProduct.id ? editProduct : p))
    );
    closeEditModal();
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Products</h1>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition">
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by product name..."
          className="w-full md:w-1/3 px-4 py-2 border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="text-left bg-gray-100">
              <th className="p-4">ID</th>
              <th className="p-4">Product</th>
              <th className="p-4">Category</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Price</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-t hover:bg-gray-50">
                <td className="p-4 font-mono text-sm text-gray-600">{product.id}</td>
                <td className="p-4 flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <span>{product.name}</span>
                </td>
                <td className="p-4">{product.category}</td>
                <td className={`p-4 ${product.stock <= 10 ? 'text-red-600 font-semibold' : ''}`}>
                  {product.stock}
                </td>
                <td className="p-4">${product.price.toFixed(2)}</td>
                <td className="p-4 flex items-center gap-3">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit Product"
                    onClick={() => openEditModal(product)}
                  >
                    <Pencil size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-800" title="Delete Product">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-6 relative">
            <button
              onClick={closeEditModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              aria-label="Close"
            >
              <X size={24} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Edit Product</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveChanges();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editProduct.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={editProduct.image}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Category</label>
                <input
                  type="text"
                  name="category"
                  value={editProduct.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={editProduct.stock}
                  onChange={handleInputChange}
                  min={0}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Price ($)</label>
                <input
                  type="number"
                  name="price"
                  value={editProduct.price}
                  onChange={handleInputChange}
                  min={0}
                  step="0.01"
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-primary text-white hover:bg-primary/90"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
