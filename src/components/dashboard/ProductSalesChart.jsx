// ProductCategoryAndStockChart.jsx
import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Register chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Data for Product Categories
const categoryData = {
  labels: ['Electronics', 'Clothing', 'Books', 'Home & Kitchen', 'Toys'],
  datasets: [
    {
      label: 'Category Distribution',
      data: [30, 20, 15, 25, 10],
      backgroundColor: [
        '#3b82f6',  // Blue
        '#ef4444',  // Red
        '#fbbf24',  // Yellow
        '#10b981',  // Green
        '#8b5cf6',  // Purple
      ],
      borderColor: '#fff',
      borderWidth: 2,
    },
  ],
};

// Data for Stock Status
const stockData = {
  labels: ['In Stock', 'Low Stock', 'Out of Stock'],
  datasets: [
    {
      label: 'Stock Status',
      data: [50, 20, 10],
      backgroundColor: [
        '#10b981', // Green (In Stock)
        '#f59e0b', // Orange (Low Stock)
        '#ef4444', // Red (Out of Stock)
      ],
      borderColor: '#fff',
      borderWidth: 2,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
      labels: {
        boxWidth: 20,
        padding: 15,
      },
    },
    tooltip: {
      enabled: true,
    },
  },
};

const ProductCategoryAndStockChart = () => {
  return (
    <div className="bg-white shadow-md rounded-md p-6 max-w-4xl mx-auto flex gap-10">
      <div className="w-1/2">
        <h2 className="text-lg font-semibold mb-4 text-center">Product Category Distribution</h2>
        <Doughnut data={categoryData} options={options} />
      </div>

      <div className="w-1/2">
        <h2 className="text-lg font-semibold mb-4 text-center">Stock Status Distribution</h2>
        <Doughnut data={stockData} options={options} />
      </div>
    </div>
  );
};

export default ProductCategoryAndStockChart;
