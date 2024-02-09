import { useState } from 'react';
import { DISPLAYED_CARDS_IN_SLIDER } from '../../const';
import ProductCard from '../product-card/product-card';
import { TCamerasList } from '../../types/cameras';
import './similar-products.css';

type SimilarProductsProps = {
  similarProductsList: TCamerasList;
}

function SimilarProducts({similarProductsList}: SimilarProductsProps): JSX.Element {

  const [similarProductsCount, setSimilarProductsCount] = useState(DISPLAYED_CARDS_IN_SLIDER);
  const currentSimilar = similarProductsList.slice(similarProductsCount - DISPLAYED_CARDS_IN_SLIDER, similarProductsCount);
  const isReturnButtonDisabled = similarProductsCount === DISPLAYED_CARDS_IN_SLIDER;
  const isNextButtonDisabled = similarProductsList.length === similarProductsCount || similarProductsList.length < similarProductsCount && similarProductsList.length > similarProductsCount - DISPLAYED_CARDS_IN_SLIDER;


  return(
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <div className="product-similar__slider">
            <div className="product-similar__slider-list">
              {currentSimilar.map((product) => <ProductCard key={product.id} productCard={product} isActive />)}
            </div>
            <button
              className="controls slider-controls--prev"
              type="button"
              aria-label="Предыдущий слайд"
              onClick={() => setSimilarProductsCount((prevCount) => prevCount - DISPLAYED_CARDS_IN_SLIDER)}
              disabled={isReturnButtonDisabled}
            >
              <svg width={7} height={12} aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
            <button
              className="controls slider-controls--next"
              type="button"
              aria-label="Следующий слайд"
              onClick={() => setSimilarProductsCount((prevCount) => prevCount + DISPLAYED_CARDS_IN_SLIDER)}
              disabled={isNextButtonDisabled}
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

export default SimilarProducts;
