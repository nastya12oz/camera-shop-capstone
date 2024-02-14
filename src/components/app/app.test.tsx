import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute } from '../../const';
import { makeFakeCamera, makeFakeStore } from '../../mock/mock';
import { withHistory, withStore } from '../../mock/mock-components';
import App from './app';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "Catalog Screen" when user navigate to "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Catalog);

    render(withStoreComponent);

    expect(screen.getByTestId('pageContentElement')).toBeInTheDocument();
  });

  it('should render "Product Screen" when user navigate to "/product/:id', () => {
    const camera = makeFakeCamera();
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore({
      CAMERAS: {
        camerasList: [],
        camera,
        similarsList: [],
        promoList: [],
        hasCameraError: false,
        isCameraDataLoading: false
      }
    }));

    mockHistory.push(`${AppRoute.Product}${camera.id}`);

    render(withStoreComponent);

    expect(screen.getByTestId('product-container')).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to none-existent route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore());
    const unknownRoute = '/unknown-route';

    mockHistory.push(unknownRoute);

    render(withStoreComponent);

    expect(screen.getByText('404 - not found....')).toBeInTheDocument();
    expect(screen.getByText('На главную')).toBeInTheDocument();
  });

});
