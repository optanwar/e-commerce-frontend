import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pencil, SquareArrowOutUpRight, Trash2, User, Users, X } from 'lucide-react';
import { fetchUsers, deleteUser, updateUserRole } from '../../redux/slices/users/userSlice';
import { Link } from 'react-router-dom';
const DashboardUser = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user);

  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this user?');
    if (confirm) {
      await dispatch(deleteUser(id));
      dispatch(fetchUsers()); // Refresh list after delete
    }
  };

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
    setEditUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveChanges = async () => {
    const { _id, name, email, role } = editUser;
    await dispatch(
      updateUserRole({
        id: _id,
        updatedData: { name, email, role },
      })
    );

    // Optionally refresh the list or update local state
    dispatch(fetchUsers());

    closeEditModal();
    dispatch(fetchUsers());
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Users className="text-primary" />
          Users
        </h1>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or email..."
        className="w-full md:w-1/3 px-4 py-2 border rounded-lg"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Status Messages */}
      {loading && <p className="mt-4 text-gray-500">Loading users...</p>}
      {error && <p className="mt-4 text-red-500">Error: {error}</p>}

      {/* User Table */}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow mt-4">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-4">ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Actions</th>
                <th className="p-4">Profile</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="border-t hover:bg-gray-50">
                    <td className="p-4 font-mono text-sm text-gray-600">{user._id}</td>
                    <td className="p-4">{user.name}</td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">{user.role}</td>
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
                        onClick={() => handleDelete(user._id)}
                        title="Delete User"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                    <td className="p-2 text-darkText hover:text-primary cursor-pointer">
                      <Link to={`/dashboard/users/${user._id}`}>
                        <SquareArrowOutUpRight size={18} />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {isEditing && editUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
            <button
              onClick={closeEditModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              <X size={24} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Edit User</h2>
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
                  <option>admin</option>
                  <option>user</option>
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
