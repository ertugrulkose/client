import React from "react";
// Swiper bileşenleri
import { Swiper, SwiperSlide } from "swiper/react";
// Swiper modülleri
import { Navigation, Pagination, Autoplay } from "swiper/modules";
// Swiper CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HeroSlider = () => {
  // Gösterilecek banner resimlerini dizi halinde tut
  const slides = [
    { id: 1, imageUrl: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2hvcHxlbnwwfHwwfHx8MA%3D%3D", alt: "Kampanya 1" },
    { id: 2, imageUrl: "https://plus.unsplash.com/premium_photo-1681488262364-8aeb1b6aac56?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Kampanya 2" },
    { id: 3, imageUrl: "https://plus.unsplash.com/premium_photo-1674641194949-e154719cdc02?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Kampanya 3" },
  ];

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]} 
      spaceBetween={0}              // Slaytlar arası boşluk
      slidesPerView={1}             // Her seferde 1 slayt göster
      navigation                    // Önceki / Sonraki okları aktif
      pagination={{ clickable: true }} // Altta noktalar (dot) var
      autoplay={{ delay: 3000 }}    // 3sn sonra otomatik geçiş
      loop={true}                   // Sonsuz döngü
      style={{ width: "100%", height: "400px" }} // Slider boyutu
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          {/* Resim */}
          <img
            src={slide.imageUrl}
            alt={slide.alt}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlider;
