import { TCamera } from '../../types/cameras';


type ProductCardProps = {
  productCard: TCamera;
  onAddToBasket: (camera: TCamera) => void;
}

function ProductCard({productCard, onAddToBasket}: ProductCardProps): JSX.Element {

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg width={17} height={16} aria-hidden="true" key={i}>
          <use xlinkHref={i < productCard.rating ? '#icon-full-star' : '#icon-star'}></use>
        </svg>
      );
    }
    return stars;
  };


  return(
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={productCard.previewImgWebp} />
          <img src={productCard.previewImg} srcSet={productCard.previewImg2x} width={280} height={240} alt={productCard.name} />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {renderStars()}
          <p className="visually-hidden">Рейтинг: {productCard.rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{productCard.reviewCount}</p>
        </div>
        <p className="product-card__title">{productCard.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{productCard.price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button" onClick={() => onAddToBasket(productCard)}>Купить
        </button>
        <a className="btn btn--transparent" href="#">Подробнее
        </a>
      </div>
    </div>

  );
}

export default ProductCard;
