import ProductCard from '../product-card/product-card';
import { TCamerasList } from '../../types/cameras';


type ProductCardListProps = {
  products: TCamerasList;
}

function ProductCardList({products}: ProductCardListProps): JSX.Element {


  return (
    <div className="cards catalog__cards">
      {products.map((camera) => (
        <ProductCard key={camera.id} productCard={camera} />
      ))}
    </div>
  );
}


export default ProductCardList;

