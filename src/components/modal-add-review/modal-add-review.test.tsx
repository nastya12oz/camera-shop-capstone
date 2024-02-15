import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mock/mock-components';
import userEvent from '@testing-library/user-event';
import ModalAddReview from './modal-add-review';
import { makeFakeStore } from '../../mock/mock';

describe('Component: Product Card', () => {
  const onClose = () => {/* Intentionally empty for testing */};
  const initialState = makeFakeStore({
    REVIEWS: {
      reviews: [],
      isReviewSending: false,
      hasReviewSendingError: false,
      isReviewSentSuccessfully: false,
    }
  });

  it('should render correctly', () => {
    const expectedFormText = 'Оставить отзыв';
    const expectedRatingText = 'Рейтинг';
    const expectedNameLabelText = 'Ваше имя';
    const expectedAdvantageLabelText = 'Достоинства';
    const expectedDisadvantageLabelText = 'Недостатки';
    const expectedReviewLabelText = 'Комментарий';
    const cameraId = 1;

    const {withStoreComponent} = withStore(<ModalAddReview cameraId={cameraId} onClose={onClose} />, initialState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedFormText)).toBeInTheDocument();
    expect(screen.getByText(expectedRatingText)).toBeInTheDocument();
    expect(screen.getByLabelText(expectedNameLabelText)).toBeInTheDocument();
    expect(screen.getByLabelText(expectedAdvantageLabelText)).toBeInTheDocument();
    expect(screen.getByLabelText(expectedDisadvantageLabelText)).toBeInTheDocument();
    expect(screen.getByLabelText(expectedReviewLabelText)).toBeInTheDocument();
  });

  it('should render correctly when user enters data', async () => {
    const nameTestId = 'name';
    const advantageTestId = 'advantage';
    const disadvantageTestId = 'disadvantage';
    const commentTestId = 'comment';
    const expectedName = 'Nastya';
    const expectedAdvantage = 'Good the best awesome';
    const expectedDisadvantage = 'Bad ugly disgusting';
    const expectedComment = 'East or west but home is the best';
    const cameraId = 1;

    const {withStoreComponent} = withStore(<ModalAddReview cameraId={cameraId} onClose={onClose} />, initialState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    await userEvent.type(screen.getByTestId(nameTestId), expectedName);
    await userEvent.type(screen.getByTestId(advantageTestId), expectedAdvantage);
    await userEvent.type(screen.getByTestId(disadvantageTestId), expectedDisadvantage);
    await userEvent.type(screen.getByTestId(commentTestId), expectedComment);

    expect(screen.getByDisplayValue(expectedName)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedAdvantage)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedDisadvantage)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedComment)).toBeInTheDocument();
  });
});
