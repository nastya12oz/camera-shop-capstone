import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SimilarProductsSwiper from './similar-products-swiper';
import { makeFakeCameras } from '../../mock/mock';
import { ReactElement } from 'react';

describe('Component: Similar Products', () => {
  const similarProductsList = makeFakeCameras();

  const renderWithRouter = (component: ReactElement) => render(<BrowserRouter>{component}</BrowserRouter>);

  it('should render correctly', () => {
    const expectedText = 'Похожие товары';

    renderWithRouter(<SimilarProductsSwiper similarProductsList={similarProductsList} />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render ProductCard for each similar product', () => {
    const productCardTestId = 'product-card-test';

    renderWithRouter(<SimilarProductsSwiper similarProductsList={similarProductsList} />);

    expect(screen.getAllByTestId(productCardTestId)).toHaveLength(similarProductsList.length);
  });
});
