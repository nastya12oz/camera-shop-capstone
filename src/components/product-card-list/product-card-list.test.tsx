import { render, screen } from '@testing-library/react';
import { makeFakeCameras, makeFakeStore } from '../../mock/mock';
import { withHistory, withStore } from '../../mock/mock-components';
import ProductCardList from './product-card-list';


describe('Component: Catalog List', () => {
  const camerasList = makeFakeCameras();
  const fakeStore = makeFakeStore({
    CAMERAS: {
      camerasList,
      camera: null,
      similarsList: [],
      promoList: [],
      hasCameraError: false,
      isCameraDataLoading: false
    }
  });

  it('should render correctly', () => {
    const productTestId = 'product-test';
    const {withStoreComponent} = withStore(<ProductCardList products={camerasList} isActive />, fakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    expect(screen.getByTestId(productTestId)).toBeInTheDocument();
  });
});
