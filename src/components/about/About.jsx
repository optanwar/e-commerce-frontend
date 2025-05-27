import React from 'react';

const About = () => {
  return (
    <section className="bg-white text-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Story</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            At LuxeCart, we’re redefining online shopping by offering a seamless, curated experience that puts quality and customer satisfaction first.
          </p>
        </div>

        {/* Image + Text Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="w-full h-full">
            <img
              src="https://images.pexels.com/photos/5810700/pexels-photo-5810700.jpeg?auto=compress&cs=tinysrgb&w=600" // Use your real image here
              alt="About LuxeCart"
              className="w-full h-auto rounded-xl shadow-md"
            />
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Why LuxeCart?</h2>
            <p className="mb-4 text-gray-700 leading-relaxed">
              Founded in 2022, LuxeCart is built on a passion for delivering stylish, high-quality products at fair prices. From trendsetting fashion to home essentials, every item is carefully curated by our team.
            </p>
            <p className="mb-4 text-gray-700 leading-relaxed">
              We don’t just sell products — we create experiences. With fast shipping, dedicated customer support, and an easy-to-use platform, LuxeCart ensures every shopper feels valued and confident.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our promise? Trend, trust, and top-notch quality — always.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-6">What We Stand For</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              {
                title: 'Quality First',
                desc: 'We handpick products that meet strict quality standards — built to last and impress.',
              },
              {
                title: 'Customer-Centric',
                desc: 'Our shoppers are at the heart of everything we do. Your satisfaction is our success.',
              },
              {
                title: 'Innovation Driven',
                desc: 'We constantly evolve our collections and experience to stay ahead in design and tech.',
              },
            ].map((value, index) => (
              <div key={index} className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 bg-gray-50 rounded-xl p-10 text-center shadow">
          <h2 className="text-2xl font-semibold mb-2">Join Thousands of Happy Shoppers</h2>
          <p className="text-gray-600 mb-4">Discover your new favorites today at LuxeCart.</p>
          <a
            href="/shop"
            className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Start Shopping
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
