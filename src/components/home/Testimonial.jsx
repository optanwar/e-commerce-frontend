import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';

const testimonials = [
  {
    rating: 4.9,
    text: 'lorem200 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
    name: 'Harsh P.',
    role: 'Product Designer',
    image: 'https://pagedone.io/asset/uploads/1696229994.png',
  },
  {
    rating: 4.9,
    text: 'lorem200 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
    name: 'Sarah W.',
    role: 'UI/UX Designer',
    image: 'https://pagedone.io/asset/uploads/1696229994.png',
  },
  {
    rating: 5,
    text: 'lorem200 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
    name: 'Jason T.',
    role: 'Project Manager',
    image: 'https://pagedone.io/asset/uploads/1696229994.png',
  },
  {
    rating: 4.9,
    text: 'lorem200 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
    name: 'Nina D.',
    role: 'Marketing Specialist',
    image: 'https://pagedone.io/asset/uploads/1696229994.png',
  },
  {
    rating: 4.9,
    text: 'lorem200 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
    name: 'Nina D.',
    role: 'Marketing Specialist',
    image: 'https://pagedone.io/asset/uploads/1696229994.png',
  },
  
];

const Testimonial = () => {
  return (
    <div className='container px-6 py-10 md:py-16'>
      <div className='py-10'>
        <p className="text-gray-600 mt-4">Testimonial</p>
        <h2 className="text-3xl font-bold text-gray-900">What our happy customers says!</h2>
      </div>
      <Swiper
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        spaceBetween={30}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="group bg-white border border-solid border-gray-300 flex justify-between flex-col rounded-xl p-6 transition-all duration-500 w-full mx-auto hover:border-indigo-600 hover:shadow-sm">
              <div>
                <div className="flex items-center mb-7 gap-2 text-amber-500 transition-all duration-500">
                  <svg className="w-5 h-5" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8.10326 1.31699C8.47008 0.57374 9.52992 0.57374 9.89674 1.31699L11.7063 4.98347C11.8519 5.27862 12.1335 5.48319 12.4592 5.53051L16.5054 6.11846C17.3256 6.23765 17.6531 7.24562 17.0596 7.82416L14.1318 10.6781C13.8961 10.9079 13.7885 11.2389 13.8442 11.5632L14.5353 15.5931C14.6754 16.41 13.818 17.033 13.0844 16.6473L9.46534 14.7446C9.17402 14.5915 8.82598 14.5915 8.53466 14.7446L4.91562 16.6473C4.18199 17.033 3.32456 16.41 3.46467 15.5931L4.15585 11.5632C4.21148 11.2389 4.10393 10.9079 3.86825 10.6781L0.940384 7.82416C0.346867 7.24562 0.674378 6.23765 1.4946 6.11846L5.54081 5.53051C5.86652 5.48319 6.14808 5.27862 6.29374 4.98347L8.10326 1.31699Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="text-base font-semibold text-indigo-600">{testimonial.rating}</span>
                </div>
                <p className="text-base text-gray-600 leading-6 transition-all duration-500 pb-8 group-hover:text-gray-800">
                  {testimonial.text}
                </p>
              </div>
              <div className="flex items-center gap-5 pt-5 border-t border-solid border-gray-200">
                <img
                  className="rounded-full h-10 w-10 object-cover"
                  src={testimonial.image}
                  alt={`${testimonial.name} avatar`}
                />
                <div>
                  <h5 className="text-gray-900 font-medium transition-all duration-500 mb-1">
                    {testimonial.name}
                  </h5>
                  <span className="text-sm leading-4 text-gray-500">{testimonial.role}</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonial;
