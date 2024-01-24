import ProductCard from '../product-card/product-card';
import { TCamerasList, TCamera } from '../../types/cameras';
import { AppRoute } from '../../const';
import { useLocation } from 'react-router-dom';

type ProductCardListProps = {
  products: TCamerasList;
  onAddToBasket: (camera: TCamera) => void;
  isActive: boolean;

}

function ProductCardList({products, onAddToBasket, isActive}: ProductCardListProps): JSX.Element {
  const {pathname} = useLocation();
  const isCatalogPage = pathname === AppRoute.Catalog;
  console.log(isActive);

  return (
    isCatalogPage ? (
      <div className="cards catalog__cards">
        {products.map((camera) => (
          <ProductCard
            key={camera.id}
            productCard={camera}
            onAddToBasket={() => onAddToBasket(camera)}
            isActive={isActive}
          />
        ))}
      </div>
    ) : (
      <div className="product-similar__slider-list">
        {products.map((camera) => (
          <ProductCard
            key={camera.id}
            productCard={camera}
            onAddToBasket={() => onAddToBasket(camera)}
            isActive={isActive}
          />
        ))}
      </div>
    )
  );
}

export default ProductCardList;
