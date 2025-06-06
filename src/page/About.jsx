// src/pages/About.jsx
import React from 'react';
import { ShieldCheck, Leaf, Handshake } from 'lucide-react';

export default function About() {
  return (
    <main className="bg-lightBg min-h-screen text-darkText">
      {/* Hero Section with background image, overlay, and children image */}
      <section
        className="relative bg-cover bg-center h-auto md:h-96 flex flex-col md:flex-row items-center justify-center px-6 md:px-20 py-16 md:py-0 gap-8"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 to-accent/80" />

        {/* Text */}
        <div className="relative max-w-xl text-center md:text-left z-10">
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold font-heading mb-4">
            About <span className="text-accent">YummyGummies</span>
          </h1>
          <p className="text-white text-lg sm:text-xl leading-relaxed max-w-md mx-auto md:mx-0">
            Healthy, delicious gummies specially made for kids — backed by parents and pediatricians
            across the USA.
          </p>
        </div>

        {/* Children Image */}
        <img
          src="https://media.istockphoto.com/id/641228030/photo/baby-boy-shopping-for-candies.jpg?s=2048x2048&w=is&k=20&c=L5iM1WJtpukbKYraTCTA_sjcHP-lzymQPZWni9SSW1Q="
          alt="Happy children eating gummies"
          className="relative rounded-xl shadow-lg object-cover w-64 sm:w-80 md:w-96 max-h-72 md:max-h-full z-10"
        />
      </section>

      {/* Our Story Section */}
      <section className="max-w-6xl mx-auto py-16 px-6 md:px-12 lg:px-20 grid md:grid-cols-2 gap-12 items-center">
        <img
          src="https://images.pexels.com/photos/7604364/pexels-photo-7604364.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Happy kids eating gummies"
          className="rounded-xl shadow-lg w-full object-cover max-h-96"
        />
        <div>
          <h2 className="text-3xl font-heading text-accent mb-6 font-semibold">Our Story</h2>
          <p className="text-gray-700 leading-relaxed text-lg md:text-xl">
            Founded by parents who struggled to find supplements their kids would actually enjoy,
            YummyGummies was born to bridge the gap between nutrition and taste. We create natural,
            no-added-sugar gummies, backed by pediatricians, designed to make vitamin time fun and
            worry-free. Our passion is fueling healthy habits for kids across the USA — one gummy at
            a time.
          </p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="max-w-6xl mx-auto py-16 px-6 md:px-12 lg:px-20 grid md:grid-cols-2 gap-12 items-center bg-primary bg-opacity-10 rounded-xl shadow-md">
        <div>
          <h2 className="text-3xl font-heading text-primary mb-6 font-semibold">Our Mission</h2>
          <p className="text-primary text-lg leading-relaxed">
            We’re committed to nurturing happy, healthy children by making wellness enjoyable and
            accessible for families everywhere. Using only premium, transparent ingredients and
            pediatrician-approved formulas, we want every child to thrive.
          </p>
        </div>
        <img
          src="https://images.pexels.com/photos/7604368/pexels-photo-7604368.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Kids playing outdoors"
          className="rounded-xl shadow-lg w-full object-cover max-h-96"
        />
      </section>

      {/* Our Values Section */}
      <section className="max-w-6xl mx-auto py-16 px-6 md:px-12 lg:px-10">
        <h2 className="text-3xl font-heading text-accent mb-12 text-center font-semibold">
          Our Core Values
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="bg-white p-8 rounded-xl shadow-md border border-dotted border-primary border-opacity-30 hover:shadow-lg transition">
            <div className="flex items-center gap-2  mb-4">
              <ShieldCheck className="text-primary" />
              <h3 className="text-xl font-semibold text-primary">Safety First</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Rigorous testing and quality control ensure that every gummy is safe and beneficial
              for your child.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md border border-dotted border-primary border-opacity-30 hover:shadow-lg transition">
            <div className="flex items-center gap-2  mb-4">
              <Leaf className="text-primary" />
              <h3 className="text-xl font-semibold text-primary">Natural Ingredients</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Only premium natural vitamins and flavors are used—free from artificial additives or
              preservatives.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md border border-dotted border-primary border-opacity-30 hover:shadow-lg transition">
            <div className="flex items-center gap-2  mb-4">
              <Handshake className="text-primary" />
              <h3 className="text-xl font-semibold text-primary">Transparency & Trust</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              We believe in clear, honest communication and labeling so you know exactly what your
              kids are getting.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="max-w-6xl mx-auto py-12 px-6 text-center">
        <h2 className="text-3xl font-heading text-primary font-semibold mb-6">
          Ready to make health fun?
        </h2>
        <p className="text-lg text-darkText mb-8 max-w-3xl mx-auto">
          Join thousands of happy families who trust YummyGummies for their children’s wellness.
        </p>
        <a
          href="/products"
          className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold rounded-full px-8 py-3 shadow-lg transition"
        >
          Shop Now
        </a>
      </section>
    </main>
  );
}
