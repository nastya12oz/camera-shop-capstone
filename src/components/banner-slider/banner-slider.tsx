import 'swiper/css';
import 'swiper/css/pagination';
import './banner-slider.css';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useAppSelector } from '../../hooks';
import { getPromoList } from '../../store/promo-data/promo-data.selectors';
import Banner from '../banner/banner';

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
      {promoCards.map((promo) => <SwiperSlide key={promo.id}><Banner promo={promo} /></SwiperSlide>)}
    </Swiper>
  );
}

export default BannerSlider;
