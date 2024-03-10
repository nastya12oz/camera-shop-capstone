import { render, screen } from '@testing-library/react';
import NotFoundScreen from './not-found-screen';
import { withHistory, withStore } from '../../mock/mock-components';
import { makeFakeStore } from '../../mock/mock';


describe('Component: Logo', () => {
  it('should render correctly', () => {
    const expectedText = '404 - not found....';

    const initialState = makeFakeStore();

    const { withStoreComponent } = withStore(<NotFoundScreen />, initialState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
