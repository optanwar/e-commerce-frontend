import React from 'react';

const About = () => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row start justify-between gap-10">
          {/* Image Section */}
          <div className="md:w-1/2">
            <img
              src="/inside.avif"
              alt="About"
              className="w-full h-auto rounded-lg"
            />
          </div>

          {/* Text Section */}
          <div className="md:w-1/2 mt-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 ">Headline</h2>
            <p className="text-gray-600 text-base leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At nemo quae exercitationem unde. Ab, fugit, tempore, ex maiores natus amet repudiandae cumque eos eveniet ut vel impedit. Id, mollitia reiciendis! Rerum modi at quisquam molestiae deleniti commodi cum, eius corporis sequi? Facilis quo totam deleniti voluptates eaque doloribus minima maiores corporis repellat nihil voluptate error dolor deserunt fugit ratione esse molestiae quod, repudiandae id obcaecati accusamus porro, laborum maxime? Ullam corrupti quis asperiores explicabo eum accusantium optio earum repellendus! Veniam optio at dignissimos quidem, ex saepe laboriosam amet ad ut totam magnam necessitatibus facilis aspernatur similique reiciendis? Rem, enim sapiente!
            </p>
            <p className="text-gray-600 text-base leading-relaxed">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore a, maiores quibusdam ea consequuntur illum alias! Maiores, dicta? Esse, doloremque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, asperiores.
            </p>
            <button className=" font-roboto mt-6 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded shadow">
            Know More
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
