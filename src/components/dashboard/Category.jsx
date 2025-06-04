import React, { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';

const initialCategories = [
  { id: 1, name: 'Immunity' },
  { id: 2, name: 'Daily Vitamins' },
  { id: 3, name: 'Sleep' },
  { id: 4, name: 'Brain Health' },
];

const Category = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [search, setSearch] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  const filtered = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    const newItem = {
      id: Date.now(),
      name: newCategory.trim(),
    };
    setCategories([newItem, ...categories]);
    setNewCategory('');
  };

  const handleUpdateCategory = (id) => {
    setCategories(
      categories.map((cat) =>
        cat.id === id ? { ...cat, name: editName } : cat
      )
    );
    setEditingId(null);
    setEditName('');
  };

  const handleDelete = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Manage Categories</h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="Search categories..."
          className="px-4 py-2 border rounded w-full sm:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-2 w-full sm:w-2/3">
          <input
            type="text"
            placeholder="New category name"
            className="flex-1 px-4 py-2 border rounded"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button
            onClick={handleAddCategory}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      {/* Category Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="text-left bg-gray-100">
              <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((category) => (
              <tr key={category.id} className="border-t hover:bg-gray-50">
                <td className="p-4 font-mono text-sm text-gray-600">
                  {category.id}
                </td>
                <td className="p-4">
                  {editingId === category.id ? (
                    <input
                      type="text"
                      className="border px-2 py-1 rounded w-full"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  ) : (
                    category.name
                  )}
                </td>
                <td className="p-4 flex items-center gap-3">
                  {editingId === category.id ? (
                    <button
                      onClick={() => handleUpdateCategory(category.id)}
                      className="text-green-600 hover:text-green-800 font-semibold"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingId(category.id);
                        setEditName(category.name);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(category.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-500">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Category;
