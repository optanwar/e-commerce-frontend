import React from 'react'

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import { FaChevronUp } from "react-icons/fa6";

const FAQ = () => {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
  
  return (
    <div className="bg-[#EDF7FF] flex items-center">
     
    <div className="container mx-auto px-6 py-10 md:py-16 lg:py-20 xl:py-24">
        <div className='bg-white py-12 px-8 rounded-xl shadow-sm'>
            <h2 className='pb-5 font-roboto text-lg md:text-xl'>Frequently asked questions</h2>
        <div className='rounded-lg'>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} className='py-3'>
        <AccordionSummary
          expandIcon={< FaChevronUp />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          
        >
         <p>This is organic or not?</p>
          
        </AccordionSummary>
        <AccordionDetails>
          <p>Yes, This is completely organic</p>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} className='py-3'>
        <AccordionSummary
          expandIcon={< FaChevronUp />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <p>Question 2</p>
         
        </AccordionSummary>
        <AccordionDetails>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse atque libero tempore sint dolores, maiores eius ut asperiores quis minima adipisci provident praesentium pariatur placeat possimus repudiandae est at saepe?</p>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} className='py-3'>
        <AccordionSummary
          expandIcon={< FaChevronUp />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <p>Question 3</p>
         
        </AccordionSummary>
        <AccordionDetails>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse atque libero tempore sint dolores, maiores eius ut asperiores quis minima adipisci provident praesentium pariatur placeat possimus repudiandae est at saepe?</p>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')} className='py-3'>
        <AccordionSummary
          expandIcon={< FaChevronUp />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <p>Question 4</p>
         
        </AccordionSummary>
        <AccordionDetails>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse atque libero tempore sint dolores, maiores eius ut asperiores quis minima adipisci provident praesentium pariatur placeat possimus repudiandae est at saepe?</p>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')} className='py-3'>
        <AccordionSummary
          expandIcon={< FaChevronUp />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <p>Question 5</p>
         
        </AccordionSummary>
        <AccordionDetails>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse atque libero tempore sint dolores, maiores eius ut asperiores quis minima adipisci provident praesentium pariatur placeat possimus repudiandae est at saepe?</p>
        </AccordionDetails>
      </Accordion>
    
    </div>
        </div>
        </div>
        </div>
  )
}

export default FAQ