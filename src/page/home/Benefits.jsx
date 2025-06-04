import React from 'react';
import { CheckCircle, Flag, ShieldCheck } from 'lucide-react';

const Benefits = () => {
  const items = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary mb-4" />,
      title: 'No Added Sugar',
      desc: 'Trustworthy, safe, and packed with natural ingredients.',
    },
    {
      icon: <Flag className="w-8 h-8 text-primary mb-4" />,
      title: 'Made in the USA',
      desc: 'Locally crafted with quality and care.',
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-primary mb-4" />,
      title: 'Doctor Approved',
      desc: 'Reviewed and approved by pediatricians.',
    },
  ];

  return (
    <section className="bg-lightBg  py-16 px-4 sm:py-20 sm:px-6 md:px-8 md:py-24 lg:py-28 xl:py-32 2xl:py-36 text-center">
      <h2 className="text-3xl font-heading text-accent mb-10">Why Parents Choose Us</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {items.map((benefit, i) => (
          <div
            key={i}
            className="bg-lightGray p-6 rounded-xl shadow-soft hover:shadow-hoverCard hover:bg-white transition flex flex-col items-center text-center border border-dotted border-primary"
          >
            <div className="flex justify-center items-center">{benefit.icon}</div>
            <h4 className="text-lg font-bold mb-2 text-darkText">{benefit.title}</h4>
            <p className="text-sm text-gray-600">{benefit.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Benefits;
