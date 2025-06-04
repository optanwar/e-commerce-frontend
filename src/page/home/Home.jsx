import React from 'react';
import Hero from './Hero';
import Products from './Products';
import Benefits from './Benefits';
import Testimonials from './Testimonial';
import CTA from './CTA';
import Feedback from './Feedback';

const home = () => {
  return (
    <>
      <Hero /> {/*    Intro to your brand */}
      <Products /> {/*   // Show your products early*/}
      <Benefits /> {/*   // Show why your gummies are great*/}
      <Testimonials /> {/*   // Build trust with social proof*/}
      <Feedback /> {/*   // Invite visitors to share their experience or opinions*/}
      <CTA /> {/*   // Final conversion push (e.g., subscribe or buy)*/}
    </>
  );
};

export default home;
