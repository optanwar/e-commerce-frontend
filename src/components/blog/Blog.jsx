import React from 'react';

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: 'The Ultimate Summer Collection 2025',
      excerpt: 'Explore our latest arrivals and curated styles to elevate your summer wardrobe with ease and elegance.',
      image: 'https://images.pexels.com/photos/5810700/pexels-photo-5810700.jpeg?auto=compress&cs=tinysrgb&w=600',
      date: 'May 15, 2025',
      author: 'LuxeCart Editorial',
    },
    {
      id: 2,
      title: '5 Must-Have Accessories for Every Outfit',
      excerpt: 'From statement earrings to minimalist watches, discover the accessories that add personality to your look.',
      image: 'https://images.pexels.com/photos/5810700/pexels-photo-5810700.jpeg?auto=compress&cs=tinysrgb&w=600',
      date: 'May 5, 2025',
      author: 'Style Desk',
    },
    {
      id: 3,
      title: 'How We Source Sustainable Fabrics',
      excerpt: 'Take a look behind the scenes of LuxeCart’s commitment to sustainability and ethical sourcing.',
      image: 'https://images.pexels.com/photos/5810700/pexels-photo-5810700.jpeg?auto=compress&cs=tinysrgb&w=600',
      date: 'April 28, 2025',
      author: 'Sustainability Team',
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-6">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Blog</h1>
        <p className="text-gray-600 text-lg">
          Fresh insights, fashion tips, and behind-the-scenes stories from LuxeCart.
        </p>
      </div>

      {/* Blog Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition duration-300"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <p className="text-sm text-gray-500 mb-1">
                {post.date} • {post.author}
              </p>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h2>
              <p className="text-gray-700 text-sm mb-4">{post.excerpt}</p>
              <a
                href="#"
                className="text-black font-medium text-sm hover:underline"
              >
                Read more →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
