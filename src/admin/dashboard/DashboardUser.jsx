import React, { useState } from 'react';
import { Pencil, Trash2, X } from 'lucide-react';

const initialUsers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'Inactive' },
  { id: 3, name: 'Charlie Davis', email: 'charlie@example.com', role: 'User', status: 'Active' },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'Admin', status: 'Active' },
];

const DashboardUser = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openEditModal = (user) => {
    setEditUser({ ...user });
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setIsEditing(false);
    setEditUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveChanges = () => {
    setUsers(prevUsers =>
      prevUsers.map(u => (u.id === editUser.id ? editUser : u))
    );
    closeEditModal();
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Users</h1>
        {/* Could add "Add User" button here */}
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or email..."
        className="w-full md:w-1/3 px-4 py-2 border rounded-lg"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow mt-4">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <tr key={user.id} className="border-t hover:bg-gray-50">
                  <td className="p-4 font-mono text-sm text-gray-600">{user.id}</td>
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.role}</td>
                  <td className={`p-4 font-semibold ${user.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                    {user.status}
                  </td>
                  <td className="p-4 flex items-center gap-3">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => openEditModal(user)}
                      title="Edit User"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      title="Delete User"
                      // Add delete functionality if needed
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit User Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
            <button
              onClick={closeEditModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              aria-label="Close"
            >
              <X size={24} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Edit User</h2>

            <form
              onSubmit={e => {
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
                  value={editUser.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editUser.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Role</label>
                <select
                  name="role"
                  value={editUser.role}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                >
                  <option>Admin</option>
                  <option>User</option>
                </select>
              </div>

              <div>
                <label className="block font-medium mb-1">Status</label>
                <select
                  name="status"
                  value={editUser.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
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
};

export default DashboardUser;
