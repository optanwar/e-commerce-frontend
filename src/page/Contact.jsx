import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <main className="bg-lightBg text-darkText min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-64 md:h-96 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/8409851/pexels-photo-8409851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        }}
      >
        <div className="absolute inset-0 bg-primary bg-opacity-70" />
        <h1 className="relative z-10 text-white text-4xl md:text-6xl font-extrabold text-center font-heading">
          Contact <span className="text-accent">Us</span>
        </h1>
      </section>

      {/* Contact Info + Form */}
      <section className="max-w-7xl mx-auto py-16 px-6 md:px-12 lg:px-20 grid gap-12 md:grid-cols-2">
        {/* Info */}
        <div className="space-y-6">
          <h2 className="text-3xl font-heading text-accent font-semibold">
            We’d love to hear from you
          </h2>
          <p className="text-lg text-gray-700">
            Questions about our gummies or your order? Just want to say hi? We're here to help!
          </p>
          <div className="space-y-4 text-base">
            <p className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary" />
              <a href="mailto:support@yummygummies.com" className="hover:underline">
                support@yummygummies.com
              </a>
            </p>
            <p className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary" />
              <a href="tel:+1234567890" className="hover:underline">
                +1 (234) 567-890
              </a>
            </p>
            <p className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              123 Gummy Lane, Sweet City, USA
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          className="bg-white p-8 rounded-2xl shadow-lg space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Message sent! We'll get back to you soon.");
          }}
        >
          <div>
            <label htmlFor="name" className="block font-semibold mb-1">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-semibold mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="message" className="block font-semibold mb-1">
              Your Message
            </label>
            <textarea
              id="message"
              rows="5"
              placeholder="Type your message here..."
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition"
          >
            Send Message
          </button>
        </form>
      </section>
    </main>
  );
}
