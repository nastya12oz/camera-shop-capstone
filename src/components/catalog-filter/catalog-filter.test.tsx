import { render, screen } from '@testing-library/react';
import CatalogFilter from './catalog-filter';

describe('Component: Catalog Filter Form', () => {
  it('should render correctly', () => {
    const expectedText = 'Фильтр';

    render(<CatalogFilter />);
    const filterText = screen.getByText(expectedText);
    const button = screen.getByRole('button');

    expect(filterText).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('disables checkbox', () => {
    const selectedFilter = 'Плёночная';

    render(<CatalogFilter />);
    const checked = screen.getByLabelText(selectedFilter);

    expect(checked).toBeDisabled();
  });
});
