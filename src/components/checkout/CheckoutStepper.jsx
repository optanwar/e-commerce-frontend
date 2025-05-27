import React, { useState, lazy, Suspense, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, resetOrderState } from '../../slices/orderSlice'; // Adjust the import path as needed

const ShippingDetails = lazy(() => import('./ShippingDetails'));
const ConfirmOrder = lazy(() => import('./ConfirmOrder'));
const Payment = lazy(() => import('./Payment'));

const steps = ['Shipping Details', 'Confirm Order', 'Payment'];

const CheckoutStepper = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.order);
  const { items, totalAmount, totalQuantity } = useSelector((state) => state.cart);


  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
  });
  const [errors, setErrors] = useState({});

  const validateStep = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^@]+@[^@]+\.[^@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.postalCode) newErrors.postalCode = 'Postal code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: '',
    }));
  };

  console.log(items, 'items');

  const handleNext = () => {
    if (activeStep === 0 && !validateStep()) return;

    if (activeStep === steps.length - 1) {
      const token = localStorage.getItem('token'); // Adjust as needed
// Step 1: Keep itemPrice as a number until the end
const itemPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
console.log(itemPrice.toFixed(2), 'itemPrice');

// Step 2: Calculate tax and shipping
const taxPrice = +(itemPrice * 0.1).toFixed(2); // keep as number
const shippingPrice = itemPrice > 100 ? 0.00 : 10.00;

// Step 3: Calculate total
const totalPrice = (itemPrice + taxPrice + shippingPrice).toFixed(2);

      const orderData = {
        shippingInfo: {
          address: formData.address,
          city: formData.city,
          state: 'NY',
          country: 'USA',
          pinCode: parseInt(formData.postalCode),
          phoneNo: 1234567890,
        },
        orderItems: items.map(item => ({
          name: item.name,
          price: item.price,
          quantity:item.quantity,
          image: 'https://example.com/headphones.jpg',
          product: item._id,
        })),
        paymentInfo: {
          id: 'pi_123456789',
          status: 'Paid',
        },
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      };

      dispatch(createOrder({ orderData, token }));
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (success) {
      setActiveStep(steps.length);
      dispatch(resetOrderState());
    }
  }, [success, dispatch]);

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Stepper */}
      <div className="flex justify-between mb-8">
        {steps.map((label, idx) => (
          <div key={label} className="flex-1 text-center">
            <div
              className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center text-white ${activeStep >= idx ? 'bg-blue-600' : 'bg-gray-300'
                }`}
            >
              {idx + 1}
            </div>
            <div className="mt-2 text-sm font-medium">{label}</div>
          </div>
        ))}
      </div>

      {/* Step Content with Animation */}
      <div className="bg-white rounded-lg shadow p-6 min-h-[200px]">
        <Suspense fallback={<div>Loading...</div>}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {activeStep === 0 && (
                <ShippingDetails
                  formData={formData}
                  errors={errors}
                  handleChange={handleChange}
                />
              )}
              {activeStep === 1 && <ConfirmOrder formData={formData} />}
              {activeStep === 2 && <Payment onComplete={handleNext} />}
              {activeStep === steps.length && (
                <div className="text-center">
                  <h2 className="text-lg font-semibold mb-2">🎉 Order Completed!</h2>
                  <p className="mb-4">Thank you for your purchase.</p>
                  <Link
                    to="/my-orders"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    My Orders
                  </Link>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </Suspense>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 text-red-600 text-center font-semibold">
          {error}
        </div>
      )}

      {/* Navigation */}
      {activeStep < steps.length && (
        <div className="flex justify-between mt-6">
          <button
            onClick={handleBack}
            disabled={activeStep === 0}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {loading
              ? 'Processing...'
              : activeStep === steps.length - 1
                ? 'Complete Order'
                : 'Next'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckoutStepper;
