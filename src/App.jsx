import React, { Suspense } from 'react'
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'
import { Route, Routes } from 'react-router-dom'
import { route } from './routes'

const App = () => {
  return (
   <>
  
     <div className="font-body bg-lightGray text-darkText">
      <Navbar />
     <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                {route.map(({ id, path, component: Component }) => (
                  <Route key={id} path={path} element={<Component />} />
                ))}
              </Routes>
            </Suspense>


      <Footer />
    </div>
   </>
  )
}

export default App