import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

// Sample product data (20 items)
const products = [
  { id: 1, name: 'Laptop Pro', price: 1499.99, category: 'Electronics', stock: 25, status: 'In Stock', image: 'https://primefaces.org/cdn/primereact/images/product/bamboo-watch.jpg' },
  { id: 2, name: 'Smartphone X', price: 999.0, category: 'Mobile', stock: 10, status: 'Low Stock', image: 'https://primefaces.org/cdn/primereact/images/product/bamboo-watch.jpg' },
  { id: 3, name: 'Wireless Headphones', price: 199.99, category: 'Accessories', stock: 0, status: 'Out of Stock', image: 'https://primefaces.org/cdn/primereact/images/product/bamboo-watch.jpg' },
  { id: 4, name: 'Smartwatch Elite', price: 249.99, category: 'Wearables', stock: 18, status: 'In Stock', image: 'https://primefaces.org/cdn/primereact/images/product/bamboo-watch.jpg' },
  { id: 5, name: 'Gaming Mouse', price: 59.99, category: 'Accessories', stock: 50, status: 'In Stock', image: 'https://primefaces.org/cdn/primereact/images/product/bamboo-watch.jpg' },
  { id: 6, name: 'Bluetooth Speaker', price: 89.99, category: 'Audio', stock: 0, status: 'Out of Stock', image: 'https://primefaces.org/cdn/primereact/images/product/bamboo-watch.jpg' },
  { id: 7, name: '4K Monitor', price: 399.99, category: 'Electronics', stock: 5, status: 'Low Stock', image: 'https://primefaces.org/cdn/primereact/images/product/bamboo-watch.jpg' },
  { id: 8, name: 'Mechanical Keyboard', price: 109.99, category: 'Accessories', stock: 40, status: 'In Stock', image: 'https://primefaces.org/cdn/primereact/images/product/bamboo-watch.jpg' },
  { id: 9, name: 'Tablet Air', price: 499.0, category: 'Mobile', stock: 12, status: 'In Stock', image: 'https://primefaces.org/cdn/primereact/images/product/bamboo-watch.jpg' },
  { id: 10, name: 'Noise Cancelling Earbuds', price: 149.99, category: 'Audio', stock: 0, status: 'Out of Stock', image: 'https://primefaces.org/cdn/primereact/images/product/bamboo-watch.jpg' },
  { id: 11, name: 'DSLR Camera', price: 999.99, category: 'Cameras', stock: 7, status: 'Low Stock', image: 'https://primefaces.org/cdn/primereact/images/product/bamboo-watch.jpg' },
  { id: 12, name: 'Gaming Chair', price: 199.99, category: 'Furniture', stock: 15, status: 'In Stock', image: 'https://primefaces.org/cdn/primereact/images/product/bamboo-watch.jpg' },
  { id: 13, name: 'Graphic Tablet', price: 249.99, category: 'Electronics', stock: 3, status: 'Low Stock', image: 'https://primefaces.org/cdn/primereact/images/product/bamboo-watch.jpg' },
  { id: 14, name: 'Smart Light Bulbs', price: 39.99, category: 'Smart Home', stock: 100, status: 'In Stock', image: 'https://primefaces.org/cdn/primereact/images/product/bamboo-watch.jpg' },
  { id: 15, name: 'Streaming Webcam', price: 89.99, category: 'Cameras', stock: 0, status: 'Out of Stock', image: 'https://primefaces.org/cdn/primereact/images/product/bamboo-watch.jpg' },
  { id: 16, name: 'External Hard Drive', price: 129.99, category: 'Storage', stock: 23, status: 'In Stock', image: 'https://primefaces.org/cdn/primereact/images/product/bamboo-watch.jpg' },
 
];

const ProductTable = () => {
  const [globalFilter, setGlobalFilter] = useState('');

  // Formatters
  const priceBodyTemplate = (rowData) => `$${rowData.price.toFixed(2)}`;

  const statusBodyTemplate = (rowData) => {
    const statusColor =
      rowData.status === 'In Stock'
        ? 'green'
        : rowData.status === 'Low Stock'
        ? 'orange'
        : 'red';
    return <span className={`text-${statusColor}-600 font-semibold`}>{rowData.status}</span>;
  };

  const imageBodyTemplate = (rowData) => (
    <img src={rowData.image} alt={rowData.name} className="w-10 h-10 rounded" />
  );

  const actionBodyTemplate = () => (
    <div className="flex gap-2">
      <Button icon="pi pi-pencil" className="p-button-sm p-button-info" tooltip="Edit" />
      <Button icon="pi pi-trash" className="p-button-sm p-button-danger" tooltip="Delete" />
    </div>
  );

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Product List</h2>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search products..."
          />
        </span>
      </div>

      <DataTable
        value={products}
        paginator
        rows={10}
        responsiveLayout="scroll"
        className="p-datatable-sm"
        globalFilter={globalFilter}
        emptyMessage="No products found."
      >
        <Column field="id" header="ID" sortable style={{ width: '4rem' }} />
        <Column header="Image" body={imageBodyTemplate} />
        <Column field="name" header="Name" sortable />
        <Column field="category" header="Category" sortable />
        <Column field="price" header="Price" body={priceBodyTemplate} sortable />
        <Column field="stock" header="Stock" sortable />
        <Column field="status" header="Status" body={statusBodyTemplate} />
        <Column body={actionBodyTemplate} header="Actions" style={{ minWidth: '8rem' }} />
      </DataTable>
    </div>
  );
};

export default ProductTable;
