import ProductCard from '../product-card/product-card';
import { TCamerasList, TCamera } from '../../types/cameras';


type ProductCardListProps = {
  products: TCamerasList;
  onAddToBasket: (camera: TCamera) => void;
}

function ProductCardList({products, onAddToBasket}: ProductCardListProps): JSX.Element {


  return (
    <div className="cards catalog__cards">
      {products.map((camera) => (
        <ProductCard
          key={camera.id}
          productCard={camera}
          onAddToBasket={() => onAddToBasket(camera)}
        />
      ))}
    </div>
  );
}


export default ProductCardList;

