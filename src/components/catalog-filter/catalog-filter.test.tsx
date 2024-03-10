import { render, screen } from '@testing-library/react';
import CatalogFilter from './catalog-filter';
import { withHistory, withStore } from '../../mock/mock-components';
import { makeFakeStore } from '../../mock/mock';

describe('Component: Catalog Filter Form', () => {
  const initialState = makeFakeStore();
  const { withStoreComponent } = withStore(<CatalogFilter />, initialState);
  const componentWithHistory = withHistory(withStoreComponent);

  it('should render correctly', () => {
    const expectedText = 'Фильтр';

    render(componentWithHistory);
    const filterText = screen.getByText(expectedText);
    const button = screen.getByRole('button');

    expect(filterText).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

});
