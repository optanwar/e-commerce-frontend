import React from 'react';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  return (
    <section className="min-h-screen bg-white text-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
          <p className="text-lg text-gray-600">
            We'd love to hear from you. Reach out and let's connect.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <FaEnvelope className="text-2xl text-black mt-1" />
              <div>
                <h4 className="text-lg font-semibold">Email</h4>
                <p className="text-gray-600">support@yourstore.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaPhoneAlt className="text-2xl text-black mt-1" />
              <div>
                <h4 className="text-lg font-semibold">Phone</h4>
                <p className="text-gray-600">+1 (800) 123-4567</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-2xl text-black mt-1" />
              <div>
                <h4 className="text-lg font-semibold">Address</h4>
                <p className="text-gray-600">123 E-commerce Ave, Tech City, NY 10001</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-100 p-8 rounded-lg shadow-md">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  placeholder="Your message..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Map */}
        <div className="mt-20 rounded-xl overflow-hidden shadow-md">
          <iframe
            title="Store Location"
            className="w-full h-80"
            loading="lazy"
            allowFullScreen
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019227170232!2d-122.4206795846818!3d37.774929779759204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808b09310e5f%3A0x5391a309c0e06c4d!2sMarket%20St%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1615849574985!5m2!1sen!2sus"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;


