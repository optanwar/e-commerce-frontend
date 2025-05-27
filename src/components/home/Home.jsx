import React from 'react'
import HeroSection from './HeroSection'
import ProductSection from './ProductSection'
import About from './About'
import Testimonial from './Testimonial'
import Feedback from './Feedback'
import FAQ from './FAQ';
import MetaData from '../../layout/MetaData'

const Home = () => {
  return (
   <>
  <MetaData title="website name title" />
   <HeroSection/>
   <About/>
   <ProductSection/>
  <Testimonial/>
  <FAQ/>
  <Feedback/>
</>
  )
}

export default Home