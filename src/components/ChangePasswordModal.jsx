import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const ChangePasswordModal = ({ onClose, onSave, loading }) => {
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [visibility, setVisibility] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const handleChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const toggleVisibility = (field) => {
    setVisibility((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { oldPassword, newPassword, confirmPassword } = passwordData;

    if (!oldPassword || !newPassword || !confirmPassword) {
      alert('Please fill all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match');
      return;
    }

    if (newPassword.length < 6) {
      alert('New password must be at least 6 characters');
      return;
    }

    onSave(passwordData);
    onClose();
  };

  const renderPasswordInput = (label, id, name, value, visible, toggleFn, placeholder) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1 text-darkText">
        {label}
      </label>
      <div className="relative">
        <input
          type={visible ? 'text' : 'password'}
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full border border-gray-300 px-4 py-2 rounded pr-10"
          required
          minLength={6}
        />
        <button
          type="button"
          onClick={() => toggleFn(name)}
          className="absolute inset-y-0 right-3 flex items-center text-gray-500"
          tabIndex={-1}
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="changePasswordTitle"
    >
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-lg relative">
        <h3 id="changePasswordTitle" className="text-xl font-heading mb-4 text-darkText">
          Change Password
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {renderPasswordInput(
            'Old Password',
            'oldPassword',
            'oldPassword',
            passwordData.oldPassword,
            visibility.old,
            () => toggleVisibility('old'),
            'Enter old password'
          )}
          {renderPasswordInput(
            'New Password',
            'newPassword',
            'newPassword',
            passwordData.newPassword,
            visibility.new,
            () => toggleVisibility('new'),
            'Enter new password'
          )}
          {renderPasswordInput(
            'Confirm Password',
            'confirmPassword',
            'confirmPassword',
            passwordData.confirmPassword,
            visibility.confirm,
            () => toggleVisibility('confirm'),
            'Confirm new password'
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 rounded text-white ${
                loading
                  ? 'bg-accent/70 cursor-not-allowed'
                  : 'bg-accent hover:bg-accent/90'
              }`}
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
