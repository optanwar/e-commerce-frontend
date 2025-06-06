import React, { Suspense, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import Loader from './components/Loader';
import { route } from './routes';
import { getStripeApiKey } from './redux/slices/order/paymentSlice';

const App = () => {
  const dispatch = useDispatch();
  const { stripeApiKey } = useSelector((state) => state.stripe);
  const [stripePromise, setStripePromise] = useState(null);


  useEffect(() => {
    dispatch(getStripeApiKey());
  }, [dispatch]);

  useEffect(() => {
    if (stripeApiKey) {
      setStripePromise(loadStripe(stripeApiKey));
    }
  }, [stripeApiKey]);

  const renderRoutes = () => (
    <Routes>
      {route.map(({ id, path, component: Component, children, stripeProtected }) =>
        children ? (
          <Route key={id} path={path} element={<Component />}>
            {children.map(({ id: childId, path: childPath, component: ChildComp }) => (
              <Route key={childId} path={childPath} element={<ChildComp />} />
            ))}
          </Route>
        ) : stripeProtected && stripePromise ? (
          // Wrap with Stripe <Elements> only if stripeProtected is true
          <Route
            key={id}
            path={path}
            element={
              <Elements stripe={stripePromise}>
                <Component />
              </Elements>
            }
          />
        ) : (
          <Route key={id} path={path} element={<Component />} />
        )
      )}
    </Routes>
  );

  return (
    <div className="font-body bg-lightGray text-darkText min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-10">
              <Loader />
            </div>
          }
        >
          {renderRoutes()}
        </Suspense>
      </main>

      <Footer />
    </div>
  );
};

export default App;
