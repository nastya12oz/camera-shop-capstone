import { getSimilarsList } from '../../store/cameras-data/cameras-data.selectors';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect, useState } from 'react';
import { fetchSimilarListAction } from '../../store/api-actions';
import ProductCardList from '../product-card-list/product-card-list';
import { TCamera } from '../../types/cameras';
import { DISPLAYED_CARDS_IN_SLIDER } from '../../const';

type SimilarProductsProps = {
  id: string;
}

function SimilarProducts({id}: SimilarProductsProps): JSX.Element {

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchSimilarListAction(id));
    }
  }, [id, dispatch]);

  const similarList = useAppSelector(getSimilarsList);

  type ModalInfoState = {
    isVisible: boolean;
    product: TCamera | null;
  };


  const [modalInfo, setModalInfo] = useState<ModalInfoState>({ isVisible: false, product: null });
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);

  const handleNextClick = () => {
    setVisibleStartIndex((prevIndex) => Math.min(prevIndex + DISPLAYED_CARDS_IN_SLIDER, similarList.length - DISPLAYED_CARDS_IN_SLIDER));
  };

  const handlePrevClick = () => {
    setVisibleStartIndex((prevIndex) => Math.max(prevIndex - DISPLAYED_CARDS_IN_SLIDER, 0));
  };

  const isPrevDisabled = visibleStartIndex === 0;
  const isNextDisabled = visibleStartIndex >= similarList.length - DISPLAYED_CARDS_IN_SLIDER;


  return(
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>

          <div className="product-similar__slider">
            <ProductCardList
              products={similarList.slice(visibleStartIndex, visibleStartIndex + DISPLAYED_CARDS_IN_SLIDER)}
              onAddToBasket={(product) => setModalInfo({ isVisible: true, product })}
              isActive
            />

            <button className="slider-controls slider-controls--prev" type="button" aria-label="Предыдущий слайд" disabled={isPrevDisabled} onClick={handlePrevClick}>
              <svg width={7} height={12} aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
            <button className="slider-controls slider-controls--next" type="button" aria-label="Следующий слайд" disabled={isNextDisabled} onClick={handleNextClick}>
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
