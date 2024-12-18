import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function HomeCarousel() {
  const [images] = useState([
    'https://via.placeholder.com/1920x1080',
    'https://via.placeholder.com/1920x1080',
    'https://via.placeholder.com/1920x1080',
  ]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true, // Enable next/prev arrows
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index + 1}`} className="w-full h-96 object-cover" />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default HomeCarousel;