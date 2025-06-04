import React from 'react';

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: '5 Fun Health Tips for Kids',
      excerpt:
        'Keeping your child healthy doesn’t have to be boring! Discover 5 creative ways to make wellness fun and tasty.',
      image:
        'https://images.pexels.com/photos/8669985/pexels-photo-8669985.jpeg?auto=compress&cs=tinysrgb&w=600',
      date: 'June 1, 2025',
      author: 'Dr. Sweet Berry',
    },
    {
      id: 2,
      title: 'Why Gummies Are the New Kids’ Favorite Vitamin',
      excerpt:
        'Learn why gummy supplements are becoming a parent-approved way to ensure your kids get the nutrients they need.',
      image:
        'https://images.pexels.com/photos/8409851/pexels-photo-8409851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      date: 'May 20, 2025',
      author: 'Lisa from YummyGummies',
    },
    {
      id: 3,
      title: 'Behind the Scenes: How Our Gummies Are Made',
      excerpt:
        'From sourcing natural ingredients to fun-shaped molds—take a look inside the sweet science of gummy making!',
      image:
        'https://images.pexels.com/photos/5469204/pexels-photo-5469204.jpeg?auto=compress&cs=tinysrgb&w=600',
      date: 'May 10, 2025',
      author: 'Chef Gummy',
    },
  ];

  return (
    <main className="bg-lightBg text-darkText min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-64 md:h-96 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/5469031/pexels-photo-5469031.jpeg?auto=compress&cs=tinysrgb&w=600')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 to-accent/80" />
        <h1 className="relative z-10 text-white text-4xl md:text-6xl font-extrabold text-center font-heading">
          Our <span className="text-accent">Blog</span>
        </h1>
      </section>

      {/* Blog Posts Grid */}
      <section className="max-w-7xl mx-auto py-16 px-6 md:px-12 lg:px-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition border  border-primary border-dotted"
            >
              <img src={post.image} alt={post.title} className="w-full h-52 object-cover" />
              <div className="p-6 space-y-3">
                <h2 className="text-xl font-semibold text-primary">{post.title}</h2>
                <p className="text-sm text-gray-600">
                  {post.date} • {post.author}
                </p>
                <p className="text-gray-700 text-base">{post.excerpt}</p>
                <a href="#" className="inline-block mt-3 text-accent hover:underline font-medium">
                  Read More →
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
