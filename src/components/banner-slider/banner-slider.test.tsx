import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { makeFakePromo, makeFakeStore } from '../../mock/mock';
import { withStore } from '../../mock/mock-components';
import BannerSlider from './banner-slider';

describe('Component: Banner Slider', () => {
  const promoList = makeFakePromo();
  const fakeStore = makeFakeStore({
    CAMERAS: {
      camerasList: [],
      camera: null,
      similarsList: [],
      promoList,
      hasCameraError: false,
      isCameraDataLoading: false,
    }
  });

  const renderComponent = () =>
    render(
      <BrowserRouter>
        {withStore(<BannerSlider />, fakeStore).withStoreComponent}
      </BrowserRouter>
    );

  it('should render correctly', () => {
    const expectedTestId = 'swiper-container';

    renderComponent();

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });

  it('should display promo cards', () => {
    const expectedTestId = 'swiper-slider';

    renderComponent();

    expect(screen.getAllByTestId(expectedTestId)).toHaveLength(promoList.length);
  });
});
