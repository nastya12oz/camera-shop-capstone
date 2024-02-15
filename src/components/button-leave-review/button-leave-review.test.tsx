import { render, screen, fireEvent } from '@testing-library/react';
import ButtonLeaveReview from './button-leave-review';
import { withStore, withHistory } from '../../mock/mock-components';
import { makeFakeStore } from '../../mock/mock';


describe('Component: ButtonLeaveReview', () => {
  const cameraId = 1;
  const initialState = makeFakeStore();
  const { withStoreComponent } = withStore(<ButtonLeaveReview id={cameraId} />, initialState);
  const componentWithHistory = withHistory(withStoreComponent);

  it('should render button with text "Оставить свой отзыв"', () => {
    render(componentWithHistory);
    expect(screen.getByText('Оставить свой отзыв')).toBeInTheDocument();
  });

  it('should open ModalAddReview when button is clicked', () => {
    render(componentWithHistory);
    fireEvent.click(screen.getByText('Оставить свой отзыв'));
    expect(screen.getByTestId('button-add-review')).toBeInTheDocument();
  });
});
