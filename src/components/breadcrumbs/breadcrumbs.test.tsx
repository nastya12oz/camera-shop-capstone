import { withHistory } from '../../mock/mock-components';
import { render, screen } from '@testing-library/react';
import Breadcrumbs from './breadcrumbs';

describe('Component: FilmDetails', () => {
  const productName = 'Camera';
  it('should render correctly', () => {
    const expectedMainText = 'Главная';
    const expectedCatalogText = 'Каталог';

    const preparedComponent = withHistory(<Breadcrumbs productName={productName} />);

    render(preparedComponent);

    expect(screen.getByText(expectedMainText)).toBeInTheDocument();
    expect(screen.getByText(expectedCatalogText)).toBeInTheDocument();
  });
});
