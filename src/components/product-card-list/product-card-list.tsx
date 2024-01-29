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

  const className = isCatalogPage ? 'cards catalog__cards' : 'product-similar__slider-list';

  return (
    <div className={className}>
      {products.map((camera) => (
        <ProductCard
          key={camera.id}
          productCard={camera}
          onAddToBasket={() => onAddToBasket(camera)}
          isActive={isActive}
        />
      ))}
    </div>
  );
}

export default ProductCardList;
