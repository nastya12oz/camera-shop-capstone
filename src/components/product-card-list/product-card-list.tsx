import ProductCard from '../product-card/product-card';

function ProductCardList(): JSX.Element {
  return(
    <div className="cards catalog__cards">
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
}

export default ProductCardList;

