import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mock/mock-components';
import Header from './header';
import { makeFakeStore } from '../../mock/mock';

describe('Component: Header', () => {
  it('should render correctly', () => {
    const expectedText = 'Каталог';
    const initialState = makeFakeStore();

    const { withStoreComponent } = withStore(<Header />, initialState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
