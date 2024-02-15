import { render, screen, fireEvent } from '@testing-library/react';
import ModalReviewSuccess from './modal-review-success';

describe('Component: ModalReviewSuccess', () => {
  const onClose = () => {/* Intentionally empty for testing */};

  it('should render success message and close button', () => {
    render(<ModalReviewSuccess onClose={onClose} />);

    expect(screen.getByText('Спасибо за отзыв')).toBeInTheDocument();
    expect(screen.getByText('Вернуться к покупкам')).toBeInTheDocument();
    expect(screen.getByLabelText('Закрыть попап')).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', () => {
    let closed = false;
    const handleClose = () => {
      closed = true;
    };
    render(<ModalReviewSuccess onClose={handleClose} />);

    fireEvent.click(screen.getByLabelText('Закрыть попап'));
    expect(closed).toBe(true);
  });

  it('should call onClose when escape key is pressed', () => {
    let closed = false;
    const handleClose = () => {
      closed = true;
    };
    render(<ModalReviewSuccess onClose={handleClose} />);

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(closed).toBe(true);
  });
});
