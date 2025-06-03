import React from 'react'
import Hero from './Hero'
import Products from './Products'
import Benefits from './Benefits'
import Testimonials from './Testimonial'
import CTA from './CTA'


const home = () => {
  return (
    <>
    <Hero />

    <Products/>
    <Benefits/>
    <Testimonials/>
    <CTA/>
    </>
  )
}

export default home