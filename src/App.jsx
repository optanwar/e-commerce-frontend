import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import DashboardLayout from "./layout/DashboardLayout";

import Dashboard from "./components/dashboard/Dashboard";
import { route } from "./routes";
import { Suspense, useEffect, useState } from "react";
import Loader from "./layout/Loader";
import { useSelector, useDispatch } from "react-redux";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { fetchStripeApiKey } from './slices/stripeSlice'; // import the new thunk
import { setCredentials } from './slices/authSlice';
import './App.css'; // Import your global styles if any
import DashboardProduct from "./components/dashboard/product/ProductsList";

const App = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { apiKey, loading } = useSelector((state) => state.stripe);

  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem('persist:root'))?.auth;
    if (authData) {
      const parsed = JSON.parse(authData);
      if (parsed.token) {
        dispatch(setCredentials({ token: parsed.token }));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(fetchStripeApiKey(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (apiKey) {
      setStripePromise(loadStripe(apiKey));
    }
  }, [apiKey]);

  if (loading) {
    return <Loader />;
  }

  const routesWithElements = (
    <Routes>
      {/* Wrap all routes inside MainLayout except dashboard */}
      <Route element={<MainLayout />}>
        {route.map(({ id, path, component: Component }) => (
          <Route key={id} path={path} element={<Component />} />
        ))}
      </Route>

      {/* Dashboard route with separate layout */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
         <Route path="products" element={<DashboardProduct />} />
    
      </Route>
    </Routes>
  );

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        {stripePromise ? (
          <Elements stripe={stripePromise}>
            {routesWithElements}
          </Elements>
        ) : (
          routesWithElements
        )}
      </Suspense>
    </Router>
  );
};

export default App;
