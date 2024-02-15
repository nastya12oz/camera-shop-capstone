import { render, screen, waitFor, RenderResult } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SimilarProducts from './similar-products';
import { makeFakeCameras } from '../../mock/mock';
import { ReactElement } from 'react';
import { DISPLAYED_CARDS_IN_SLIDER } from '../../const';

describe('Component: Similar Products', () => {
  const similarProductsList = makeFakeCameras();

  const renderWithRouter = (component: ReactElement): RenderResult => render(<BrowserRouter>{component}</BrowserRouter>);

  it('should render correctly', () => {
    const expectedText = 'Похожие товары';

    renderWithRouter(<SimilarProducts similarProductsList={similarProductsList} />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render ProductCard for each similar product', () => {
    const productCardTestId = 'product-card';

    renderWithRouter(<SimilarProducts similarProductsList={similarProductsList} />);

    waitFor(() => {
      expect(screen.queryAllByTestId(productCardTestId)).toHaveLength(DISPLAYED_CARDS_IN_SLIDER);
    });
  });

  it('should disable return button when at the beginning', () => {
    const returnButton = 'Предыдущий слайд';

    renderWithRouter(<SimilarProducts similarProductsList={similarProductsList} />);

    expect(screen.getByLabelText(returnButton)).toBeDisabled();
  });

  it('should disable next button when at the end', () => {
    const nextButton = 'Следующий слайд';

    renderWithRouter(<SimilarProducts similarProductsList={similarProductsList} />);

    waitFor(() => {
      expect(screen.getByLabelText(nextButton)).toBeDisabled();
    });
  });
});
