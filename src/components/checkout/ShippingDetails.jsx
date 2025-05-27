import React from 'react';

const ShippingDetails = ({ formData, errors, handleChange }) => (

  

  
  <form className="space-y-4">
    <div>
      <label className="block text-sm font-medium">Full Name</label>
      <input type="text" name="fullName" className="w-full border rounded p-2 mt-1" value={formData.fullName} onChange={handleChange} />
      {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
    </div>
    <div>
      <label className="block text-sm font-medium">Email</label>
      <input type="email" name="email" className="w-full border rounded p-2 mt-1" value={formData.email} onChange={handleChange} />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
    </div>
    <div>
      <label className="block text-sm font-medium">Address</label>
      <input type="text" name="address" className="w-full border rounded p-2 mt-1" value={formData.address} onChange={handleChange} />
      {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium">City</label>
        <input type="text" name="city" className="w-full border rounded p-2 mt-1" value={formData.city} onChange={handleChange} />
        {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">Postal Code</label>
        <input type="text" name="postalCode" className="w-full border rounded p-2 mt-1" value={formData.postalCode} onChange={handleChange} />
        {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode}</p>}
      </div>
    </div>
  </form>
);

export default ShippingDetails;
