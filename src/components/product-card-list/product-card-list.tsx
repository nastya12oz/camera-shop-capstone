import ProductCard from '../product-card/product-card';
import { TCamerasList } from '../../types/cameras';


type ProductCardListProps = {
  products: TCamerasList;
  isActive: boolean;
}

function ProductCardList({products, isActive}: ProductCardListProps): JSX.Element {


  return (
    <div className='cards catalog__cards'>
      {products.map((camera) => (
        <ProductCard
          key={camera.id}
          productCard={camera}
          isActive={isActive}
        />
      ))}
    </div>
  );
}

export default ProductCardList;
