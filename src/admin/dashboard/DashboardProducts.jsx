import React, { useEffect, useState } from 'react';
import { Pencil, Trash2, Plus, X, PackageOpen } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, clearErrors } from '../../redux/slices/product/productSlice';
import { deleteProduct } from '../../redux/slices/product/deleteProductSlice';
import { updateProduct } from '../../redux/slices/product/updateProductSlice'; // ✅ Make sure this exists
import { Link } from 'react-router-dom';

export default function DashboardProducts() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state?.products);

  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [newImageFile, setNewImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function openEditModal(product) {
    setEditProduct({ ...product });
    setImagePreview(product.images?.[0]?.url || null);
    setNewImageFile(null);
    setIsEditing(true);
  }

  function closeEditModal() {
    setIsEditing(false);
    setEditProduct(null);
    setNewImageFile(null);
    setImagePreview(null);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setEditProduct((prev) => ({
      ...prev,
      [name]: name === 'stock' || name === 'price' ? Number(value) : value,
    }));
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    setNewImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function saveChanges() {
    const id = editProduct._id;
    const formData = new FormData();

    formData.append('name', editProduct.name);
    formData.append('category', editProduct.category);
    formData.append('stock', editProduct.stock);
    formData.append('price', editProduct.price);

    if (newImageFile) {
      formData.append('images', newImageFile);
    }

    dispatch(updateProduct({ id, updatedData: formData }))
      .unwrap()
      .then(() => {
        dispatch(fetchProducts());
        closeEditModal();
      })
      .catch((err) => {
        alert(`Failed to update product: ${err}`);
      });
  }

  function handleDeleteProduct(id) {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    dispatch(deleteProduct(id))
      .unwrap()
      .then(() => {
        dispatch(fetchProducts());
      })
      .catch((err) => {
        alert(`Failed to delete product: ${err}`);
      });
  }

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          {' '}
          <PackageOpen size={24} className="text-primary" />
          Products
        </h1>
        <Link
          to={'/dashboard/create-product'}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
        >
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by product name..."
          className="w-full md:w-1/3 px-4 py-2 border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="text-left bg-gray-100">
              <th className="p-4">Image</th>
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
              <tr key={product._id} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  <img
                    src={
                      product.images?.[0]?.url ||
                      'https://m.media-amazon.com/images/I/719KzrpbhpL.jpg'
                    }
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                </td>
                <td className="p-4 font-mono text-sm text-gray-600">{product._id}</td>
                <td className="p-4 flex items-center gap-3">
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
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete Product"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">
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
                <label className="block font-medium mb-1">Image Upload</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-3 py-2 border rounded"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-24 h-24 mt-2 rounded object-cover border"
                  />
                )}
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
