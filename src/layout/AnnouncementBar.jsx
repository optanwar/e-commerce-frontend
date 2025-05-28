import React from 'react';

const AnnouncementBar = () => {
  return (
    <div className="w-full bg-primary py-2 px-4 flex items-center justify-center text-center transition-all duration-300 ease-in-out">
      <p className="text-white text-xs md:text-sm lg:text-base tracking-wide font-roboto underline cursor-pointer">
        This is an announcement bar!
      </p>
    </div>
  );
};

export default AnnouncementBar;
