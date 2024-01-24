import { useAppSelector } from '../../hooks';
import { getPromoList } from '../../store/promo-data/promo-data.selectors';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function Banner(): JSX.Element {
  const promoList = useAppSelector(getPromoList);
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromoIndex((prevIndex) =>
        prevIndex === promoList.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [promoList.length]);

  const currentPromo = promoList[currentPromoIndex];


  return (
    <div className="banner">
      {currentPromo && (
        <>
          <picture>
            <source type="image/webp" srcSet={`${currentPromo.previewImgWebp}, ${currentPromo.previewImg2x} 2x`}/>
            <img src={currentPromo.previewImg} srcSet={currentPromo.previewImg2x} width={1280} height={280} alt={currentPromo.name} />
          </picture>
          <p className="banner__info">
            <span className="banner__message">Новинка!</span>
            <span className="title title--h1">{currentPromo.name}</span>
            <span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span>
            <Link className="btn" to={(`${AppRoute.Product}`.replace(':id', currentPromo.id.toString()))}>Подробнее</Link>
          </p>
        </>
      )}
    </div>
  );
}
export default Banner;
