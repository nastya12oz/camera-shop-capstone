import { render, screen, fireEvent } from '@testing-library/react';
import { withStore, withHistory } from '../../mock/mock-components';
import CatalogSort from './catalog-sort';
import { makeFakeStore } from '../../mock/mock';

describe('Component: Catalog Sort Form', () => {
  const initialState = makeFakeStore();
  const { withStoreComponent } = withStore(<CatalogSort />, initialState);
  const componentWithHistory = withHistory(withStoreComponent);

  it('should render correctly', () => {
    const expectedText = 'Сортировать:';
    const labelPriceText = 'по цене';
    const labelPopularText = 'по популярности';
    const upSortTestId = 'up-sort';
    const downSortTestId = 'down-sort';

    render(componentWithHistory);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByLabelText(labelPriceText)).toBeInTheDocument();
    expect(screen.getByLabelText(labelPopularText)).toBeInTheDocument();
    expect(screen.getByTestId(upSortTestId)).toBeInTheDocument();
    expect(screen.getByTestId(downSortTestId)).toBeInTheDocument();
  });

  it('should change sort type on radio button change', () => {
    render(componentWithHistory);
    const sortPriceRadio = screen.getByLabelText('по цене');

    fireEvent.change(sortPriceRadio, { target: { checked: true } });

    expect(sortPriceRadio).toBeChecked();
  });
});
