import { render, screen } from '@testing-library/react';
import ButtonAddToBasket from './button-add-to-basket';
import { makeFakeCamera, makeFakeStore} from '../../mock/mock';
import { withStore, withHistory } from '../../mock/mock-components';

describe('Component: ButtonAddToBasket', () => {
  const product = makeFakeCamera();
  const initialState = makeFakeStore();
  const { withStoreComponent } = withStore(<ButtonAddToBasket product={product} />, initialState);
  const componentWithHistory = withHistory(withStoreComponent);

  it('should render button with text "Купить" when buttonWithIcon is false', () => {
    render(componentWithHistory);
    expect(screen.getByText('Купить')).toBeInTheDocument();
  });
});
