import ProductCard from '../product-card/product-card';
import { Swiper, SwiperSlide } from 'swiper/react';
import './similar-products.css';
import { Navigation } from 'swiper/modules';
import { DISPLAYED_CARDS_IN_SLIDER } from '../../const';
import { TCamerasList } from '../../types/cameras';

type SimilarProductsProps = {
  similarProductsList: TCamerasList;
};

function SimilarProductsSwiper({ similarProductsList }: SimilarProductsProps): JSX.Element {
  return (
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <div className="product-similar__slider">
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: '.slider-controls--next',
                prevEl: '.slider-controls--prev',
              }}
              spaceBetween={30}
              slidesPerView={DISPLAYED_CARDS_IN_SLIDER}
              slidesPerGroup={DISPLAYED_CARDS_IN_SLIDER}
              wrapperClass="product-similar__slider-list"
            >
              {similarProductsList.map((product) => (
                <SwiperSlide key={product.id} >
                  <ProductCard productCard={product} isActive />
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              className="controls slider-controls--prev"
              type="button"
              aria-label="Предыдущий слайд"
              style={{ pointerEvents: 'auto' }}
            >
              <svg width={7} height={12} aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
            <button
              className="controls slider-controls--next"
              type="button"
              aria-label="Следующий слайд"
              style={{ pointerEvents: 'auto' }}
            >
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
