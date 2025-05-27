import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AnnouncementBar from "./layout/AnnouncementBar";
import Loader from "./layout/Loader";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import { route } from "./routes";
import { useSelector, useDispatch } from "react-redux";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { fetchStripeApiKey } from './slices/stripeSlice'; // import the new thunk
import { setCredentials } from './slices/authSlice';
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

  return (
    <div>
      <Router>
        <AnnouncementBar />
        <Navbar />

        <Suspense fallback={<Loader />}>
          {stripePromise ? (
            <Elements stripe={stripePromise}>
              <Routes>
                {route.map(({ id, path, component: Component }) => (
                  <Route key={id} path={path} element={<Component />} />
                ))}
              </Routes>
            </Elements>
          ) : (
            <Routes>
              {route.map(({ id, path, component: Component }) => (
                <Route key={id} path={path} element={<Component />} />
              ))}
            </Routes>
          )}
        </Suspense>

        <Footer />
      </Router>
    </div>
  );
};

export default App;
