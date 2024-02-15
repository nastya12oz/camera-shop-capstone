import { render, screen, waitFor } from '@testing-library/react';
import CatalogScreen from './catalog-screen';
import { withHistory, withStore } from '../../mock/mock-components';
import { makeFakeCameras, makeFakeStore } from '../../mock/mock';

describe('Component: Catalog Screen', () => {
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
    const expectedText = 'Каталог фото- и видеотехники';
    const expectedPageContantTestId = 'pageContentElement';
    const expectedSortingTestId = 'sorting';

    const {withStoreComponent} = withStore(<CatalogScreen />, fakeStore);

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    waitFor(() => {
      expect(screen.getByText(expectedText)).toBeInTheDocument();
      expect(screen.getByTestId(expectedPageContantTestId)).toBeInTheDocument();
      expect(screen.getByTestId(expectedSortingTestId)).toBeInTheDocument();
    });
  });
});
