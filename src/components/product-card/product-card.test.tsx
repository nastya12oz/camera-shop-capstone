import { render, screen } from '@testing-library/react';
import { makeFakeCamera, makeFakeStore } from '../../mock/mock';
import { withHistory, withStore } from '../../mock/mock-components';
import ProductCard from './product-card';

describe('Component: Product Card', () => {
  const camera = makeFakeCamera();
  const fakeStore = makeFakeStore({
    CAMERAS: {
      camerasList: [],
      camera,
      similarsList: [],
      promoList: [],
      hasCameraError: false,
      isCameraDataLoading: false,
      filteredCameras: [],
      isCameraListLoading: false
    }
  });

  it('should render correctly', () => {
    const productTestId = 'product-card-test';
    const expectedRateText = 'Всего оценок:';
    const expectedPriceText = 'Цена:';
    const expectedBuyText = 'Купить';

    const {withStoreComponent} = withStore(<ProductCard productCard={camera} isActive />, fakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    expect(screen.getByTestId(productTestId)).toBeInTheDocument();
    expect(screen.getByText(expectedRateText)).toBeInTheDocument();
    expect(screen.getByText(expectedPriceText)).toBeInTheDocument();
    expect(screen.getByText(expectedBuyText)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
