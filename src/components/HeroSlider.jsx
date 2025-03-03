import React from "react";
// Swiper bileşenleri
import { Swiper, SwiperSlide } from "swiper/react";
// Swiper modülleri
import { Navigation, Pagination, Autoplay } from "swiper";
// Swiper CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HeroSlider = () => {
  // Gösterilecek banner resimlerini dizi halinde tut
  const slides = [
    { id: 1, imageUrl: "/images/banner1.jpg", alt: "Kampanya 1" },
    { id: 2, imageUrl: "/images/banner2.jpg", alt: "Kampanya 2" },
    { id: 3, imageUrl: "/images/banner3.jpg", alt: "Kampanya 3" },
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
