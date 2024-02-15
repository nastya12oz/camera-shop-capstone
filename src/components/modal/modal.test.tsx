import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './modal';

describe('Component: Modal', () => {
  const handleClose = () => {/* Intentionally empty for testing */};

  it('should render children content', () => {
    render(
      <Modal onClose={handleClose}>
        <div data-testid="modal-content">Modal Content</div>
      </Modal>
    );
    expect(screen.getByTestId('modal-content')).toHaveTextContent('Modal Content');
  });

  it('should close on overlay click', () => {
    let closed = false;
    const handleCloseInTest = () => {
      closed = true;
    };
    const { container } = render(
      <Modal onClose={handleCloseInTest}>
        <div>Modal Content</div>
      </Modal>
    );
    const overlay = container.querySelector('.modal__overlay');
    if (overlay) {
      fireEvent.click(overlay);
    }
    expect(closed).toBe(true);
  });

  it('should close on escape key press', () => {
    let closed = false;
    const handleCloseInTest = () => {
      closed = true;
    };
    render(
      <Modal onClose={handleCloseInTest}>
        <div>Modal Content</div>
      </Modal>
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(closed).toBe(true);
  });

  it('should apply narrow class when isNarrow is true', () => {
    const { container } = render(
      <Modal onClose={handleClose} isNarrow>
        <div>Modal Content</div>
      </Modal>
    );
    const modal = container.querySelector('.modal');
    expect(modal).toHaveClass('modal-narrow');
  });
});
