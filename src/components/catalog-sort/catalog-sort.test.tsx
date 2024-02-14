import { render, screen } from '@testing-library/react';
import CatalogSort from './catalog-sort';

describe('Component: Catalog Sort Form', () => {
  it('should render correctly', () => {
    const expectedText = 'Сортировать:';
    const labelPriceText = 'по цене';
    const labelPopularText = 'по популярности';
    const upSortTestId = 'up-sort';
    const downSortTestId = 'down-sort';

    render(<CatalogSort/>);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByLabelText(labelPriceText)).toBeInTheDocument();
    expect(screen.getByLabelText(labelPopularText)).toBeInTheDocument();
    expect(screen.getByTestId(upSortTestId)).toBeInTheDocument();
    expect(screen.getByTestId(downSortTestId)).toBeInTheDocument();
  });
});
