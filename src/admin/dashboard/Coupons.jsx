import React, { useState } from 'react';
import { Plus, Pencil, Trash2, TicketPercent } from 'lucide-react';

const initialCoupons = [
  {
    id: 1,
    code: 'WELCOME10',
    discount: 10,
    expiresAt: '2025-12-31',
  },
  {
    id: 2,
    code: 'SUMMER25',
    discount: 25,
    expiresAt: '2025-07-01',
  },
];

const Coupons = () => {
  const [coupons, setCoupons] = useState(initialCoupons);
  const [search, setSearch] = useState('');
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discount: '',
    expiresAt: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [editCoupon, setEditCoupon] = useState({});

  const filtered = coupons.filter((c) => c.code.toLowerCase().includes(search.toLowerCase()));

  const handleAdd = () => {
    const { code, discount, expiresAt } = newCoupon;
    if (!code || !discount || !expiresAt) return;

    const newEntry = {
      id: Date.now(),
      code,
      discount: parseFloat(discount),
      expiresAt,
    };

    setCoupons([newEntry, ...coupons]);
    setNewCoupon({ code: '', discount: '', expiresAt: '' });
  };

  const handleDelete = (id) => {
    setCoupons(coupons.filter((c) => c.id !== id));
  };

  const handleSaveEdit = () => {
    setCoupons(coupons.map((c) => (c.id === editingId ? { ...editCoupon, id: editingId } : c)));
    setEditingId(null);
    setEditCoupon({});
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <TicketPercent className="text-primary" />
          Manage Coupons
        </h1>
      </div>

      {/* Add Coupon */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Coupon Code"
          className="px-4 py-2 border rounded"
          value={newCoupon.code}
          onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
        />
        <input
          type="number"
          placeholder="Discount %"
          className="px-4 py-2 border rounded"
          value={newCoupon.discount}
          onChange={(e) => setNewCoupon({ ...newCoupon, discount: e.target.value })}
        />
        <input
          type="date"
          className="px-4 py-2 border rounded"
          value={newCoupon.expiresAt}
          onChange={(e) => setNewCoupon({ ...newCoupon, expiresAt: e.target.value })}
        />
        <button
          onClick={handleAdd}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 flex items-center gap-2"
        >
          <Plus size={18} /> Add Coupon
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by code..."
        className="w-full md:w-1/3 px-4 py-2 border rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-4">ID</th>
              <th className="p-4">Code</th>
              <th className="p-4">Discount</th>
              <th className="p-4">Expires At</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-t hover:bg-gray-50">
                <td className="p-4">{c.id}</td>
                <td className="p-4">
                  {editingId === c.id ? (
                    <input
                      type="text"
                      className="border px-2 py-1 rounded w-full"
                      value={editCoupon.code}
                      onChange={(e) => setEditCoupon({ ...editCoupon, code: e.target.value })}
                    />
                  ) : (
                    c.code
                  )}
                </td>
                <td className="p-4">
                  {editingId === c.id ? (
                    <input
                      type="number"
                      className="border px-2 py-1 rounded w-full"
                      value={editCoupon.discount}
                      onChange={(e) => setEditCoupon({ ...editCoupon, discount: e.target.value })}
                    />
                  ) : (
                    `${c.discount}%`
                  )}
                </td>
                <td className="p-4">
                  {editingId === c.id ? (
                    <input
                      type="date"
                      className="border px-2 py-1 rounded w-full"
                      value={editCoupon.expiresAt}
                      onChange={(e) => setEditCoupon({ ...editCoupon, expiresAt: e.target.value })}
                    />
                  ) : (
                    c.expiresAt
                  )}
                </td>
                <td className="p-4 flex items-center gap-3">
                  {editingId === c.id ? (
                    <button
                      onClick={handleSaveEdit}
                      className="text-green-600 hover:text-green-800 font-semibold"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingId(c.id);
                        setEditCoupon(c);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(c.id)}
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
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No coupons found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Coupons;
