// src/components/TestimonialCarousel.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Sarah, Mom of 2",
    text: "My kids LOVE these gummies! Finally something healthy they’re excited about.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "John, Dad of 3",
    text: "Great taste and no added sugar — these are a game-changer for our family!",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Emily, Pediatrician",
    text: "I recommend YummyGummies to all my patients. Safe and packed with nutrients!",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    name: "Liam, Dad of 1",
    text: "My daughter asks for these every day. I’ve never seen her enjoy vitamins before!",
    image: "https://randomuser.me/api/portraits/men/51.jpg",
  },
];

export default function TestimonialCarousel() {
  return (
    <section className="bg-lightGray py-16  sm:py-20 sm:px-6 md:px-8 md:py-24 lg:py-28 xl:py-32 2xl:py-36 px-4">
      <h2 className="text-3xl font-heading text-accent text-center mb-10">
        What Parents Are Saying
      </h2>

      <div className="max-w-6xl mx-auto ">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          loop
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            0: { slidesPerView: 1 },
          }}
        >
          {testimonials.map((t, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white p-6 md:py-10 border border-dotted border-primary rounded-xl shadow-soft text-center mx-auto max-w-md">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                />
                <p className="text-sm text-darkText mb-3">"{t.text}"</p>
                <h4 className="text-primary font-semibold">{t.name}</h4>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
