import 'swiper/css';
import 'swiper/css/pagination';
import './banner-slider.css';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useAppSelector } from '../../hooks';
import Banner from '../banner/banner';
import { getPromoList } from '../../store/cameras-data/cameras-data.selectors';

function BannerSlider(): JSX.Element {
  const promoCards = useAppSelector(getPromoList);

  return (
    <Swiper modules={[Pagination, Autoplay]}
      data-testid="swiper-container"
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
    >
      {promoCards.map((promo) => <SwiperSlide key={promo.id} data-testid="swiper-slider"><Banner promo={promo}/></SwiperSlide>)}
    </Swiper>
  );
}

export default BannerSlider;
