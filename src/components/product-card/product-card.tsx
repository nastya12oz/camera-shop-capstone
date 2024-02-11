import { TCamera } from '../../types/cameras';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import classNames from 'classnames';
import RatingStars from '../rating-stars/rating-stars';
import ButtonAddToBasket from '../button-add-to-basket/button-add-to-basket';
import { generatePath } from 'react-router-dom';
import { CameraTab } from '../../const';


type ProductCardProps = {
  productCard: TCamera;
  isActive: boolean;
}

function ProductCard({productCard, isActive = false}: ProductCardProps): JSX.Element {


  return(
    <div className={classNames('product-card', { 'is-active': isActive })}>
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={productCard.previewImgWebp} />
          <img src={productCard.previewImg} srcSet={productCard.previewImg2x} width={280} height={240} alt={productCard.name} />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <RatingStars rating={productCard.rating} />
          <p className="visually-hidden">Рейтинг: {productCard.rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{productCard.reviewCount}</p>
        </div>
        <p className="product-card__title">{productCard.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{productCard.price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <ButtonAddToBasket product={productCard} />
        <Link
          className="btn btn--transparent"
          to={`${generatePath(AppRoute.Product, { id: productCard.id.toString() })}?tab=${CameraTab.Description}`}
        >
  Подробнее
        </Link>
      </div>
    </div>

  );
}

export default ProductCard;
