import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getSimilarsList } from '../../store/cameras-data/cameras-data.selectors';
import ProductCard from '../product-card/product-card';
import { useEffect } from 'react';
import { fetchSimilarListAction } from '../../store/api-actions';

type SimilarProductsSwiperProps = {
  id: string;
}

function SimilarProductsSwiper({id}: SimilarProductsSwiperProps): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchSimilarListAction(id));
    }
  }, [id, dispatch]);

  const similarList = useAppSelector(getSimilarsList);

  return(

    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>


          <div className="product-similar__slider">
            <Swiper modules={[Navigation]}
              slidesPerView={3}
              navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
            >

              {similarList.map((similarProduct) => <SwiperSlide key={similarProduct.id}><ProductCard productCard={similarProduct} isActive /></SwiperSlide>)}

            </Swiper>

            <button className="swiper-button-prev slider-controls slider-controls--prev" type="button" aria-label="Предыдущий слайд">
              <svg width={7} height={12} aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
            <button className="swiper-button-next slider-controls slider-controls--next" type="button" aria-label="Следующий слайд">
              <svg width={7} height={12} aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
          </div>

        </div>
      </section>
    </div>


  );
}

export default SimilarProductsSwiper;
