import React, { Suspense } from 'react';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import { Route, Routes } from 'react-router-dom';
import { route } from './routes';
import Loader from './components/Loader';

const App = () => {
  return (
    <>
      <div className="font-body bg-lightGray text-darkText">
        <Navbar />
        <Suspense
          fallback={
            <div>
              <Loader />
            </div>
          }
        >
          {/* <Routes>
                {route.map(({ id, path, component: Component }) => (
                  <Route key={id} path={path} element={<Component />} />
                ))}
              </Routes> */}

          <Routes>
            {route.map(({ id, path, component: Component, children }) =>
              children ? (
                <Route key={id} path={path} element={<Component />}>
                  {children.map(({ id: childId, path: childPath, component: ChildComp }) => (
                    <Route key={childId} path={childPath} element={<ChildComp />} />
                  ))}
                </Route>
              ) : (
                <Route key={id} path={path} element={<Component />} />
              )
            )}
          </Routes>
        </Suspense>

        <Footer />
      </div>
    </>
  );
};

export default App;
