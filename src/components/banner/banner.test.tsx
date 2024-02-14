import { render, screen } from '@testing-library/react';
import { makeFakeCamera } from '../../mock/mock';
import { withHistory } from '../../mock/mock-components';
import Banner from './banner';

describe('Component: Banner', () => {
  const card = makeFakeCamera();
  it('should render correctly', () => {
    const expectedMessageText = 'Новинка!';
    const expectedBannerText = /Профессиональная камера/i;

    const preparedComponent = withHistory(<Banner promo={card} />);

    render(preparedComponent);

    expect(screen.getByText(expectedMessageText)).toBeInTheDocument();
    expect(screen.getByText(expectedBannerText)).toBeInTheDocument();
  });
});
