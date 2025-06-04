import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'What are YummyGummies made of?',
    answer:
      'Our gummies are made with natural flavors and colors, including essential vitamins and minerals for your child’s health.',
  },
  {
    question: 'Are your products safe for all ages?',
    answer:
      'YummyGummies are designed for kids 3 years and older. Always consult your pediatrician before starting any supplement.',
  },
  {
    question: 'Do you offer free shipping?',
    answer: 'Yes! We offer free shipping on all orders over $25 within the continental USA.',
  },
  {
    question: 'Can I return a product?',
    answer:
      "Absolutely! If you're not satisfied, you can return unopened products within 30 days for a full refund.",
  },
  {
    question: 'Where are your products manufactured?',
    answer:
      'All our products are proudly made in FDA-registered, GMP-certified facilities in the USA.',
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-10">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg shadow-sm bg-white">
            <button
              onClick={() => toggleAccordion(index)}
              className="flex justify-between items-center w-full px-6 py-4 text-left font-medium text-gray-800"
            >
              {faq.question}
              <ChevronDown
                size={20}
                className={`transition-transform duration-200 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4 text-gray-600 text-sm">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
