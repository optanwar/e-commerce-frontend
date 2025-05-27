import React from 'react';
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-primary text-white">
      <div className="mx-auto container px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-8 py-10 max-sm:max-w-sm max-sm:mx-auto gap-y-8">
          <div className="col-span-full mb-10 lg:col-span-2 lg:mb-0">
            <a href="/" className="flex justify-center lg:justify-start">
              <img src="/logo.svg" alt="Logo" className="h-10" />
            </a>
            <p className="py-8 text-sm text-gray-300 lg:max-w-xs text-center lg:text-left">
              Trusted in more than 100 countries & 5 million customers. Have any query?
            </p>
            <a
              href="#"
              className="py-2.5 px-5 h-9 block w-fit bg-indigo-600 rounded-full shadow-sm text-xs text-white mx-auto transition-all duration-500 hover:bg-indigo-700 lg:mx-0"
            >
              Contact us
            </a>
          </div>

          {[
            {
              title: 'Pagedone',
              items: ['Home', 'About', 'Pricing', 'Features'],
            },
            {
              title: 'Products',
              items: ['Figma UI System', 'Icons Assets', 'Responsive Blocks', 'Components Library'],
            },
            {
              title: 'Resources',
              items: ['FAQs', 'Quick Start', 'Documentation', 'User Guide'],
            },
            {
              title: 'Legal',
              items: ['Terms & Conditions', 'Privacy Policy', 'Refund Policy', 'Events'],
            },
          ].map((section, index) => (
            <div key={index} className="lg:mx-auto text-left">
              <h4 className="text-lg text-white font-medium mb-7">{section.title}</h4>
              <ul className="text-sm transition-all duration-500">
                {section.items.map((item, idx) => (
                  <li key={idx} className="mb-6 last:mb-0">
                    <a href="#" className="text-gray-300 hover:text-white">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="py-7 border-t border-gray-700">
          <div className="flex items-center justify-center flex-col lg:justify-between lg:flex-row">
            <span className="text-sm text-gray-300 text-center lg:text-left">
              © <a href="https://optanwar.vercel.app/" className="underline">OP TANWAR</a> {new Date().getFullYear()}, All rights reserved.
            </span>
            <div className="flex mt-4 space-x-4 sm:justify-center lg:mt-0">
              {[
                {
                  href: '#',
                  icon: (
                    <FaXTwitter />
                  ),
                },
                {
                  href: '#',
                  icon: (
                    <FaFacebook />
                  ),
                },
                {
                  href: '#',
                  icon: (
                   <FaInstagram/>
                  ),
                },
                {
                  href: '#',
                  icon: (
                    <FaYoutube />
                  ),
                },
                
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="w-9 h-9 rounded-full bg-gray-700 flex justify-center items-center hover:bg-indigo-600"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
