import { render, screen, waitFor } from '@testing-library/react';
import { withHistory, withStore } from '../../mock/mock-components';
import { makeFakeCamera, makeFakeStore } from '../../mock/mock';
import ProductScreen from './product-screen';

describe('Component: Product Screen', () => {
  const camera = makeFakeCamera();
  const fakeStore = makeFakeStore({
    CAMERAS: {
      camerasList: [],
      camera,
      similarsList: [],
      promoList: [],
      hasCameraError: false,
      isCameraDataLoading: false
    }
  });

  it('should render correctly', () => {
    const expectedTestId = 'product-container';
    const expectedTitle = `${camera.name} - Фотошоп`;
    const {withStoreComponent} = withStore(<ProductScreen />, fakeStore);

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    waitFor(() => {
      expect(screen.getByText(expectedTestId)).toBeInTheDocument();
      expect(screen.getByTitle(expectedTitle)).toBeInTheDocument();
    });
  });
});
